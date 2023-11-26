import React from 'react';
import './cardBody.css';

import priorities from '../groupingObjects/priorities.jsx';
import statuses from '../groupingObjects/statuses.jsx';

// Functional component for rendering the body of a card
const CardBody = ({ ticket, users, grouping }) => {
    // Find the user object based on the user ID
    const user = users.find((user) => user.id === ticket.userId);

    // Determine the availability status of the user or set to false if not available
    const active = user ? user.available
                        : false;

    // Generate a user icon based on the first character of the user name
    const userIcon = user ? user.name.charAt(0).toUpperCase()
                          : 'N/A';

    // Find the priority and status objects based on ticket data
    const priority = priorities.find(p => p.id === ticket.priority);
    const status = statuses.find(s => s.title === ticket.status);

    return (
        <div className='container'>
            {/* Top section with user ID and user icon (if grouping is not 'User') */}
            <div className='top'>
                <div className='userId'>
                    {ticket.id}
                </div>
                {grouping !== 'User' && (
                    <div className='bg-trans'>
                        {/* Display an active or inactive indicator based on user availability */}
                        {active ? <div className='active'></div>
                                : <div className='inactive'></div>
                        }
                        {/* Display the user icon (first character of the user name) */}
                        <div className='userIcon'>
                            {userIcon}
                        </div>
                    </div>
                )}
            </div>
            {/* Middle section with status icon and ticket title */}
            <div className='middle'>
                {grouping !== 'Status' && (
                    <div className='status'>
                        {/* Display the status icon based on ticket data */}
                        {status ? status.icon
                                : null}
                    </div>
                )}
                {/* Display the ticket title */}
                <div className='userTitle'>
                    {ticket.title}
                </div>
            </div>
            {/* Bottom section with priority icon and ticket tags */}
            <div className='bottom'>
                {grouping !== 'Priority' && (
                    <div className='priority priority-color'>
                        {/* Display the priority icon based on ticket data */}
                        {priority.icon}
                    </div>
                )}
                {/* Display each tag associated with the ticket */}
                {ticket.tag.map((tag, index) => (
                    <div key={index} className='tag'>
                        <div className='cir'></div>
                        {tag}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CardBody;
