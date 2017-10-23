import { mount, shallow } from 'enzyme';
import React from 'react';
import Maybe from 'react-maybe';

import Preloadr from './component';
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
    const wrapper = mount(
      <Preloadr
        failed={<Failed />}
        requested={<Requested />}
        status={PRELOAD_STATUS_FAILED}
      >
        <Children />
      </Preloadr>,
    );

    expect(wrapper.find(Failed).exists()).toBeTruthy();
    expect(wrapper.find(Children).exists()).toBeFalsy();
    expect(wrapper.find(Requested).exists()).toBeFalsy();
  });

  test('Loads the \'requested\' component by default', () => {
    const wrapper = mount(
      <Preloadr
        failed={<Failed />}
        requested={<Requested />}
      >
        <Children />
      </Preloadr>,
    );

    expect(wrapper.find(Requested).exists()).toBeTruthy();
    expect(wrapper.find(Children).exists()).toBeFalsy();
    expect(wrapper.find(Failed).exists()).toBeFalsy();
  });

  test(`Loads the 'requested' component on ${PRELOAD_STATUS_REQUESTED}`, () => {
    const wrapper = mount(
      <Preloadr
        failed={<Failed />}
        requested={<Requested />}
        status={PRELOAD_STATUS_REQUESTED}
      >
        <Children />
      </Preloadr>,
    );

    expect(wrapper.find(Requested).exists()).toBeTruthy();
    expect(wrapper.find(Children).exists()).toBeFalsy();
    expect(wrapper.find(Failed).exists()).toBeFalsy();
  });

  test(`Loads the 'children' component on ${PRELOAD_STATUS_SUCCEEDED}`, () => {
    const wrapper = mount(
      <Preloadr
        failed={<Failed />}
        requested={<Requested />}
        status={PRELOAD_STATUS_SUCCEEDED}
      >
        <Children />
      </Preloadr>,
    );

    expect(wrapper.find(Children).exists()).toBeTruthy();
    expect(wrapper.find(Failed).exists()).toBeFalsy();
    expect(wrapper.find(Requested).exists()).toBeFalsy();
  });

  test('Loads undefined for \'failed\' and \'requested\' by default', () => {
    const wrapper = shallow(<Preloadr status={PRELOAD_STATUS_SUCCEEDED}><Children /></Preloadr>);

    expect(wrapper.find(Maybe).at(0).props().either).toBe(undefined);
    expect(wrapper.find(Maybe).at(1).props().either).toBe(undefined);
  });
});
