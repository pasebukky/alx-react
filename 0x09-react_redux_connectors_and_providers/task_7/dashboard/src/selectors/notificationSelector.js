import { Map, List } from 'immutable';

export const filterTypeSelected = (state) => state.get('filter');

export const getNotifications = (state) => state.getIn(['notifications', 'entities', 'notifications'], List());

export const getUnreadNotifications = (state) => {
  const notifications = state.getIn(['notifications', 'entities', 'notifications'], List());
  
  if (!List.isList(notifications)) {
    return List(); 
  }

  const unreadNotifications = notifications.filter(
    (notification) => !notification.get('isRead')
  );

  return unreadNotifications;
};
