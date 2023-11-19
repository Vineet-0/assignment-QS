import React from 'react';

import { MdOutlinePriorityHigh } from "react-icons/md";
import { MdSignalCellularAlt } from "react-icons/md";
import { MdSignalCellularAlt2Bar } from "react-icons/md";
import { MdSignalCellularAlt1Bar } from "react-icons/md";
import { CgBorderStyleDashed } from "react-icons/cg";

import High from '../PriorityIcons/High.jsx'
import Medium from '../PriorityIcons/Medium.jsx';
import Low from '../PriorityIcons/Low.jsx';

const priorities = [
    {
        id: 4,
        name: 'Urgent',
        icon: <MdOutlinePriorityHigh className='bg-trans flex urgent'/> 
    },
    {
        id: 3,
        name: 'High',
        // icon: <MdSignalCellularAlt className='bg-trans flex priority-color'/>
        icon: <High className='bg-trans flex priority-color'/>
    },
    {
        id: 2,
        name: 'Medium',
        // icon: <MdSignalCellularAlt2Bar className='bg-trans flex priority-color'/>
        icon: <Medium className='bg-trans flex priority-color'/>
    },
    {
        id: 1,
        name: 'Low',
        // icon: <MdSignalCellularAlt1Bar className='bg-trans flex priority-color'/>
        icon: <Low className='bg-trans flex priority-color'/>
    },
    {
        id: 0,
        name: 'No Priority',
        icon: <CgBorderStyleDashed className='bg-trans flex priority-color'/>
    }
];

export default priorities;