import { shallow, mount } from 'enzyme';
import React from 'react';
import { App, listNotificationsInitialState, mapStateToProps } from './App';
import { StyleSheetTestUtils } from 'aphrodite';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../reducers/rootReducer'; // Import the rootReducer
import { fromJS } from 'immutable';

// Initialize Redux store with the rootReducer and initial state
const store = createStore(rootReducer, fromJS({}));

describe('<App />', () => {
  beforeAll(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterAll(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('App renders without crashing', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.exists()).toBe(true);
  });

  it('should contain the Notifications component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('Notifications')).toHaveLength(1);
  });

  it('should contain the Login component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('Login')).toHaveLength(1);
  });

  it('CourseList is not displayed with isLoggedIn false by default', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('CourseList')).toHaveLength(0);
  });

  it('isLoggedIn is true', () => {
    const wrapper = shallow(<App isLoggedIn={true} />);
    expect(wrapper.find('Login')).toHaveLength(0);
    expect(wrapper.find('CourseList')).toHaveLength(1);
  });
});

describe('App Redux', () => {
  it('mapStateToProps returns the right object from user Login', () => {
    const state = fromJS({
      ui: {
        isUserLoggedIn: true,
      },
    });

    const result = mapStateToProps(state);

    expect(result).toEqual({ isLoggedIn: true });
  });

  it('mapStateToProps returns the right object from display Drawer', () => {
    const state = fromJS({
      ui: {
        isNotificationDrawerVisible: true,
      },
    });

    const result = mapStateToProps(state);

    expect(result).toEqual({ displayDrawer: true });
  });
});
