import React from 'react';
import './Notifications.css';
import closeIcon from '../assets/close-icon.png';
import { getLatestNotification } from '../utils/utils';
import NotificationItem from './NotificationItem';

export default function Notification() {
    const handleButtonClick = () => {
        console.log('Close button has been clicked');
    };
    return (
        <div className="Notifications">
            <p>Here is the list of notifications</p>
            <button
                style={{
                    float: 'right',
                    marginRight: '10px',
                    color: 'grey',
                    cursor: 'pointer',
                }}
                arial-label="Close"
                onClick={handleButtonClick}
            >
                <img src={closeIcon} alt="close" width="20px"/>
            </button>
            <ul>
				<NotificationItem type='default' value='New course available' />
				<NotificationItem type='urgent' value='New resume available' />
				<NotificationItem type='urgent' html={getLatestNotification()} />
			</ul>
        </div>
    );
}