import Server from './Server';
export default function ServerList(props) {
  const { serverList } = props;

  const servers = serverList.map((elem, index) => {
    return (
      <Server key={index} name={elem.name} IP={elem.IP} PORT={elem.PORT} />
    );
  });
  return <div>{servers}</div>;
}
