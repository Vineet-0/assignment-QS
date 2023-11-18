import React from 'react';
import './cardHead.css';
import { FaPlus } from "react-icons/fa6";
import { HiDotsHorizontal } from "react-icons/hi";

const CardHead = ({ userName , title , number ,icon, users}) => {

    const userIcon = title.charAt(0).toUpperCase();
    const user = users.find((user) => user.name === userName);
    const active = icon === undefined && user ? user.available : false;

    return (
        <div className='HeadTop'>
            <div className='left'>
                {icon ? (
                <div className='icon'>{icon}</div>
                ) : (
                <>
                    <div className='headUserIcon'>
                        {userIcon}
                    </div>
                    {!icon && active && ( <div className='activeHead'></div>) }
                    {!icon && !active  && ( <div className='inactiveHead'></div> )}
                </>
                )}
                <div className='title'>{title}</div>
                <div className='number'>{number}</div>
            </div>
            <div className='right'>
                <div className='plus'><FaPlus /></div>
                <div className='threeDot'><HiDotsHorizontal /></div>
            </div>
        </div>
    );
};

export default CardHead;