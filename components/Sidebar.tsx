import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCube } from '@fortawesome/free-solid-svg-icons';
import ServerAdd from './ServerAdd';
import ServerList from './ServerList';
import { useStore } from '../context/Provider';
import styles from '../styles/Sidebar.module.scss';

function Sidebar() {
  const [sideBarHidden, showOrHideSideBar] = useState(false);
  const { user, servers }: any = useStore();
  const {
    serverList,
    serversDispatch,
  }: { serverList: string[]; serversDispatch: Function } = servers;
  const { username }: { username: string } = user.userState;

  const [currentServer, setCurrentServer] = useState(null);

  const populateServerList = () => {
    fetch('/api/servers')
      .then((response) => response.json())
      .then((data) => {
        const cloudData: string[] = data.cloud;
        const localData: string[] = data.local;

        if (cloudData.length === 0 && localData.length === 0) {
          serversDispatch({});
          return;
        }
        serversDispatch({
          type: 'populateList',
          message: [...cloudData, ...localData],
        });
      });
  };
  useEffect(() => populateServerList(), []);
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
      (elem) => elem.ip === ipElement.value
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

  const addServer = (e: Event) => {
    e.preventDefault();
    const name: HTMLInputElement = document.querySelector('#name');
    const IP: HTMLInputElement = document.querySelector('#IP');
    const PORT: HTMLInputElement = document.querySelector('#PORT');

    if (validityCheckOnSubmit(name, IP, PORT)) {
      serversDispatch({
        type: 'addServer',
        message: { name: name.value, ip: IP.value, port: PORT.value, username },
      });
    }
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

  const changeCurrentServer = (e: Event) => {
    const severIP: string = e.target.id;
    setCurrentServer(e.target.id);
  };

  return (
    <div className={styles.sideBarWrapper} id="sideBar">
      <ServerAdd addServer={addServer} />
      <ServerList serverList={serverList} />
      <FontAwesomeIcon
        id={styles.cube}
        icon={faCube}
        onClick={changeSidebarVisual}
      />
    </div>
  );
}

export default Sidebar;
