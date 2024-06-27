import React from 'react';
import './Notifications.css';
import closeIcon from './close-icon.png';
import { getLatestNotification } from './utils';

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
                <li data-priority="default">New course available</li>
                <li data-priority="urgent">New resume available</li>
                <li style={{
                    color: 'red',
                }}dangerouslySetInnerHTML={{ __html: getLatestNotification() }} />
            </ul>
        </div>
    );
}