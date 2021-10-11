import styles from '../styles/Server.module.scss';
import PropTypes from 'prop-types'

export default function Server(props) {
  const { name, endpoint, PORT, removeServer, currentDivHover, changeDivHover } =
    props;

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
        <p>Name: {name}</p>
        <p>URL: {endpoint}</p>
        <p>Port: {PORT}</p>
      </div>
    </div>
  );
}

Server.propTypes = {
  name: PropTypes.string.isRequired,
  endpoint: PropTypes.string.isRequired,
  PORT: PropTypes.string.isRequired,
  removeServer: PropTypes.func.isRequired,
  currentDivHover: PropTypes.any,
  changeDivHover: PropTypes.func,
};