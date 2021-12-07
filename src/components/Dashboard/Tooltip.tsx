import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/Tooltip.module.scss';
import descriptions from './metricDescriptions';

interface TooltipProps {
  metric: string;
  dropdownState: boolean;
}

function Tooltip(props: TooltipProps) {
  const { metric, dropdownState }: TooltipProps = props;

  if (!dropdownState) {
    return (
      <div className={styles.tooltip} data-tooltip={descriptions[metric]}></div>
    );
  }
  return <div></div>;
}

Tooltip.propTypes = {
  metric: PropTypes.string.isRequired,
  dropdownState: PropTypes.bool.isRequired,
};

export default Tooltip;
