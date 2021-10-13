import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCube } from '@fortawesome/free-solid-svg-icons';
import ServerAdd_Endpoint from './ServerAdd_Endpoint';
import ServerList_Endpoint from './ServerList_Endpoint';
import { useStore } from '../context/Provider';
import styles from '../styles/Sidebar.module.scss';

function Sidebar(props) {
  const [sideBarHidden, showOrHideSideBar] = useState(false);
  const { user, servers }: any = useStore();
  const {
    serverList,
    serversDispatch,
  }: { serverList: string[]; serversDispatch: Function } = servers;

  const { username }: { username: string } = user.userState;
  const [currentDivHover, changeDivHover] = useState(null);

  const populateServerList = () => {
    fetch('/api/servers_Endpoint')
      .then((response) => response.json())
      .then((data) => {
        const cloudData: string[] = data.cloud;
        if (cloudData.length === 0) {
          serversDispatch({});
          return;
        }
        serversDispatch({
          type: 'populateList',
          message: [...cloudData],
        });
      });
  };

  useEffect(() => populateServerList(), []);

  //modularize the IP check,
  const validityCheckOnSubmit = (
    nameElement: HTMLInputElement,
    endpointElement: HTMLInputElement,
    portElement: HTMLInputElement
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

    const alreadyAddedServerEndpoint: boolean = serverList.some(
      (elem) => elem.endpoint === endpointElement.value
    );

    if (alreadyAddedServerEndpoint) {
      endpointElement.setCustomValidity(
        'This endpoint URL has already been added. Please input a unique IP.'
      );
      endpointElement.reportValidity();
    } else if (
      endpointElement.validity.patternMismatch &&
      endpointElement.validity.valueMissing
    )
      endpointElement.setCustomValidity('');
    console.log(endpointElement.validity.valid);
    return (
      nameElement.validity.valid &&
      endpointElement.validity.valid &&
      portElement.validity.valid &&
      !alreadyAddedServerName &&
      !alreadyAddedServerEndpoint
    );
  };

  const postServerToDataBase = (
    name: string,
    endpoint: string,
    password: string,
    PORT: string
  ) => {
    fetch('/api/servers_Endpoint', {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        endpoint: endpoint,
        password: password,
        PORT: PORT,
        username,
      }),
      'Content-Type': 'application/json',
    });
  };

  const deleteServerFromDataBase = (name: string) => {
    fetch('/api/servers_Endpoint', {
      method: 'DELETE',
      body: JSON.stringify({ name }),
      'Content-Type': 'application/json',
    });
  };

  const addServer = (e) => {
    e.preventDefault();
    const name: HTMLInputElement = document.querySelector('#name');
    const endpoint: HTMLInputElement = document.querySelector('#endpoint');
    const password: HTMLInputElement = document.querySelector('#redisPassword');
    const PORT: HTMLInputElement = document.querySelector('#PORT');

    if (validityCheckOnSubmit(name, endpoint, PORT)) {
      serversDispatch({
        type: 'addServer',
        message: { name: name, endpoint: endpoint, port: PORT, username },
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

  return (
    <div className={styles.sideBarWrapper} id='sideBar'>
      <ServerAdd_Endpoint addServer={addServer} />
      <ServerList_Endpoint
        serverList={serverList}
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
