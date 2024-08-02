// notificationActionCreators.js

import { MARK_AS_READ } from './notificationActionTypes'; // Import the action type

// Action creator for marking a notification as read
export const markAsRead = (id) => ({
  type: MARK_AS_READ,
  id,
});
