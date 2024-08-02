import {
	FETCH_NOTIFICATIONS_SUCCESS,
	MARK_AS_READ,
	SET_TYPE_FILTER,
	SET_LOADING_STATE,
  } from '../actions/notificationActionTypes';
  import { fromJS } from 'immutable';
  
  export const initialNotificationState = fromJS({
	notifications: [],
	filter: 'DEFAULT',
	loading: false,
  });
  
  const notificationReducer = (state = initialNotificationState, action) => {
	switch (action.type) {
	  case SET_LOADING_STATE:
		return state.set('loading', action.loading);
  
	  case MARK_AS_READ:
		return state.update('notifications', notifications =>
		  notifications.map(notification => {
			if (notification.get('id') === action.id) {
			  return notification.set('isRead', true);
			}
			return notification;
		  })
		);
  
	  case SET_TYPE_FILTER:
		return state.set('filter', action.filter);
  
	  case FETCH_NOTIFICATIONS_SUCCESS:
		return state.set('notifications', fromJS(action.data));
  
	  default:
		return state;
	}
  };
  
  export default notificationReducer;
  