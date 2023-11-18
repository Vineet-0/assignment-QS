import React from 'react';
import './cardBody.css';

import { FcHighPriority } from "react-icons/fc";
import { MdSignalCellularAlt, MdSignalCellularAlt2Bar, MdSignalCellularAlt1Bar } from "react-icons/md";
import { CgBorderStyleDashed } from "react-icons/cg";

import { LuCircleDashed } from "react-icons/lu";
import { MdOutlineCircle } from "react-icons/md";
import { FaCircleHalfStroke } from "react-icons/fa6";
import { FaCircleCheck } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";


const priorities = [
    { id: 4, icon: <FcHighPriority className='bg-trans'/> },             // Urgent
    { id: 3, icon: <MdSignalCellularAlt className='bg-trans'/>, },      // High
    { id: 2, icon: <MdSignalCellularAlt2Bar className='bg-trans'/>, },  // Medium
    { id: 1, icon: <MdSignalCellularAlt1Bar className='bg-trans'/>, },  // Low
    { id: 0, icon: <CgBorderStyleDashed className='bg-trans'/>, }       // No Priority
  ];

const specificStatuses = [
    { title: 'Backlog', icon: <LuCircleDashed className='bg-trans'/>},
    { title: 'Todo', icon: <MdOutlineCircle className='bg-trans'/>},
    { title: 'In progress', icon: <FaCircleHalfStroke className='bg-trans'/> },
    { title: 'Done', icon:<FaCircleCheck className='bg-trans'/> },
    { title: 'Canceled', icon: <MdCancel className='bg-trans'/> },
  ];


const CardBody = ({ ticket, users, grouping }) => {
  const user = users.find((user) => user.id === ticket.userId);
  const active = user ? user.active : false;
  const userName =
    grouping === 'User'
      ? ' '
      : user
        ? user.name.charAt(0).toUpperCase()
        : 'N/A';

    const priority = priorities.find(p => p.id === ticket.priority);

    const status = specificStatuses.find(s => s.title === ticket.status);

  return (
    <div className='container'>
        <div className='top'>
            <div className='userId'>{ticket.id}</div>
              {grouping !== 'User' && (
                  <div className='userIcon'>
                    {userName}
                  </div>  
              )}
        </div>
        {grouping !== 'User' && active && ( <div className='active'></div>) }
        {grouping !== 'User' && !active  && ( <div className='inactive'></div> )}
        <div className='middle'>
            {grouping !== 'Status' && (
                <div className='status'>
                    {status ? status.icon : null}
                </div>
            )}
            <div className='userTitle'>{ticket.title}</div>
        </div>
        <div className='bottom'>
            {grouping !== 'Priority' && (
                <div className='priority'>
                    {priority.icon}
                </div>
            )}
            <div className='tag'>
                <div className='cir'>

                </div>
                {ticket.tag}
            </div> 
        </div>

    </div>
  );
};

export default CardBody;