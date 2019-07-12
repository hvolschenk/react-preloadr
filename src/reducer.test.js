import reducer from './reducer';
import {
  PRELOAD_STATUS_FAILED,
  PRELOAD_STATUS_REQUESTED,
  PRELOAD_STATUS_SUCCEEDED,
} from './status';

const PAYLOAD = 'PAYLOAD';
const FAILED = 'FAILED';
const REQUESTED = 'REQUESTED';
const SUCCEEDED = 'SUCCEEDED';

let implementedReducer;

beforeAll(() => {
  implementedReducer = reducer(FAILED, REQUESTED, SUCCEEDED);
});

test('default', () => {
  expect(implementedReducer()).toEqual({ status: PRELOAD_STATUS_REQUESTED });
});

test('accepts initialState', () => {
  const INITIAL_STATE = { status: undefined, payload: [] };
  expect(reducer(FAILED, REQUESTED, SUCCEEDED, INITIAL_STATE)()).toEqual(INITIAL_STATE);
});

test('FAILED', () => {
  const ACTION = { payload: PAYLOAD, type: FAILED };
  expect(implementedReducer(undefined, ACTION))
    .toEqual({ error: PAYLOAD, status: PRELOAD_STATUS_FAILED });
});

test('REQUESTED', () => {
  expect(implementedReducer(undefined, { payload: PAYLOAD, type: REQUESTED }))
    .toEqual({ payload: PAYLOAD, status: PRELOAD_STATUS_REQUESTED });
});

test('SUCCEEDED', () => {
  expect(implementedReducer(undefined, { payload: PAYLOAD, type: SUCCEEDED }))
    .toEqual({ payload: PAYLOAD, status: PRELOAD_STATUS_SUCCEEDED });
});
