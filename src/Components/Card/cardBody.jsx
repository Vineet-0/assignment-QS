import React from 'react';
import './cardBody.css';

const CardBody = ({ ticket , users }) => {

    const user = users.find(user => user.id === ticket.userId);
    return (
        <div className='container'>
            <div className='top'>
                <div>
                    {ticket.id}
                </div>
                <div>
                    <p>User: {user ? user.name : 'N/A'}</p>
                </div>
            </div>
            <div className='title'>
                {ticket.title}
            </div>
            <div className='tag'>
                {ticket.tag}
            </div>
        </div>
    );
};

export default CardBody;