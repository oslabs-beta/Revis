import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCube } from '@fortawesome/free-solid-svg-icons';
import ServerAdd_Endpoint from './ServerAdd_Endpoint';
import ServerList_Endpoint from './ServerList_Endpoint';
import { useStore } from '../context/Provider';
import styles from '../styles/Sidebar.module.scss';

function Sidebar(props) {
  const [sideBarHidden, showOrHideSideBar] = useState(false);
  const { user, servers, currentServer }: any = useStore();
  const { username }: { username: string } = user.userState;
  const {
    serverList,
    serversDispatch,
  }: { serverList: string[]; serversDispatch: Function } = servers;
  const { selectedServerDispatch }: { selectedServerDispatch: Function } =
    currentServer;

  const [currentDivHover, changeDivHover] = useState(null);
  useEffect(() => populateServerList(), []);
  const populateServerList = () => {
    if (serverList.length > 0) return;
    fetch('/api/servers_Endpoint')
      .then((response) => response.json())
      .then((data) => {
        const cloudData: string[] = data.cloud;

        if (!cloudData) {
          serversDispatch({});
          return;
        }
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
  
  const checkEndpoint = async (
    endpoint: string,
    password: string,
    port: string
  ) =>
    fetch('/api/verifyEndpoint', {
      method: 'POST',
      body: JSON.stringify({ endpoint, password, port }),
      'Content-Type': 'application/json',
    }).then((response) => response.status === 200);

  const nameValidityChecks = (nameElement: HTMLInputElement) => {
    if (nameElement.validity.valueMissing) {
      nameElement.setCustomValidity('Please input at least four characters');
      nameElement.reportValidity();
      return false;
    }
    nameElement.setCustomValidity('');

    const alreadyAddedServerName: boolean = serverList.some(
      (elem) => elem.name === nameElement.value
    );

    if (alreadyAddedServerName) {
      nameElement.setCustomValidity(
        'This name has already been added. Please enter a unique name.'
      );
      nameElement.reportValidity();
      return false;
    }

    if (nameElement.validity.patternMismatch) {
      nameElement.setCustomValidity(
        'Names can only be letters and must be at least 4 characters long.'
      );
      nameElement.reportValidity();
    }

    if (
      !nameElement.validity.valueMissing &&
      !nameElement.validity.patternMismatch
    )
      nameElement.setCustomValidity('');
    return true;
  };
  const portValidityChecks = (portElement: HTMLInputElement) => {
    if (
      portElement.validity.patternMismatch ||
      portElement.validity.valueMissing
    ) {
      portElement.setCustomValidity(
        'Please input a proper port number (eg. 8080)'
      );
      portElement.reportValidity();
      return false;
    }
    portElement.setCustomValidity('');
    return true;
  };
  const endpointValidityChecks = (endpointElement: HTMLInputElement) => {
    const alreadyAddedServerEndpoint: boolean = serverList.some(
      (elem) => elem.endpoint === endpointElement.value
    );

    if (alreadyAddedServerEndpoint) {
      endpointElement.setCustomValidity(
        'This endpoint URL has already been added. Please input a unique URL.'
      );
      endpointElement.reportValidity();
      return false;
    }
    if (
      endpointElement.validity.patternMismatch &&
      endpointElement.validity.valueMissing
    ) {
      return false;
    }
    endpointElement.setCustomValidity('');
    return true;
  };
  const validityCheckOnSubmit = (
    nameElement: HTMLInputElement,
    endpointElement: HTMLInputElement,
    portElement: HTMLInputElement
  ) => {
    const nameValidity: boolean = nameValidityChecks(nameElement);
    const endpointValidity: boolean = endpointValidityChecks(endpointElement);
    const portValidity: boolean = portValidityChecks(portElement);

    return nameValidity && endpointValidity && portValidity;
  };

  const addServer = async (e) => {
    e.preventDefault();
    const name: HTMLInputElement = document.querySelector('#name');
    const endpoint: HTMLInputElement = document.querySelector('#endpoint');
    const password: HTMLInputElement = document.querySelector('#redisPassword');
    const PORT: HTMLInputElement = document.querySelector('#PORT');

    if (validityCheckOnSubmit(name, endpoint, PORT)) {
      const correctServerEndpoint = await checkEndpoint(
        endpoint.value,
        password.value,
        PORT.value
      );
      if (!correctServerEndpoint) {
        endpoint.setCustomValidity('Invalid endpoint or password.');
        endpoint.reportValidity();
        return;
      }
      endpoint.setCustomValidity('');

      serversDispatch({
        type: 'addServer',
        message: {
          name: name.value,
          endpoint: endpoint.value,
          password: password.value,
          port: PORT.value,
          username,
        },
      });
    }
  };

  const changeSidebarVisual = () => {
    if (sideBarHidden) {
      document.querySelector('#sideBar').style.width = '100%';
      document.querySelector(`#${styles.cube}`).style.left = '15rem';
      document.querySelector(`#${styles.cube}`).style.top = '5rem';
    } else {
      document.querySelector('#sideBar').style.width = '0px';
      document.querySelector('#sideBar').style.overflow = 'hidden';
      document.querySelector(`#${styles.cube}`).style.left = '0%';
      document.querySelector(`#${styles.cube}`).style.top = '50%';
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
        currentDivHover={currentDivHover}
        changeDivHover={changeDivHover}
      />
      <FontAwesomeIcon
        id={styles.cube}
        icon={faCube}
        onClick={changeSidebarVisual}
      />
      <div id={styles.closeX}>x</div>
    </div>
  );
}

export default Sidebar;
