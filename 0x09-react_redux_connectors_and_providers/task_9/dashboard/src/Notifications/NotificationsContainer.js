import { connect } from 'react-redux';
import Notifications from './Notifications';
import { getUnreadNotificationsByType } from '../selectors/notificationSelector';
import { markAsRead, setNotificationFilter } from '../actions/notificationActionCreators';

const mapStateToProps = (state) => ({
  listNotifications: getUnreadNotificationsByType(state),
});

const mapDispatchToProps = (dispatch) => ({
  markAsRead: (id) => dispatch(markAsRead(id)),
  setNotificationFilter: (filter) => dispatch(setNotificationFilter(filter)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
