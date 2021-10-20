import React from 'react';
import PropTypes from 'prop-types';
import { useStore } from '../../../context/Provider';
import { Context, MetricHistoryInterface } from '../../../context/interfaces';

export default function ServerHistoryList() {
  const { metricHistory }: Context = useStore();

  const populateServerList;

  return <div className={}>{serverHistory}</div>;
}

// ServerHistoryList.propTypes = {

// };
