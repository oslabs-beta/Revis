import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCube, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import ServerAdd from './Servers/ServerAdd';
import ServerList from './Servers/ServerList';
import useStore from '../../context/hooks/useStore';
import styles from '../../styles/Sidebar.module.scss';
import { Context } from '../../context/interfaces';
import dashStyle from '../../styles/Dashboard.module.scss';
import intervalStyle from '../../styles/UpdateInterval.module.scss';
import { POPULATE_LIST, ADD_SERVER } from '../../context/constants/actionTypes';

function Sidebar() {
  const [sideBarHidden, showOrHideSideBar] = useState(false);
  const { user, servers }: Context = useStore();
  const { username } = user.userState;
  const { serverList, serversDispatch } = servers;

  const [currentDivHover, changeDivHover] = useState(null);

  const populateServerList = () => {
    if (serverList.length > 0) return;
    fetch('/api/servers')
      .then((response) => response.json())
      .then((data) => {
        const cloudData: string[] = data.cloud;

        if (cloudData && cloudData.length > 0) {
          serversDispatch({
            type: POPULATE_LIST,
            message: [...cloudData],
          });
        }
      });
  };
  useEffect(() => populateServerList(), []);

  const checkEndpoint = async (
    endpoint: string,
    password: string,
    port: string
  ) =>
    fetch('/api/verifyEndpoint', {
      method: 'POST',
      body: JSON.stringify({ endpoint, password, port }),
      headers: { 'Content-Type': 'application/json' },
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

  const addServer = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const name: HTMLInputElement = document.querySelector('#name');
    const endpoint: HTMLInputElement = document.querySelector('#endpoint');
    const password: HTMLInputElement = document.querySelector('#redisPassword');
    const port: HTMLInputElement = document.querySelector('#PORT');

    if (validityCheckOnSubmit(name, endpoint, port)) {
      const correctServerEndpoint = await checkEndpoint(
        endpoint.value,
        password.value,
        port.value
      );
      if (!correctServerEndpoint) {
        endpoint.setCustomValidity('Invalid endpoint or password.');
        endpoint.reportValidity();
        return;
      }
      endpoint.setCustomValidity('');

      serversDispatch({
        type: ADD_SERVER,
        message: {
          name: name.value,
          endpoint: endpoint.value,
          password: password.value,
          port: port.value,
          username,
        },
      });
    }
  };

  const changeSidebarVisual = () => {
    const sideBar: HTMLElement = document.querySelector('#sideBar');
    const cube: HTMLElement = document.querySelector(`#${styles.cube}`);
    const close: HTMLElement = document.querySelector(`#${styles.close}`);
    const summaryWrapper: HTMLElement = document.querySelector(
      `.${dashStyle.summaryWrapper}`
    );
    const intervalMenu: HTMLElement = document.querySelector(
      `.${intervalStyle.underDashboard}`
    );

    if (sideBarHidden) {
      sideBar.style.width = '40vh';
      cube.style.left = '15rem';
      cube.style.top = '1rem';
      cube.style.color = 'transparent';
      close.style.color = 'rgba(205, 200, 200, 0.845)';
      summaryWrapper.style.marginLeft = '60vh';
      intervalMenu.style.left = '60vh';
    } else {
      sideBar.style.width = '0px';
      sideBar.style.overflow = 'hidden';
      cube.style.left = '0%';
      cube.style.top = '46%';
      cube.style.color = '#e38d41e9';
      close.style.color = 'transparent';
      summaryWrapper.style.marginLeft = '50vh';
      intervalMenu.style.left = '50vh';
    }
    showOrHideSideBar(!sideBarHidden);
  };

  return (
    <div className={styles.sideBarWrapper} id="sideBar">
      <ServerAdd addServer={addServer} />
      <div className={styles.guestMessage} id="guestMessage"></div>
      <ServerList
        serverList={serverList}
        currentDivHover={currentDivHover}
        changeDivHover={changeDivHover}
      />

      <span className={styles.cubeSpan}>
        <FontAwesomeIcon
          id={styles.cube}
          icon={faCube}
          onClick={changeSidebarVisual}
          values="close"
        />
      </span>
      <span className={styles.closeSpan}>
        <FontAwesomeIcon
          id={styles.close}
          icon={faWindowClose}
          onClick={changeSidebarVisual}
          values="close"
        />
      </span>
    </div>
  );
}

export default Sidebar;
