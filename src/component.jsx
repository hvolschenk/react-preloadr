import PropTypes from 'prop-types';
import Maybe from 'react-maybe';

import {
  preloadPropTypes,
  preloadDefaultProp,
  PRELOAD_STATUS_FAILED,
  PRELOAD_STATUS_REQUESTED,
} from './status';

export const isRequested = status => status === PRELOAD_STATUS_REQUESTED;
export const isFailed = status => status === PRELOAD_STATUS_FAILED;
export const Empty = () => null;

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
