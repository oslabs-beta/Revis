import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCube } from '@fortawesome/free-solid-svg-icons';
import ServerAdd from './ServerAdd';
import ServerList from './ServerList';
import styles from '../styles/Sidebar.module.scss';

function Sidebar(props) {
  const [sideBarHidden, showOrHideSideBar] = useState(false);
  const [serverList, updateList] = useState([
    { name: 'Liam', IP: 'test', PORT: '435' },
    { name: 'Liam2', IP: 'test', PORT: '435' },
    { name: 'Liam3', IP: 'test', PORT: '435' },
    { name: 'Liam4', IP: 'test', PORT: '435' },
    { name: 'Liam5', IP: 'test', PORT: '435' },
    { name: 'Liam6', IP: 'test', PORT: '435' },
    { name: 'Liam7', IP: 'test', PORT: '435' },
    { name: 'Liam8', IP: 'test', PORT: '435' },
    { name: 'Liam9', IP: 'test', PORT: '435' },
  ]);
  const [currentServer, setCurrentServer] = useState(null);
  const [currentDivHover, changeDivHover] = useState(null);

  const validityCheckOnSubmit = (
    nameElement: HTMLInputElement,
    ipElement: HTMLInputElement,
    portElement: HTMLInputElement
  ) => {
    if (nameElement.validity.tooShort || nameElement.validity.valueMissing) {
      nameElement.setCustomValidity('Please input at least four characters');
      nameElement.reportValidity();
    } else nameElement.setCustomValidity('');

    if (ipElement.validity.patternMismatch || ipElement.validity.valueMissing) {
      ipElement.setCustomValidity(
        'Please input a proper IP number (eg. 192.45.23.64)'
      );
      ipElement.reportValidity();
    } else ipElement.setCustomValidity('');

    if (
      portElement.validity.patternMismatch ||
      portElement.validity.valueMissing
    ) {
      portElement.setCustomValidity(
        'Please input a proper port number (eg. 8080)'
      );
      portElement.reportValidity();
    } else portElement.setCustomValidity('');

    const alreadyAddedServerIP: boolean = serverList.some(
      (elem) => elem.IP === ipElement.value
    );

    const alreadyAddedServerName: boolean = serverList.some(
      (elem) => elem.name === nameElement.value
    );

    if (alreadyAddedServerIP) {
      ipElement.setCustomValidity(
        'This IP address has already been added. Please input a unique IP.'
      );
      ipElement.reportValidity();
    } else if (
      ipElement.validity.patternMismatch &&
      ipElement.validity.valueMissing
    )
      ipElement.setCustomValidity('');

    if (alreadyAddedServerName) {
      nameElement.setCustomValidity(
        'This name has already been added. Please enter a unique name.'
      );
      nameElement.reportValidity();
    } else if (
      nameElement.validity.tooShort &&
      nameElement.validity.valueMissing
    )
      nameElement.setCustomValidity('');

    return (
      nameElement.validity.valid &&
      ipElement.validity.valid &&
      portElement.validity.valid &&
      !alreadyAddedServerIP &&
      !alreadyAddedServerName
    );
  };

  const postServerToDataBase = (name: string, IP: string, PORT: string) => {
    fetch('/api/addServer', {
      method: 'POST',
      body: JSON.stringify({ name, IP, PORT }),
      'Content-Type': 'application/json',
    });
  };

  const addServer = (e) => {
    e.preventDefault();
    const name: HTMLInputElement = document.querySelector('#name');
    const IP: HTMLInputElement = document.querySelector('#IP');
    const PORT: HTMLInputElement = document.querySelector('#PORT');

    if (validityCheckOnSubmit(name, IP, PORT)) {
      updateList(
        serverList.concat({ name: name.value, IP: IP.value, PORT: PORT.value })
      );
      postServerToDataBase(name.value, IP.value, PORT.value);
    }
  };

  const removeServer = (e) => {
    const serverNameToRemove: string = e.target.id;
    if (!serverNameToRemove) return;
    updateList(serverList.filter((elem) => elem.name !== serverNameToRemove));
  };

  const changeSidebarVisual = () => {
    if (sideBarHidden) {
      document.querySelector('#sideBar').style.width = '100%';
      document.querySelector(`#${styles.cube}`).style.left = '15rem';
    } else {
      document.querySelector('#sideBar').style.width = '0px';
      document.querySelector('#sideBar').style.overflow = 'hidden';
      document.querySelector(`#${styles.cube}`).style.left = '0%';
    }
    showOrHideSideBar(!sideBarHidden);
  };

  const changeCurrentServer = (e) => {
    const severIP: string = e.target.id;
    setCurrentServer(e.target.id);
  };

  return (
    <div className={styles.sideBarWrapper} id="sideBar">
      <ServerAdd addServer={addServer} />
      <ServerList
        serverList={serverList}
        removeServer={removeServer}
        currentDivHover={currentDivHover}
        changeDivHover={changeDivHover}
      />
      <FontAwesomeIcon
        id={styles.cube}
        icon={faCube}
        onClick={changeSidebarVisual}
      />
    </div>
  );
}

export default Sidebar;
