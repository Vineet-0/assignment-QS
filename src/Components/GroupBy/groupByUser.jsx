import React, { useState, useEffect } from 'react';
import Card from '../Card';

function GroupByUsers({ data }) {
  const [groupedTickets, setGroupedTickets] = useState({});

  useEffect(() => {
    if (data) {
      // Group tickets by user
      const groupedData = data.tickets.reduce((acc, ticket) => {
        const userId = ticket.userId;
        if (!acc[userId]) {
          acc[userId] = [];
        }
        acc[userId].push(ticket);
        return acc;
      }, {});

      setGroupedTickets(groupedData);
    }
  }, [data]);

  return (
    <div>
      {groupedTickets && Object.keys(groupedTickets).length > 0 ? (
        <>
          {Object.keys(groupedTickets).map(userId => (
            <div key={userId}>
              <h2>User ID: {userId}</h2>
              {groupedTickets[userId] ? (
                groupedTickets[userId].map(ticket => (
                  <Card key={ticket.id} ticket={ticket} users={data.users} />
                ))
              ) : (
                <p>No tickets for User ID {userId}</p>
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

export default GroupByUsers;

// import React, { useState , useEffect } from 'react'
// import Card from '../Card'

// function groupByUser({ data }) {

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

// export default groupByUser;