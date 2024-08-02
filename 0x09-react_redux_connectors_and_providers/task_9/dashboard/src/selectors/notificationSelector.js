import { createSelector } from 'reselect';
import { Map, List } from 'immutable';

export const filterTypeSelected = (state) => state.get('filter');

export const getNotifications = (state) => state.getIn(['notifications', 'entities', 'notifications'], List());

export const getUnreadNotificationsByType = createSelector(
  [filterTypeSelected, getNotifications],
  (filter, notifications) => {
    if (!List.isList(notifications)) {
      return List();
    }

    const unreadNotifications = notifications.filter(
      (notification) => !notification.get('isRead')
    );

    if (filter === 'urgent') {
      return unreadNotifications.filter(
        (notification) => notification.get('type') === 'urgent'
      );
    }

    return unreadNotifications;
  }
);
