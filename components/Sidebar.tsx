import React, { useState } from 'react';
import ServerAdd from './ServerAdd';
import ServerList from './ServerList';
import styles from '../styles/Sidebar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCube } from '@fortawesome/free-solid-svg-icons';

function Sidebar(props) {
  const [sideBarHidden, showOrHideSideBar] = useState(false);
  const [serverList, updateList] = useState([]);

  const validityCheck = (
    nameElement: HTMLInputElement,
    ipElement: HTMLInputElement,
    portElement: HTMLInputElement
  ) => {
    if (!nameElement.validity.valid)
      nameElement.nextSibling.innerHTML =
        'Please input at least four characters';

    if (!ipElement.validity.valid)
      ipElement.nextSibling.innerHTML =
        'Please input a proper IP number (eg. 192.45.23.64)';

    if (!portElement.validity.valid)
      portElement.nextSibling.innerHTML =
        'Please input a proper port number (eg. 8080)';

    const alreadyAddedServerIP: boolean = serverList.some(
      (elem) => elem['IP'] === ipElement.value
    );

    const alreadyAddedServerName: boolean = serverList.some(
      (elem) => elem['name'] === nameElement.value
    );

    if (alreadyAddedServerIP)
      ipElement.nextSibling.innerHTML =
        'This IP address has already been added. Please input a unique IP.';

    if (alreadyAddedServerName)
      nameElement.nextSibling.innerHTML =
        'This name has already been added. Please enter a unique name.';

    return (
      nameElement.validity.valid &&
      ipElement.validity.valid &&
      portElement.validity.valid &&
      !alreadyAddedServerIP &&
      !alreadyAddedServerName
    );
  };

  const addServer = (e) => {
    e.preventDefault();
    const name = document.querySelector('#name');
    const IP = document.querySelector('#IP');
    const PORT = document.querySelector('#PORT');

    if (validityCheck(name, IP, PORT)) {
      updateList(
        serverList.concat({ name: name.value, IP: IP.value, PORT: PORT.value })
      );
    }
  };

  const removeServer = (e) => {
    const serverNameToRemove: string =
      e.target.parentNode.parentNode.lastChild.childNodes[0].childNodes[1]
        .nodeValue;
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

  return (
    <div className={styles.sideBarWrapper} id="sideBar">
      <ServerAdd addServer={addServer} />
      <ServerList serverList={serverList} removeServer={removeServer} />
      <FontAwesomeIcon
        id={styles.cube}
        icon={faCube}
        onClick={changeSidebarVisual}
      />
    </div>
  );
}

export default Sidebar;
