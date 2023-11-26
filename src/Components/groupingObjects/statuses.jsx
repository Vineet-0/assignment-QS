import React from 'react';

import { LuCircleDashed } from "react-icons/lu";
import { MdOutlineCircle } from "react-icons/md";
import { FaCircleHalfStroke } from "react-icons/fa6";
import { FaCircleCheck } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";

// Array representing different statuses along with their icons
const statuses = [
    {
        title: 'Backlog',
        icon: <LuCircleDashed className='bg-trans flex backLog'/>
    },
    {
        title: 'Todo',
        icon: <MdOutlineCircle className='bg-trans flex todo'/>
    },
    {
        title: 'In progress',
        icon: <FaCircleHalfStroke className='bg-trans flex progress'/>
    },
    {
        title: 'Done',
        icon: <FaCircleCheck className='bg-trans flex done'/>
    },
    {
        title: 'Canceled',
        icon: <MdCancel className='bg-trans flex cancel'/>
    },
];

// Exporting the statuses array for use in other components
export default statuses;