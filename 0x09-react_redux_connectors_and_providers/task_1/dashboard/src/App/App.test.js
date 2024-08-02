/**
 * @jest-environment jsdom
 */
import { shallow, mount } from "enzyme";
import React from "react";
import App, { listNotificationsInitialState, mapStateToProps } from "./App";
import { StyleSheetTestUtils } from "aphrodite";
import AppContext, { user, logOut } from "./AppContext";
import { fromJS } from "immutable";
import { createStore } from "redux";
import { Provider } from "react-redux";
import uiReducer, { initialState } from "../reducers/uiReducer";
import { displayNotificationDrawer, hideNotificationDrawer } from "../actions/uiActionCreators";

const store = createStore(uiReducer, initialState);

describe("<App />", () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it("renders without crashing", () => {
    const wrapper = shallow(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  it("mapStateToProps returns the right object from user Login", () => {
    let state = fromJS({
      isUserLoggedIn: true,
    });

    const result = mapStateToProps(state);

    expect(result).toEqual({ isLoggedIn: true });
  });

  it("mapStateToProps returns the right object when displayDrawer is true", () => {
    let state = fromJS({
      isNotificationDrawerVisible: true,
    });

    const result = mapStateToProps(state);

    expect(result).toEqual({ displayDrawer: true });
  });

  it("renders App component correctly with Redux", () => {
    const wrapper = mount(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(wrapper.find(App).length).toBe(1);
  });

  it("calls displayNotificationDrawer when handleDisplayDrawer is called", () => {
    const mockDisplayNotificationDrawer = jest.fn();
    const wrapper = shallow(
      <App
        isLoggedIn={false}
        displayDrawer={false}
        displayNotificationDrawer={mockDisplayNotificationDrawer}
        hideNotificationDrawer={() => {}}
      />
    );
    const instance = wrapper.instance();
    instance.props.displayNotificationDrawer();
    expect(mockDisplayNotificationDrawer).toHaveBeenCalled();
  });

  it("calls hideNotificationDrawer when handleHideDrawer is called", () => {
    const mockHideNotificationDrawer = jest.fn();
    const wrapper = shallow(
      <App
        isLoggedIn={false}
        displayDrawer={false}
        displayNotificationDrawer={() => {}}
        hideNotificationDrawer={mockHideNotificationDrawer}
      />
    );
    const instance = wrapper.instance();
    instance.props.hideNotificationDrawer();
    expect(mockHideNotificationDrawer).toHaveBeenCalled();
  });
});
