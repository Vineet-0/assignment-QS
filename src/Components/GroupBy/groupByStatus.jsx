import React, { useState, useEffect } from 'react';
import CardHead from '../Card/cardHead';
import CardBody from '../Card/cardBody';
import './groupBy.css';

import { LuCircleDashed } from "react-icons/lu";
import { MdOutlineCircle } from "react-icons/md";
import { FaCircleHalfStroke } from "react-icons/fa6";
import { FaCircleCheck } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";

function GroupByStatus({ data, grouping, ordering }) {
  const [groupedTickets, setGroupedTickets] = useState({});

  useEffect(() => {
    // console.log(ordering);
    if (data) {
        // Group tickets by the specific statuses
        const groupedData = data.tickets.reduce((acc, ticket) => {
            const status = ticket.status;
            if (!acc[status]) {
            acc[status] = [];
            }
            acc[status].push(ticket);
            return acc;
        }, {});

        // console.log('Hello');
        // console.log(groupedData);

        setGroupedTickets(groupedData);
    }
  }, [data]);

  const specificStatuses = [
    { title: 'Backlog', icon: <LuCircleDashed className='bg-trans'/>},
    { title: 'Todo', icon: <MdOutlineCircle className='bg-trans'/>},
    { title: 'In progress', icon: <FaCircleHalfStroke className='bg-trans' /> },
    { title: 'Done', icon:<FaCircleCheck className='bg-trans' /> },
    { title: 'Canceled', icon: <MdCancel className='bg-trans' /> },
  ];

  return (
    <div>
      {groupedTickets && Object.keys(groupedTickets).length > 0 ? (
        <div className='HorizontalAlign'>
          {specificStatuses.map(status => (
            <div key={status.title} className='CardWidth'>
              <CardHead
                title={status.title}
                number={groupedTickets[status.title]?.length || 0}
                icon={status.icon}
                users={data.users}
                />
                {ordering === 'Priority' && (
                    groupedTickets[status.title] ? (
                    groupedTickets[status.title]
                    .sort((a, b) => b.priority - a.priority) // Sort by priority in decreasing order
                    .map(ticket => (
                        <CardBody key={ticket.id} ticket={ticket} users={data.users} grouping={grouping} />
                    ))
                    ) : (
                    <p>No tickets for {status.title}</p>
                    )
                )}
                {ordering === 'Title' && (
                    groupedTickets[status.title] ? (
                        groupedTickets[status.title]
                        .sort((a, b) => a.title.localeCompare(b.title)) // Sort by title in increasing order
                        .map(ticket => (
                            <CardBody key={ticket.id} ticket={ticket} users={data.users} grouping={grouping} />
                        ))
                    ) : (
                    <p>No tickets for {status.title}</p>
                    )
                )}
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default GroupByStatus;
