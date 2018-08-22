import reducer from './reducer';
import {
  PRELOAD_STATUS_FAILED,
  PRELOAD_STATUS_REQUESTED,
  PRELOAD_STATUS_SUCCEEDED,
} from './status';

describe('Shared / Higher order components / Preload / reducer', () => {
  const PAYLOAD = 'PAYLOAD';
  const FAILED = 'FAILED';
  const REQUESTED = 'REQUESTED';
  const SUCCEEDED = 'SUCCEEDED';
  const implementedReducer = reducer(FAILED, REQUESTED, SUCCEEDED);

  test('default', () => {
    const expected = {
      status: PRELOAD_STATUS_REQUESTED,
    };

    const actual = implementedReducer();
    expect(actual).toEqual(expected);
  });

  test('accepts initialState', () => {
    const initialState = { status: undefined, payload: [] };

    const expected = initialState;

    const actual = reducer(FAILED, REQUESTED, SUCCEEDED, initialState);
    expect(actual).toEqual(expected);
  });

  test('FAILED', () => {
    const ACTION = {
      payload: PAYLOAD,
      type: FAILED,
    };
    const expected = {
      payload: PAYLOAD,
      status: PRELOAD_STATUS_FAILED,
    };

    const actual = implementedReducer(undefined, ACTION);
    expect(actual).toEqual(expected);
  });

  test('REQUESTED', () => {
    const ACTION = {
      payload: PAYLOAD,
      type: REQUESTED,
    };
    const expected = {
      payload: PAYLOAD,
      status: PRELOAD_STATUS_REQUESTED,
    };

    const actual = implementedReducer(undefined, ACTION);
    expect(actual).toEqual(expected);
  });

  test('SUCCEEDED', () => {
    const ACTION = {
      payload: PAYLOAD,
      type: SUCCEEDED,
    };
    const expected = {
      payload: PAYLOAD,
      status: PRELOAD_STATUS_SUCCEEDED,
    };

    const actual = implementedReducer(undefined, ACTION);
    expect(actual).toEqual(expected);
  });
});
