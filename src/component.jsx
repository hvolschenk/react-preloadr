import PropTypes from 'prop-types';
import React from 'react';

import {
  PRELOAD_STATUS_FAILED,
  PRELOAD_STATUS_REQUESTED,
  PRELOAD_STATUS_SUCCEEDED,
} from './status';

const Preloadr = ({ children, failed, requested, status }) => (
  <div>
    {status === PRELOAD_STATUS_FAILED && failed}
    {status === PRELOAD_STATUS_REQUESTED && requested}
    {status === PRELOAD_STATUS_SUCCEEDED && children}
  </div>
);

Preloadr.propTypes = {
  children: PropTypes.node.isRequired,
  failed: PropTypes.node,
  requested: PropTypes.node,
  status: PropTypes.oneOf([
    PRELOAD_STATUS_FAILED,
    PRELOAD_STATUS_REQUESTED,
    PRELOAD_STATUS_SUCCEEDED,
  ]),
};

Preloadr.defaultProps = {
  failed: undefined,
  requested: undefined,
  status: PRELOAD_STATUS_REQUESTED,
};

export default Preloadr;
