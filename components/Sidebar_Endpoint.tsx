import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCube } from '@fortawesome/free-solid-svg-icons';
import ServerAdd_Endpoint from './ServerAdd_Endpoint';
import ServerList_Endpoint from './ServerList_Endpoint';
import { useStore } from '../context/Provider';
import styles from '../styles/Sidebar.module.scss';

function Sidebar(props) {
  const [sideBarHidden, showOrHideSideBar] = useState(false);
  const [serverList, updateList] = useState([]);
  const { user, servers, currentServer }: any = useStore();
  const { username }: { username: string } = user.userState;
  const { selectedServerDispatch }: { selectedServerDispatch: Function } =
    currentServer;

  const [currentDivHover, changeDivHover] = useState(null);

  useEffect(() => populateServerList(), []);

  const populateServerList = () => {
    fetch('/api/servers_Endpoint')
      .then((response) => response.json())
      .then((data) => {
        const cloudData: string[] = data.cloud;
        updateList(cloudData);
      });
  };

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
      updateList(
        serverList.concat({
          name: name.value,
          endpoint: endpoint.value,
          PORT: PORT.value,
        })
      );

      postServerToDataBase(
        name.value,
        endpoint.value,
        password.value,
        PORT.value
      );
    }
  };

  const removeServer = (e) => {
    const serverNameToRemove: string = e.target.id;
    console.log(serverNameToRemove);
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
    const currentServer: string = e.target.id;
    const currentPORT: any = e.target.value;
    if (
      currentServer === 'redis-16424.c289.us-west-1-2.ec2.cloud.redislabs.com'
    ) {
      selectedServerDispatch({
        type: 'currentServer',
        payload: {
          endpoint: currentServer,
          password: 'redis',
          port: 16424,
        },
      });
    } else {
      selectedServerDispatch({
        type: 'currentServer',
        payload: {
          endpoint: currentServer,
          password: 'Etttmq5T4ubqnE6TaYltcjXmdobQAjfq',
          port: 18891,
        },
      });
    }
  };

  return (
    <div className={styles.sideBarWrapper} id='sideBar'>
      <ServerAdd_Endpoint addServer={addServer} />
      <ServerList_Endpoint
        serverList={serverList}
        removeServer={removeServer}
        currentDivHover={currentDivHover}
        changeDivHover={changeDivHover}
        changeCurrentServer={changeCurrentServer}
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
