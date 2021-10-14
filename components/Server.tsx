import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { useStore } from '../context/Provider';
import styles from '../styles/Server.module.scss';

export default function Server(props) {
  const {
    name,
    endpoint,
    port,
    currentDivHover,
    changeDivHover,
    changeCurrentServer,
  } = props;

  const { servers }: any = useStore();
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
        <FontAwesomeIcon
          onClick={changeCurrentServer}
          id={styles.checkBox}
          icon={faCheckSquare}
        />
        <p>Name: {name}</p>
        <p>Port: {port}</p>
      </div>
      {/* <input
        id={endpoint}
        type="radio"
        name="currentServer"
        value={port}
        onChange={changeCurrentServer}
      /> */}
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
