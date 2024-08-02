import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import closeIcon from '../assets/close-icon.png';
import NotificationItem from './NotificationItem';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { markAsRead } from '../actions/notificationActionCreators';
import { getUnreadNotifications } from '../selectors/notificationSelector';

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.markAsRead = this.markAsRead.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return (
      nextProps.listNotifications.length > this.props.listNotifications.length ||
      nextProps.displayDrawer !== this.props.displayDrawer
    );
  }

  markAsRead(id) {
    this.props.markAsRead(id);
  }

  render() {
    const {
      displayDrawer,
      listNotifications,
      handleDisplayDrawer,
      handleHideDrawer,
    } = this.props;

    return (
      <div
        className={
          displayDrawer
            ? css(styles.notificationsContainer, styles.drawerOpen)
            : css(styles.notificationsContainer)
        }
      >
        <div
          className={
            displayDrawer
              ? css(styles.none)
              : css(styles.menuItem, styles.hover)
          }
          onClick={handleDisplayDrawer}
        >
          Your notifications
        </div>
        {displayDrawer && (
          <div className={css(styles.Notifications, styles.noBorder)}>
            <p className={css(styles.center)}>Here is the list of notifications</p>
            <ul>
              {listNotifications.length > 0 ? (
                listNotifications.map(({ type, value, html, id }) => (
                  <NotificationItem
                    key={id}
                    type={type}
                    value={value}
                    html={html}
                    markAsRead={this.markAsRead}
                    id={id}
                    styles={
                      html || type === 'urgent' ? styles.urgent : styles.default
                    }
                  />
                ))
              ) : (
                <NotificationItem value="No new notification for now" />
              )}
            </ul>
            <button
              className={css(styles.button)}
              aria-label="Close"
              onClick={handleHideDrawer}
            >
              <img
                src={closeIcon}
                alt="close icon"
                width="10px"
                height="10px"
              />
            </button>
          </div>
        )}
      </div>
    );
  }
}

Notifications.propTypes = {
  displayDrawer: PropTypes.bool,
  listNotifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
      value: PropTypes.string,
      html: PropTypes.shape({
        __html: PropTypes.string,
      }),
    })
  ),
  handleDisplayDrawer: PropTypes.func.isRequired,
  handleHideDrawer: PropTypes.func.isRequired,
  markAsRead: PropTypes.func.isRequired,
};

Notifications.defaultProps = {
  displayDrawer: false,
  listNotifications: [],
};

// Define keyframes here
const opacityKeyframes = {
  from: {
    opacity: 0.5,
  },
  to: {
    opacity: 1,
  },
};

const bounceKeyframes = {
  '0%': {
    transform: 'translateY(0)',
  },
  '25%': {
    transform: 'translateY(-5px)',
  },
  '75%': {
    transform: 'translateY(5px)',
  },
  '100%': {
    transform: 'translateY(0)',
  },
};

// Use keyframes in styles
const styles = StyleSheet.create({
  notificationsContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '1rem',
    marginRight: '1rem',
    gridRow: '1',
  },
  menuItem: {
    textAlign: 'right',
    marginRight: '.5rem',
  },
  hover: {
    ':hover': {
      cursor: 'pointer',
      animationName: [bounceKeyframes, opacityKeyframes],
      animationDuration: '0.5s, 1s',
      animationIterationCount: '3',
    },
  },
  Notifications: {
    border: 'dashed red',
    padding: '2rem',
    marginTop: '.3rem',
  },
  noBorder: {
    '@media (max-width: 900px)': {
      border: 'none',
    },
  },
  none: {
    display: 'none',
    '@media (max-width: 900px)': {
      display: 'none',
    },
  },
  button: {
    position: 'absolute',
    top: '3.5rem',
    right: '2.2rem',
    '@media (max-width: 900px)': {
      top: '10.5rem',
      right: '14.2rem',
    },
  },
  center: {
    '@media (max-width: 900px)': {
      marginLeft: '4vw',
      fontSize: '20px',
    },
  },
  drawerOpen: {
    '@media (max-width: 900px)': {
      gridRow: '2',
    },
  },
  urgent: {
    color: 'red',
  },
  default: {
    color: 'black',
  },
});

const mapStateToProps = (state) => {
  return {
    listNotifications: getUnreadNotifications(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    markAsRead: (id) => dispatch(markAsRead(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
