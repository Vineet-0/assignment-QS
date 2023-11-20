import React from 'react';
import './cardBody.css';

import priorities from '../GroupingObjects/priorities.jsx'
import statuses from '../GroupingObjects/statuses.jsx'



const CardBody = ({ ticket, users, grouping }) => {
    const user = users.find((user) => user.id === ticket.userId);
    const active = user ? user.available : false;
    const userName =
        grouping === 'User'
            ? ' '
            : user
                ? user.name.charAt(0).toUpperCase()
                : 'N/A';

    const priority = priorities.find(p => p.id === ticket.priority);

    const status = statuses.find(s => s.title === ticket.status);

    return (
        <div className='container'>
            <div className='top'>
                <div className='userId'>{ticket.id}</div>
                {grouping !== 'User' && (
                    <div className='bg-trans'>
                        {grouping !== 'User' && active && ( <div className='active'></div>) }
                        {grouping !== 'User' && !active  && ( <div className='inactive'></div> )}
                        <div className='userIcon'>
                            {userName}
                        </div>
                    </div>  
                )}
            </div>
            <div className='middle'>
                {grouping !== 'Status' && (
                    <div className='status'>
                        {status ? status.icon : null}
                    </div>
                )}
                <div className='userTitle'>
                    {ticket.title}
                </div>
            </div>
            <div className='bottom'>
                {grouping !== 'Priority' && (
                    <div className='priority priority-color'>
                        {priority.icon}
                    </div>
                )}
                {ticket.tag.map((tag) => (
                    <div className='tag'>
                        <div className='cir'>

                        </div>
                        {tag}
                    </div>
                ))}
            </div>

        </div>
    );
};

export default CardBody;