import React, { useState, useEffect } from 'react';
import CardHead from '../Card/cardHead';
import CardBody from '../Card/cardBody';
import './groupBy.css';

function GroupByUsers({ data,grouping, ordering }) {
  const [groupedTickets, setGroupedTickets] = useState({});

  // console.log("Hello");
  // console.log(data.users);

  useEffect(() => {
    if (data) {
      // Group tickets by user name
      const groupedData = data.tickets.reduce((acc, ticket) => {
        const user = data.users.find(user => user.id === ticket.userId);
        const userName = user ? user.name : 'Unknown';

        if (!acc[userName]) {
          acc[userName] = [];
        }
        acc[userName].push(ticket);
        return acc;
      }, {});

      // Sort tickets within each user group by user name
      Object.keys(groupedData).forEach(userName => {
        groupedData[userName].sort((a, b) => {
          return a.title.localeCompare(b.title); // You can change the sorting criteria as needed
        });
      });

      setGroupedTickets(groupedData);
    }
  }, [data]);

  return (
    <div>
      {groupedTickets && Object.keys(groupedTickets).length > 0 ? (
        <div className='HorizontalAlign'>
          {Object.keys(groupedTickets)
            .sort((a, b) => a.localeCompare(b))
            .map(userName => (
              <div key={userName} className='CardWidth'>
                <CardHead
                    title={userName}
                    number={groupedTickets[userName]?.length || 0}
                    users={data.users}
                />
                {ordering === 'Priority' && (
                    groupedTickets[userName] ? (
                      groupedTickets[userName]
                      .sort((a, b) => b.priority - a.priority) // Sort by priority in decreasing order
                      .map(ticket => (
                        <CardBody key={ticket.id} ticket={ticket} users={data.users} grouping={grouping} />
                      ))
                    ) : (
                      <></>
                    )
                )}
                {ordering === 'Title' && (
                    groupedTickets[userName] ? (
                      groupedTickets[userName]
                      .sort((a, b) => a.title.localeCompare(b.title)) // Sort by title in increasing order
                      .map(ticket => (
                        <CardBody key={ticket.id} ticket={ticket} users={data.users} grouping={grouping}/>
                      ))
                    ) : (
                      <></>
                    )
                )}
              </div>
            ))}
          {/* {Object.keys(groupedTickets).map(userName => (
            <div key={userName}>
              <CardHead title={userName} />
              {groupedTickets[userName] ? (
                groupedTickets[userName].map(ticket => (
                  <CardBody key={ticket.id} ticket={ticket} users={data.users} />
                ))
              ) : (
                <p>No tickets for User Name {userName}</p>
              )}
            </div>
          ))} */}
        </div>
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