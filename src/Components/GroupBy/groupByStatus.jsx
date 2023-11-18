import React, { useState, useEffect } from 'react';
import CardHead from '../Card/cardHead';
import CardBody from '../Card/cardBody';
import './groupBy.css';

import { FaRegWindowRestore } from "react-icons/fa";
import { MdOutlineCircle } from "react-icons/md";
import { FaCircleHalfStroke } from "react-icons/fa6";
import { FaCircleCheck } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";

function GroupByStatus({ data, Ordering }) {
  const [groupedTickets, setGroupedTickets] = useState({});

  useEffect(() => {
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

      setGroupedTickets(groupedData);
    }
  }, [data]);

  const specificStatuses = [
    { title: 'Backlog', icon: <FaRegWindowRestore /> },
    { title: 'Todo', icon: <MdOutlineCircle/>},
    { title: 'In progress', icon: <FaCircleHalfStroke /> },
    { title: 'Done', icon:<FaCircleCheck /> },
    { title: 'Canceled', icon: <MdCancel /> },
  ];

  return (
    <div>
      {groupedTickets && Object.keys(groupedTickets).length > 0 ? (
        <div className='HorizontalAlign'>
          {specificStatuses.map(status => (
            <div key={status.title} className='CardWidth'>
              <CardHead title={status.title} number={groupedTickets[status.title]?.length || 0} icon={status.icon} />
              {groupedTickets[status.title] ? (
                groupedTickets[status.title].map(ticket => (
                  <CardBody key={ticket.id} ticket={ticket} users={data.users} />
                ))
              ) : (
                <p>No tickets for {status.title}</p>
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
