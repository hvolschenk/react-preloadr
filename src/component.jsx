import PropTypes from 'prop-types';
import React from 'react';
import Maybe from 'react-maybe';

import {
  PRELOAD_STATUS_FAILED,
  PRELOAD_STATUS_REQUESTED,
  PRELOAD_STATUS_SUCCEEDED,
} from './status';

export const isRequested = status => status === PRELOAD_STATUS_REQUESTED;
export const isFailed = status => status === PRELOAD_STATUS_FAILED;

const Preloadr = ({ children, failed, requested, status }) => (
  <Maybe
    of={status}
    map={isRequested}
    either={requested}
    orElse={<Maybe of={status} map={isFailed} either={failed} orElse={children} />}
  />
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
