import styles from '../styles/Server.module.scss';

export default function Server(props) {
  const { name, IP, PORT, removeServer } = props;

  let previousNode;

  const removeServerAnimation = (e) => {
    const removeServerDiv: HTMLDivElement = e.target.firstElementChild;
    previousNode = removeServerDiv;
    removeServerDiv.style.width = '100%';
    removeServerDiv.style.backgroundColor = 'red';
    removeServerDiv.innerHTML = 'X';
  };

  const keepServerAnimation = () => {
    if (previousNode) {
      previousNode.style.width = '0%';
      previousNode.style.backgroundColor = 'white';
      previousNode.innerHTML = '';
    } else previousNode = null;
  };

  return (
    <div className={styles.serverWrapper}>
      <div
        className={styles.removeServerWrapper}
        onMouseEnter={removeServerAnimation}
        onMouseLeave={keepServerAnimation}
        onClick={removeServer}
      >
        <div className={styles.removeServerDiv}></div>
      </div>
      <div className={styles.server}>
        <p>Name: {name}</p>
        <p>IP: {IP}</p>
        <p>Port: {PORT}</p>
      </div>
    </div>
  );
}
