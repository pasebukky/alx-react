import React from 'react';
import { shallow, mount } from 'enzyme';
import Notifications from './Notifications';
import NotificationItem from './NotificationItem';
import { fromJS } from 'immutable';
import { createStore } from 'redux';
import rootReducer from '../reducers/rootReducer';
import { setNotificationFilter } from '../actions/notificationActionCreators';
import { getUnreadNotificationsByType } from '../selectors/notificationSelector';

// Create a mock store for testing
const store = createStore(rootReducer, fromJS({}));

describe('<Notifications />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Notifications />);
    expect(wrapper.exists()).toBe(true);
  });

  it('does not display notifications when displayDrawer is false', () => {
    const wrapper = shallow(<Notifications displayDrawer={false} />);
    expect(wrapper.find('div').hasClass('notificationsContainer')).toBe(true);
    expect(wrapper.find('div').hasClass('drawerOpen')).toBe(false);
  });

  it('displays notifications when displayDrawer is true', () => {
    const wrapper = shallow(<Notifications displayDrawer={true} />);
    expect(wrapper.find('div').hasClass('drawerOpen')).toBe(true);
  });

  it('contains the correct number of NotificationItem components', () => {
    const listNotifications = [
      { id: 1, type: 'default', value: 'Notification 1' },
      { id: 2, type: 'urgent', value: 'Notification 2' },
    ];
    const wrapper = shallow(<Notifications listNotifications={listNotifications} displayDrawer={true} />);
    expect(wrapper.find(NotificationItem)).toHaveLength(listNotifications.length);
  });

  it('contains a default NotificationItem when listNotifications is empty', () => {
    const wrapper = shallow(<Notifications listNotifications={[]} displayDrawer={true} />);
    expect(wrapper.find(NotificationItem).prop('value')).toBe('No new notification for now');
  });

  it('calls handleDisplayDrawer when the menu item is clicked', () => {
    const handleDisplayDrawer = jest.fn();
    const wrapper = shallow(<Notifications handleDisplayDrawer={handleDisplayDrawer} displayDrawer={false} />);
    wrapper.find('div').simulate('click');
    expect(handleDisplayDrawer).toHaveBeenCalled();
  });

  it('calls handleHideDrawer when the close button is clicked', () => {
    const handleHideDrawer = jest.fn();
    const wrapper = shallow(<Notifications handleHideDrawer={handleHideDrawer} displayDrawer={true} />);
    wrapper.find('button').simulate('click');
    expect(handleHideDrawer).toHaveBeenCalled();
  });

  it('calls setNotificationFilter with "URGENT" when the first button is clicked', () => {
    const setNotificationFilterMock = jest.fn();
    const wrapper = shallow(
      <Notifications
        displayDrawer={true}
        listNotifications={[]}
        setNotificationFilter={setNotificationFilterMock}
      />
    );
    wrapper.find('button').at(0).simulate('click');
    expect(setNotificationFilterMock).toHaveBeenCalledWith('URGENT');
  });

  it('calls setNotificationFilter with "DEFAULT" when the second button is clicked', () => {
    const setNotificationFilterMock = jest.fn();
    const wrapper = shallow(
      <Notifications
        displayDrawer={true}
        listNotifications={[]}
        setNotificationFilter={setNotificationFilterMock}
      />
    );
    wrapper.find('button').at(1).simulate('click');
    expect(setNotificationFilterMock).toHaveBeenCalledWith('DEFAULT');
  });
});

describe('Action Creators', () => {
  it('fetchNotifications creates the right actions', () => {
    const expectedAction = {
      type: 'FETCH_NOTIFICATIONS_SUCCESS',
      notifications: [],
    };
    expect(fetchNotifications()).toEqual(expectedAction);
  });

  it('setLoadingState creates the right actions', () => {
    const isLoading = true;
    const expectedAction = {
      type: 'SET_LOADING_STATE',
      isLoading,
    };
    expect(setLoadingState(isLoading)).toEqual(expectedAction);
  });

  it('setNotifications creates the right actions', () => {
    const notifications = [];
    const expectedAction = {
      type: 'SET_NOTIFICATIONS',
      notifications,
    };
    expect(setNotifications(notifications)).toEqual(expectedAction);
  });
});
