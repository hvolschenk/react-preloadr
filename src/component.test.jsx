import { mount, shallow } from 'enzyme';
import React from 'react';

import Preloadr, { Empty } from './component';
import {
  PRELOAD_STATUS_FAILED,
  PRELOAD_STATUS_REQUESTED,
  PRELOAD_STATUS_SUCCEEDED,
} from './status';

describe('<Preloadr />', () => {
  const Children = () => <p>Succeeded</p>;
  const Failed = () => <p>Failed</p>;
  const Requested = () => <p>Requested</p>;
  test(`Loads the 'failed' component on ${PRELOAD_STATUS_FAILED}`, () => {
    const wrapper = shallow(
      <Preloadr
        failed={() => <Failed />}
        requested={() => <Requested />}
        status={PRELOAD_STATUS_FAILED}
      >
        {() => <Children />}
      </Preloadr>,
    );

    expect(wrapper.find(Failed).exists()).toBeTruthy();
    expect(wrapper.find(Children).exists()).toBeFalsy();
    expect(wrapper.find(Requested).exists()).toBeFalsy();
  });

  test('Loads the \'requested\' component by default', () => {
    const wrapper = shallow(
      <Preloadr
        failed={() => <Failed />}
        requested={() => <Requested />}
      >
        {() => <Children />}
      </Preloadr>,
    );

    expect(wrapper.find(Requested).exists()).toBeTruthy();
    expect(wrapper.find(Children).exists()).toBeFalsy();
    expect(wrapper.find(Failed).exists()).toBeFalsy();
  });

  test(`Loads the 'requested' component on ${PRELOAD_STATUS_REQUESTED}`, () => {
    const wrapper = shallow(
      <Preloadr
        failed={() => <Failed />}
        requested={() => <Requested />}
        status={PRELOAD_STATUS_REQUESTED}
      >
        {() => <Children />}
      </Preloadr>,
    );

    expect(wrapper.find(Requested).exists()).toBeTruthy();
    expect(wrapper.find(Children).exists()).toBeFalsy();
    expect(wrapper.find(Failed).exists()).toBeFalsy();
  });

  test(`Loads the 'children' component on ${PRELOAD_STATUS_SUCCEEDED}`, () => {
    const wrapper = shallow(
      <Preloadr
        failed={() => <Failed />}
        requested={() => <Requested />}
        status={PRELOAD_STATUS_SUCCEEDED}
      >
        {() => <Children />}
      </Preloadr>,
    );

    expect(wrapper.find(Children).exists()).toBeTruthy();
    expect(wrapper.find(Failed).exists()).toBeFalsy();
    expect(wrapper.find(Requested).exists()).toBeFalsy();
  });

  test('Loads null for \'failed\' and \'requested\' by default', () => {
    const wrapper = mount(
      <Preloadr status={PRELOAD_STATUS_FAILED}>
        {() => <Children />}
      </Preloadr>,
    );

    expect(wrapper.props().failed).toEqual(Empty);
    expect(wrapper.props().requested).toEqual(Empty);
  });
});
