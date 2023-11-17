import React from 'react';
import './Card.css';

const Card = ({ ticket }) => {
  return (
    <div className='container'>
        <div className='top'>
            <div>
                {ticket.id}
            </div>
            <div>
                Hello
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

export default Card;