import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare, faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { useStore } from '../context/Provider';
import styles from '../styles/Server.module.scss';

export default function Server(props) {
  const { name, endpoint, port, currentDivHover, changeDivHover } = props;

  const { servers, currentServer }: any = useStore();
  const { selectedServerDispatch }: { selectedServerDispatch: Function } =
    currentServer;
  const { serversDispatch }: { serversDispatch: Function } = servers;
  const removeServer = (e: Event) => {
    serversDispatch({
      type: 'deleteServer',
      message: { name: e.target.id },
    });
  };
  const removeServerAnimation = (e) => {
    const wrapperName: HTMLDivElement = e.target.attributes[1].value;
    const removeServerDiv: HTMLDivElement = document.querySelector(
      `#${wrapperName}`
    );
    changeDivHover(removeServerDiv);
    removeServerDiv.style.width = '100%';
    removeServerDiv.style.backgroundColor = 'red';
    removeServerDiv.innerHTML = 'X';
  };

  const keepServerAnimation = (e) => {
    if (currentDivHover) {
      currentDivHover.style.width = '0%';
      currentDivHover.style.backgroundColor = 'white';
      currentDivHover.innerHTML = '';
    }
  };

  const updateSelectedServer = () => {
<<<<<<< HEAD:components/Server_Endpoint.tsx
    console.log(servers.serverList);
    if (!currentServer.selectedServer[name])
=======
    if (!currentServer.selectedServer[name]) {
      // look for the information at the serverlist global state
>>>>>>> dc574079b48d500cb156d205ee67283e7b694cb8:components/Archive/Server.tsx
      servers.serverList.forEach((el) => {
        if (el.name === name)
          selectedServerDispatch({
            type: 'currentServer',
            payload: {
              name: el.name,
              endpoint: el.endpoint,
              password: el.password,
              port: el.port,
            },
          });
      });
  };

  const squareUnChecked = (
    <span onClick={updateSelectedServer} key={name}>
      <FontAwesomeIcon
        id={name}
        icon={faSquare}
        className={styles.emptySquare}
      />
    </span>
  );
  const squareChecked = (
    <span onClick={updateSelectedServer} key={name}>
      <FontAwesomeIcon id={name} icon={faCheckSquare} />
    </span>
  );

  return (
    <div className={styles.serverWrapper}>
      <div
        className={styles.removeServerWrapper}
        onMouseEnter={removeServerAnimation}
        onMouseLeave={keepServerAnimation}
        onClick={removeServer}
        name={name}
      >
        <div className={styles.removeServerDiv} id={name}></div>
      </div>
      <div className={styles.server}>
        {currentServer.selectedServer.name === name
          ? squareChecked
          : squareUnChecked}
        <p>Name: {name}</p>
        <p>IP: {IP}</p>
        <p>Port: {PORT}</p>
      </div>
    </div>
  );
}

Server.propTypes = {
  name: PropTypes.string.isRequired,
  endpoint: PropTypes.string.isRequired,
  port: PropTypes.string.isRequired,
  currentDivHover: PropTypes.any,
  changeDivHover: PropTypes.func,
  changeCurrentServer: PropTypes.func,
};
