import { fromJS } from 'immutable';
import notificationReducer, { initialNotificationState } from './notificationReducer';
import {
  SET_LOADING_STATE,
  FETCH_NOTIFICATIONS_SUCCESS,
} from '../actions/notificationActionTypes';

describe('notificationReducer', () => {
  it('should return the initial state', () => {
    expect(notificationReducer(undefined, {})).toEqual(initialNotificationState);
  });

  it('should handle SET_LOADING_STATE', () => {
    const action = { type: SET_LOADING_STATE, loading: true };
    const expectedState = initialNotificationState.set('loading', true);
    expect(notificationReducer(initialNotificationState, action)).toEqual(expectedState);
  });

  it('should handle FETCH_NOTIFICATIONS_SUCCESS', () => {
    const action = { type: FETCH_NOTIFICATIONS_SUCCESS, data: [{ id: 1, type: 'default', value: 'Test' }] };
    const expectedState = initialNotificationState.set('notifications', fromJS(action.data));
    expect(notificationReducer(initialNotificationState, action)).toEqual(expectedState);
  });
});
