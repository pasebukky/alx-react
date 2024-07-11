import React from 'react';
import NotificationItem from './NotificationItem';
import { shallow } from 'enzyme';
import { StyleSheetTestUtils } from 'aphrodite';

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe('rendering components', () => {
  it('renders correct html from type="default" value="test" props', () => {
    const wrapper = shallow(<NotificationItem type="default" value="test" />);

    expect(wrapper.html()).toContain('data-notification-type="default">test</li>');


  it('renders correct html from html="<u>test</u>" props', () => {
    const wrapper = shallow(<NotificationItem html="<u>test</u>" />);

    expect(wrapper.html()).toContain('<li data-urgent="true"><u>test</u></li>');
  });
});

describe('onclick event behaves as it should', () => {
  it('should call markAsRead function with correct id when clicked', () => {
    const mockMarkAsRead = jest.fn();
    const wrapper = shallow(<NotificationItem id={1} markAsRead={mockMarkAsRead} />);

    // Ensure there is a <li> element to simulate click on
    expect(wrapper.find('li')).toHaveLength(1);

    wrapper.find('li').simulate('click');
    expect(mockMarkAsRead).toHaveBeenCalledTimes(1);
    expect(mockMarkAsRead).toHaveBeenCalledWith(1);
  });
});
