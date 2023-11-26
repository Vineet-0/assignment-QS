import React from 'react';
import './cardHead.css';

import { FaPlus } from "react-icons/fa6";
import { HiDotsHorizontal } from "react-icons/hi";

// Functional component for rendering the header of a card
const CardHead = ({ userName, title, number, icon, users }) => {
    // Generate a user icon based on the first character of the title
    const userIcon = title.charAt(0).toUpperCase();

    // Find the user object based on the user name
    const user = users.find((user) => user.name === userName);

    // Determine the availability status of the user or set to false if not available
    const active = icon === undefined && user ? user.available
                                              : false;

    return (
        <div className='HeadTop'>
            <div className='left'>
                {/* Check if an icon is provided, if not, display the user icon and availability status */}
                {icon ? (
                    <div className='icon'>{icon}</div>
                ) : (
                    <>
                        <div className='headUserIcon'>
                            {userIcon}
                        </div>
                        {/* Display an active or inactive indicator based on user availability */}
                        {active ? <div className='activeHead'></div>
                                : <div className='inactiveHead'></div>
                        }
                    </>
                )}
                {/* Display the title and number in the header */}
                <div className='title'>{title}</div>
                <div className='number'>{number}</div>
            </div>
            {/* Display icons on the right side of the header */}
            <div className='right'>
                <div className='plus'><FaPlus /></div>
                <div className='threeDot'><HiDotsHorizontal /></div>
            </div>
        </div>
    );
};

export default CardHead;
