import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/Tooltip.module.scss';
import descriptions from './metricDescriptions';

interface TooltipProps {
  metric: string;
}

function Tooltip(props: TooltipProps) {
  const [show, setShow] = useState(false);
  const { metric }: TooltipProps = props;
  return (
    <div
      className={styles.tooltip}
      data-tooltip={descriptions[metric]}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    ></div>
  );
}

Tooltip.propTypes = {
  metric: PropTypes.string.isRequired,
};

export default Tooltip;
