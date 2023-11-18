import React from 'react';
import './cardHead.css';
import { FaPlus } from "react-icons/fa6";
import { HiDotsHorizontal } from "react-icons/hi";

const CardHead = ({ title , number , icon}) => {

    return (
        <div className='HeadTop'>
            <div className='left'>
                {icon}
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