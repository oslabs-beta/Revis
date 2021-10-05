import Server from './Server';
import styles from '../styles/ServerList.module.scss';
export default function ServerList(props) {
  const { serverList } = props;

  interface server {
    name: string;
    IP: string;
    PORT: string;
  }

  const servers: server[] = serverList.map((elem, index) => {
    return (
      <Server key={index} name={elem.name} IP={elem.IP} PORT={elem.PORT} />
    );
  });
  return <div className={styles.serverList}>{servers}</div>;
}