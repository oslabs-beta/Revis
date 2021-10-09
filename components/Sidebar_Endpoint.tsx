import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCube } from '@fortawesome/free-solid-svg-icons';
import ServerAdd from './ServerAdd';
import ServerList from './ServerList';
import { useStore } from '../context/Provider';
import styles from '../styles/Sidebar.module.scss';

function Sidebar(props) {
  const [sideBarHidden, showOrHideSideBar] = useState(false);
  const [serverList, updateList] = useState([]);
  const { user }: any = useStore();
  const { username }: { username: string } = user.userState;

  const [currentServer, setCurrentServer] = useState(null);
  const [currentDivHover, changeDivHover] = useState(null);

  //modularize the IP check,
  const validityCheckOnSubmit = (
    nameElement: HTMLInputElement,
    ipElement: HTMLInputElement,
    portElement: HTMLInputElement,
    endpointElement: HTMLInputElement
  ) => {
    if (nameElement.validity.tooShort || nameElement.validity.valueMissing) {
      nameElement.setCustomValidity('Please input at least four characters');
      nameElement.reportValidity();
    } else nameElement.setCustomValidity('');

    if (
      portElement.validity.patternMismatch ||
      portElement.validity.valueMissing
    ) {
      portElement.setCustomValidity(
        'Please input a proper port number (eg. 8080)'
      );
      portElement.reportValidity();
    } else portElement.setCustomValidity('');

    const alreadyAddedServerName: boolean = serverList.some(
      (elem) => elem.name === nameElement.value
    );

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

    if (ipElement) {
      if (
        ipElement.validity.patternMismatch ||
        ipElement.validity.valueMissing
      ) {
        ipElement.setCustomValidity(
          'Please input a proper IP number (eg. 192.45.23.64)'
        );
        ipElement.reportValidity();
      } else ipElement.setCustomValidity('');
      const alreadyAddedServerIP: boolean = serverList.some(
        (elem) => elem.IP === ipElement.value
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
      return (
        nameElement.validity.valid &&
        ipElement.validity.valid &&
        !alreadyAddedServerIP &&
        portElement.validity.valid &&
        !alreadyAddedServerName
      );
    }

    return (
      nameElement.validity.valid &&
      endpointElement &&
      portElement.validity.valid &&
      !alreadyAddedServerName
    );
  };

  const postServerToDataBase = (
    name: string,
    IP: string,
    PORT: string,
    endPoint: string,
    password: string
  ) => {
    fetch('/api/addServer', {
      method: 'POST',
      body: JSON.stringify({ name, IP, PORT, username, endPoint, password }),
      'Content-Type': 'application/json',
    });
  };

  const deleteServerFromDataBase = (name: string) => {
    fetch('/api/deleteServer', {
      method: 'DELETE',
      body: JSON.stringify({ name }),
      'Content-Type': 'application/json',
    });
  };

  const addServer = (e) => {
    e.preventDefault();
    const name: HTMLInputElement = document.querySelector('#name');
    const IP: HTMLInputElement = document.querySelector('#IP');
    const PORT: HTMLInputElement = document.querySelector('#PORT');
    const endpoint: HTMLInputElement = document.querySelector('#endpoint');
    const password: HTMLInputElement = document.querySelector(
      '#cloudServerPassword'
    );

    if (validityCheckOnSubmit(name, IP, PORT, endpoint)) {
      const postIP = IP ?? endpoint;
      updateList(
        serverList.concat({
          name: name.value,
          postIP: postIP.value,
          PORT: PORT.value,
        })
      );

      postServerToDataBase(
        name.value,
        postIP.value,
        PORT.value,
        password.value
      );
    }
  };

  const removeServer = (e) => {
    const serverNameToRemove: string = e.target.id;
    if (!serverNameToRemove) return;
    deleteServerFromDataBase(serverNameToRemove);
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
    <div className={styles.sideBarWrapper} id='sideBar'>
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
