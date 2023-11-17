import React, { useState , useEffect } from 'react'
import Card from '../Card'

function GroupByStatus({ data }) {
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

    const specificStatuses = ['Backlog' , 'Todo', 'In progress', 'Done', 'Canceled'];

    return (
        <div>
            {groupedTickets && Object.keys(groupedTickets).length > 0 ? (
            <>
                {specificStatuses.map(status => (
                <div key={status}>
                    <h2>{status}</h2>
                    {groupedTickets[status] ? (
                    groupedTickets[status].map(ticket => (
                        <Card key={ticket.id} ticket={ticket} users={data.users} />
                    ))
                    ) : (
                    <p>No tickets for {status}</p>
                    )}
                </div>
                ))}
            </>
            ) : (
            <p>Loading...</p>
            )}
        </div>
    )
}

export default GroupByStatus;