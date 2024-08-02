import { filterTypeSelected, getNotifications, getUnreadNotificationsByType } from './notificationSelector';
import { Map, List } from 'immutable';

const initialState = Map({
  notifications: Map({
    entities: Map({
      notifications: List()
    })
  }),
  filter: 'DEFAULT',
});

const returnState = Map({
  notifications: Map({
    entities: Map({
      notifications: List([
        Map({
          id: 1,
          isRead: false,
          type: 'default',
          value: 'New course available',
        }),
        Map({
          id: 2,
          isRead: false,
          type: 'urgent',
          value: 'New resume available',
        }),
        Map({
          id: 3,
          isRead: false,
          type: 'urgent',
          value: 'New data available',
        }),
      ]),
    }),
  }),
  filter: 'DEFAULT',
});

describe('tests for notificationSelector', () => {
  it('returns filter as expected', () => {
    const filter = filterTypeSelected(returnState);
    expect(filter).toEqual('DEFAULT');
  });

  it('returns notifications as expected', () => {
    const notifications = getNotifications(returnState);
    expect(notifications).toEqual(returnState.getIn(['notifications', 'entities', 'notifications']));
  });

  it('returns unread notifications based on filter', () => {
    const filter = 'urgent';
    const unreadNotifications = getUnreadNotificationsByType(returnState);
    const expectedNotifications = returnState
      .getIn(['notifications', 'entities', 'notifications'])
      .filter(notification => !notification.get('isRead') && notification.get('type') === filter);

    expect(unreadNotifications).toEqual(expectedNotifications);
  });

  it('returns unread notifications when filter is DEFAULT', () => {
    const filter = 'DEFAULT';
    const unreadNotifications = getUnreadNotificationsByType(returnState.set('filter', filter));
    const expectedNotifications = returnState
      .getIn(['notifications', 'entities', 'notifications'])
      .filter(notification => !notification.get('isRead'));

    expect(unreadNotifications).toEqual(expectedNotifications);
  });
});
