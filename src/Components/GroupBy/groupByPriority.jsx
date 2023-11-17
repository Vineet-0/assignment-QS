import React, { useState, useEffect } from 'react';
import Card from '../Card';

function GroupByPriority({ data }) {
  const [groupedTickets, setGroupedTickets] = useState({});

  useEffect(() => {
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

  const priorityNames = {
    4: 'Urgent',
    3: 'High',
    2: 'Medium',
    1: 'Low',
    0: 'No Priority'
  };

  const priorities = [4, 3, 2, 1, 0]; // Reverse the order

  return (
    <div>
      {groupedTickets && Object.keys(groupedTickets).length > 0 ? (
        <>
          {priorities.map(priority => (
            <div key={priority}>
              <h2>{priorityNames[priority]}</h2>
              {groupedTickets[priority] ? (
                groupedTickets[priority].map(ticket => (
                  <Card key={ticket.id} ticket={ticket} users={data.users} />
                ))
              ) : (
                <p>No tickets for {priorityNames[priority]}</p>
              )}
            </div>
          ))}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default GroupByPriority;


// import React, { useState , useEffect } from 'react'
// import Card from '../Card'

// function groupByPriority({ data }) {

//     return (
//         <div>
//             {data ? (
//                 <>
//                     <h2>Tickets</h2>
//                         {data.tickets.map(ticket => (
//                             <Card key={ticket} ticket={ticket} users={data.users} />
//                         ))}
//                 </>
//                 ) : (
//                 <p>Loading...</p>
//             )}
//         </div>
//     )
// }

// export default groupByPriority;