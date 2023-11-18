import React from 'react';
import CardHead from '../Card/cardHead';
import CardBody from '../Card/cardBody';
import './groupBy.css';

import { FcHighPriority } from "react-icons/fc";
import { MdSignalCellularAlt, MdSignalCellularAlt2Bar, MdSignalCellularAlt1Bar } from "react-icons/md";
import { CgBorderStyleDashed } from "react-icons/cg";


const priorities = [
  { id: 4, name: 'Urgent', icon: <FcHighPriority className='bg-trans'/> }, // Urgent
  { id: 3, name: 'High', icon: <MdSignalCellularAlt className='bg-trans'/>, }, // High
  { id: 2, name: 'Medium', icon: <MdSignalCellularAlt2Bar className='bg-trans'/>, }, // Medium
  { id: 1, name: 'Low', icon: <MdSignalCellularAlt1Bar className='bg-trans'/>, }, // Low
  { id: 0, name: 'No Priority', icon: <CgBorderStyleDashed className='bg-trans'/>, } // No Priority
];

function GroupByPriority({ data, grouping,ordering }) {
  const [groupedTickets, setGroupedTickets] = React.useState({});

  React.useEffect(() => {
    if (data) {
      // Group tickets by priority
      const groupedData = data.tickets.reduce((acc, ticket) => {
        const priority = ticket.priority;
        if (!acc[priority]) {
          acc[priority] = [];
        }
        acc[priority].push(ticket);
        return acc;
      }, {});

      setGroupedTickets(groupedData);
    }
  }, [data]);

  return (
    <div>
      {groupedTickets && Object.keys(groupedTickets).length > 0 ? (
        <div className='HorizontalAlign'>
          {priorities.map(priority => (
            <div key={priority.id} className='CardWidth'>
              <CardHead
                title= {priority.name}
                number = {groupedTickets[priority.id]?.length || 0}
                icon={priority.icon}
                users={data.users}
              />
                {ordering === 'Priority' && (
                    groupedTickets[priority.id] ? (
                      groupedTickets[priority.id].map(ticket => (
                        <CardBody key={ticket.id} ticket={ticket} users={data.users} grouping={grouping} />
                      ))
                    ) : (
                      <p>No tickets for {priority.icon}</p>
                    )
                )}
                {ordering === 'Title' && (
                    groupedTickets[priority.id] ? (
                      groupedTickets[priority.id]
                      .sort((a, b) => a.title.localeCompare(b.title)) // Sort by title in increasing order
                      .map(ticket => (
                        <CardBody key={ticket.id} ticket={ticket} users={data.users} grouping={grouping} />
                      ))
                    ) : (
                      <p>No tickets for {priority.icon}</p>
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

export default GroupByPriority;
