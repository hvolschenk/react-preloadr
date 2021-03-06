import PropTypes from 'prop-types';

export const PRELOAD_STATUS_FAILED = 'PRELOAD_STATUS_FAILED';
export const PRELOAD_STATUS_REQUESTED = 'PRELOAD_STATUS_REQUESTED';
export const PRELOAD_STATUS_SUCCEEDED = 'PRELOAD_STATUS_SUCCEEDED';

const singleStatus = PropTypes.oneOf([
  PRELOAD_STATUS_FAILED,
  PRELOAD_STATUS_REQUESTED,
  PRELOAD_STATUS_SUCCEEDED,
]);

export const preloadDefaultProp = PRELOAD_STATUS_REQUESTED;
export const preloadPropTypes = PropTypes.oneOfType([
  PropTypes.arrayOf(singleStatus),
  singleStatus,
]);
