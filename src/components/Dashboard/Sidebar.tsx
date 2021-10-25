import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCube, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import ServerAdd from './Servers/ServerAdd';
import ServerList from './Servers/ServerList';
import { useStore } from '../../context/Provider';
import styles from '../../styles/Sidebar.module.scss';
import { Context } from '../../context/interfaces';
import dashStyle from '../../styles/Dashboard.module.scss';
import graphStyle from '../../styles/GraphContainer.module.scss';

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
            type: 'populateList',
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
        type: 'addServer',
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
    if (sideBarHidden) {
      document.querySelector('#sideBar').style.width = '40vh';
      document.querySelector(`#${styles.cube}`).style.left = '15rem';
      document.querySelector(`#${styles.cube}`).style.top = '1rem';
      document.querySelector(`#${styles.cube}`).style.color = 'transparent';
      document.querySelector(`#${styles.close}`).style.color =
        'rgba(205, 200, 200, 0.845)';
      document.querySelector(
        `.${dashStyle.dashboardWrapper}`
      ).style.marginLeft = '0px';
      document.querySelector('#intervalMenu').style.marginLeft = '0px';
      if (document.querySelector(`.${graphStyle.MultipleGraphContainer}`)) {
        document.querySelector(
          `.${graphStyle.MultipleGraphContainer}`
        ).style.marginLeft = '0px';
        document.querySelector('#leftMenuGraphs').style.left = '47vh';
      }
    } else {
      document.querySelector('#sideBar').style.width = '0px';
      document.querySelector('#sideBar').style.overflow = 'hidden';
      document.querySelector(`#${styles.cube}`).style.left = '0%';
      document.querySelector(`#${styles.cube}`).style.top = '46%';
      document.querySelector(`#${styles.cube}`).style.color = '#e38d41e9';
      document.querySelector(`#${styles.close}`).style.color = 'transparent';
      document.querySelector(
        `.${dashStyle.dashboardWrapper}`
      ).style.marginLeft = '-302.8px';
      document.querySelector('#intervalMenu').style.marginLeft = '-302.8px';
      if (document.querySelector(`.${graphStyle.MultipleGraphContainer}`)) {
        document.querySelector(
          `.${graphStyle.MultipleGraphContainer}`
        ).style.marginLeft = '05vh';
        document.querySelector('#leftMenuGraphs').style.left = '10vh';
      }
    }
    showOrHideSideBar(!sideBarHidden);
  };

  return (
    <div className={styles.sideBarWrapper} id='sideBar'>
      <ServerAdd addServer={addServer} />
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
          values='close'
        />
      </span>
      <span className={styles.closeSpan}>
        <FontAwesomeIcon
          id={styles.close}
          icon={faWindowClose}
          onClick={changeSidebarVisual}
          values='close'
        />
      </span>
    </div>
  );
}

export default Sidebar;
