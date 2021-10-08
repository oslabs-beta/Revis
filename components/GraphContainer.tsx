import Graph from "../components/Graph";
import BackButton from "../components/BackButton";
import styles from "../styles/GraphContainer.module.scss";

function GraphContainer() {
  return (
    <div className={styles.GraphContainer}>
      <BackButton />
      <h1>Metric</h1>
      <Graph />
    </div>
  );
}
export default GraphContainer;
