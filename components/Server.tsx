import styles from '../styles/Server.module.scss';

export default function Server(props) {
  const { name, IP, PORT } = props;
  return (
    <div className={styles.server}>
      <p>Name: {name}</p>
      <p>IP: {IP}</p>
      <p>PORT: {PORT}</p>
    </div>
  );
}
