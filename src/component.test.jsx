import { mount, shallow } from 'enzyme';
import React from 'react';

import Preloadr, { Empty } from './component';
import {
  PRELOAD_STATUS_FAILED,
  PRELOAD_STATUS_REQUESTED,
  PRELOAD_STATUS_SUCCEEDED,
} from './status';

const Children = () => <p>Succeeded</p>;
const Failed = () => <p>Failed</p>;
const Requested = () => <p>Requested</p>;

test(`<Preloadr /> > Loads the 'failed' component on ${PRELOAD_STATUS_FAILED}`, () => {
  const wrapper = shallow(
    <Preloadr
      failed={() => <Failed />}
      requested={() => <Requested />}
      status={PRELOAD_STATUS_FAILED}
    >
      {() => <Children />}
    </Preloadr>,
  );
  const expectedChildren = false;
  const expectedFailed = true;
  const expectedRequested = false;

  const actualChildren = wrapper.find(Children).exists();
  const actualFailed = wrapper.find(Failed).exists();
  const actualRequested = wrapper.find(Requested).exists();

  expect(actualChildren).toBe(expectedChildren);
  expect(actualFailed).toBe(expectedFailed);
  expect(actualRequested).toBe(expectedRequested);
});

test(`<Preloadr /> > Loads the 'failed' component if a single status is ${PRELOAD_STATUS_FAILED}`, () => {
  const wrapper = shallow(
    <Preloadr
      failed={() => <Failed />}
      requested={() => <Requested />}
      status={[PRELOAD_STATUS_FAILED, PRELOAD_STATUS_SUCCEEDED]}
    >
      {() => <Children />}
    </Preloadr>,
  );
  const expectedChildren = false;
  const expectedFailed = true;
  const expectedRequested = false;

  const actualChildren = wrapper.find(Children).exists();
  const actualFailed = wrapper.find(Failed).exists();
  const actualRequested = wrapper.find(Requested).exists();

  expect(actualChildren).toBe(expectedChildren);
  expect(actualFailed).toBe(expectedFailed);
  expect(actualRequested).toBe(expectedRequested);
});

test('<Preloadr /> > Loads the \'requested\' component by default', () => {
  const wrapper = shallow(
    <Preloadr
      failed={() => <Failed />}
      requested={() => <Requested />}
    >
      {() => <Children />}
    </Preloadr>,
  );
  const expectedChildren = false;
  const expectedFailed = false;
  const expectedRequested = true;

  const actualChildren = wrapper.find(Children).exists();
  const actualFailed = wrapper.find(Failed).exists();
  const actualRequested = wrapper.find(Requested).exists();

  expect(actualChildren).toBe(expectedChildren);
  expect(actualFailed).toBe(expectedFailed);
  expect(actualRequested).toBe(expectedRequested);
});

test(`<Preloadr /> > Loads the 'requested' component on ${PRELOAD_STATUS_REQUESTED}`, () => {
  const wrapper = shallow(
    <Preloadr
      failed={() => <Failed />}
      requested={() => <Requested />}
      status={PRELOAD_STATUS_REQUESTED}
    >
      {() => <Children />}
    </Preloadr>,
  );
  const expectedChildren = false;
  const expectedFailed = false;
  const expectedRequested = true;

  const actualChildren = wrapper.find(Children).exists();
  const actualFailed = wrapper.find(Failed).exists();
  const actualRequested = wrapper.find(Requested).exists();

  expect(actualChildren).toBe(expectedChildren);
  expect(actualFailed).toBe(expectedFailed);
  expect(actualRequested).toBe(expectedRequested);
});

test(`<Preloadr /> > Loads the 'requested' component if a single status is ${PRELOAD_STATUS_REQUESTED}`, () => {
  const wrapper = shallow(
    <Preloadr
      failed={() => <Failed />}
      requested={() => <Requested />}
      status={[PRELOAD_STATUS_FAILED, PRELOAD_STATUS_REQUESTED, PRELOAD_STATUS_SUCCEEDED]}
    >
      {() => <Children />}
    </Preloadr>,
  );
  const expectedChildren = false;
  const expectedFailed = false;
  const expectedRequested = true;

  const actualChildren = wrapper.find(Children).exists();
  const actualFailed = wrapper.find(Failed).exists();
  const actualRequested = wrapper.find(Requested).exists();

  expect(actualChildren).toBe(expectedChildren);
  expect(actualFailed).toBe(expectedFailed);
  expect(actualRequested).toBe(expectedRequested);
});

test(`<Preloadr /> > Loads the 'children' component on ${PRELOAD_STATUS_SUCCEEDED}`, () => {
  const wrapper = shallow(
    <Preloadr
      failed={() => <Failed />}
      requested={() => <Requested />}
      status={PRELOAD_STATUS_SUCCEEDED}
    >
      {() => <Children />}
    </Preloadr>,
  );
  const expectedChildren = true;
  const expectedFailed = false;
  const expectedRequested = false;

  const actualChildren = wrapper.find(Children).exists();
  const actualFailed = wrapper.find(Failed).exists();
  const actualRequested = wrapper.find(Requested).exists();

  expect(actualChildren).toBe(expectedChildren);
  expect(actualFailed).toBe(expectedFailed);
  expect(actualRequested).toBe(expectedRequested);
});

test(`<Preloadr /> > Loads the 'children' component if all are ${PRELOAD_STATUS_SUCCEEDED}`, () => {
  const wrapper = shallow(
    <Preloadr
      failed={() => <Failed />}
      requested={() => <Requested />}
      status={[PRELOAD_STATUS_SUCCEEDED, PRELOAD_STATUS_SUCCEEDED, PRELOAD_STATUS_SUCCEEDED]}
    >
      {() => <Children />}
    </Preloadr>,
  );
  const expectedChildren = true;
  const expectedFailed = false;
  const expectedRequested = false;

  const actualChildren = wrapper.find(Children).exists();
  const actualFailed = wrapper.find(Failed).exists();
  const actualRequested = wrapper.find(Requested).exists();

  expect(actualChildren).toBe(expectedChildren);
  expect(actualFailed).toBe(expectedFailed);
  expect(actualRequested).toBe(expectedRequested);
});

test('<Preloadr /> > Loads null for \'failed\' and \'requested\' by default', () => {
  const wrapper = mount(
    <Preloadr status={PRELOAD_STATUS_FAILED}>
      {() => <Children />}
    </Preloadr>,
  );

  expect(wrapper.props().failed).toEqual(Empty);
  expect(wrapper.props().requested).toEqual(Empty);
});
