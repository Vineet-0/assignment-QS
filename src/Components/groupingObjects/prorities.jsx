import React from 'react';

import { MdOutlinePriorityHigh } from "react-icons/md";
import { CgBorderStyleDashed } from "react-icons/cg";

import High from '../PriorityIcons/High.jsx'
import Medium from '../PriorityIcons/Medium.jsx';
import Low from '../PriorityIcons/Low.jsx';

const priorities = [
    {
        id: 4,
        name: 'Urgent',
        icon: <MdOutlinePriorityHigh className='flex urgent'/>,
    },
    {
        id: 3,
        name: 'High',
        icon: <High className='bg-trans flex priority-color greyy'/>,
    },
    {
        id: 2,
        name: 'Medium',
        icon: <Medium className='bg-trans flex priority-color greyy'/>,
    },
    {
        id: 1,
        name: 'Low',
        icon: <Low className='bg-trans flex priority-color greyy'/>,
    },
    {
        id: 0,
        name: 'No Priority',
        icon: <CgBorderStyleDashed className='bg-trans flex priority-color'/>,
    }
];

export default priorities;