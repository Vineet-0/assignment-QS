import React from 'react';
import CardHead from '../Card/cardHead';
import CardBody from '../Card/cardBody';
import OrderByTitle from '../OrderBy/orderByTitle'; // Import the OrderByTitle component
import './groupBy.css';

import { MdSignalCellularAlt, MdSignalCellularAlt2Bar, MdSignalCellularAlt1Bar } from "react-icons/md";

const priorities = [
  {
    id: 4,
    name: 'Urgent',
    icon: '🔥', // Urgent
  },
  {
    id: 3,
    name: 'High',
    icon: <MdSignalCellularAlt />, // High
  },
  {
    id: 2,
    name: 'Medium',
    icon: <MdSignalCellularAlt2Bar />, // Medium
  },
  {
    id: 1,
    name: 'Low',
    icon: <MdSignalCellularAlt1Bar />, // Low
  },
  {
    id: 0,
    name: 'No Priority',
    icon: '❓', // No Priority
  }
];

function GroupByPriority({ data, ordering }) {
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
              />
              {ordering === 'Priority' ? (
                // Render Card component for Priority ordering
                groupedTickets[priority.id] ? (
                  groupedTickets[priority.id].map(ticket => (
                    <CardBody key={ticket.id} ticket={ticket} users={data.users} />
                  ))
                ) : (
                  <p>No tickets for {priority.icon}</p>
                )
              ) : (
                // Render OrderByTitle component for Title ordering
                <OrderByTitle tickets={groupedTickets[priority.id]} />
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
