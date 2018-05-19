import PropTypes from 'prop-types';
import Maybe from 'react-maybe';

import {
  preloadPropTypes,
  preloadDefaultProp,
  PRELOAD_STATUS_FAILED,
  PRELOAD_STATUS_REQUESTED,
} from './status';

export const Empty = () => null;

const isFailedSingle = status => status === PRELOAD_STATUS_FAILED;
const isFailedMultiple = statii => statii.some(isFailedSingle);
const isFailed = status =>
  (Array.isArray(status) ? isFailedMultiple(status) : isFailedSingle(status));

const isRequestedSingle = status => status === PRELOAD_STATUS_REQUESTED;
const isRequestedMultiple = statii => statii.some(isRequestedSingle);
const isRequested = status =>
  (Array.isArray(status) ? isRequestedMultiple(status) : isRequestedSingle(status));

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
