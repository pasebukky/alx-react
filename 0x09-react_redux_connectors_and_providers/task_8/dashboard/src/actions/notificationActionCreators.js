import { MARK_AS_READ, SET_NOTIFICATION_FILTER } from './notificationActionTypes';

export const markAsRead = (id) => ({
  type: MARK_AS_READ,
  id,
});

export const setNotificationFilter = (filter) => ({
  type: SET_NOTIFICATION_FILTER,
  filter,
});
