import isArray from 'lodash.isarray';
import PropTypes from 'prop-types';
import Maybe from 'react-maybe';

import {
  preloadPropTypes,
  preloadDefaultProp,
  PRELOAD_STATUS_FAILED,
  PRELOAD_STATUS_REQUESTED,
} from './status';

export const Empty = () => null;

export const isFailedSingle = status => status === PRELOAD_STATUS_FAILED;
export const isFailedMultiple = statii => statii.some(isFailedSingle);
export const isFailed = status =>
  (isArray(status) ? isFailedMultiple(status) : isFailedSingle(status));

export const isRequestedSingle = status => status === PRELOAD_STATUS_REQUESTED;
export const isRequestedMultiple = statii => statii.some(isRequestedSingle);
export const isRequested = status =>
  (isArray(status) ? isRequestedMultiple(status) : isRequestedSingle(status));

const Preloadr = ({ children, failed, requested, status }) =>
  Maybe({
    of: status,
    map: isRequested,
    either: requested,
    orElse: Maybe({ of: status, map: isFailed, either: failed, orElse: children }),
  })();

Preloadr.propTypes = {
  children: PropTypes.func.isRequired,
  failed: PropTypes.func,
  requested: PropTypes.func,
  status: preloadPropTypes,
};

Preloadr.defaultProps = {
  failed: Empty,
  requested: Empty,
  status: preloadDefaultProp,
};

export default Preloadr;
