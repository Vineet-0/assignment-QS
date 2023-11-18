import React from 'react';
import CardHead from '../Card/cardHead';
import CardBody from '../Card/cardBody';
import './groupBy.css';

import priorities from '../groupingObjects/prorities.jsx'


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
                                title = {priority.name}
                                number = {groupedTickets[priority.id]?.length || 0}
                                icon = {priority.icon}
                                users = {data.users}
                            />
                            {ordering === 'Priority' && (
                                groupedTickets[priority.id] ? (
                                groupedTickets[priority.id].map(ticket => (
                                    <CardBody key={ticket.id} ticket={ticket} users={data.users} grouping={grouping} />
                                ))
                                ) : (
                                <></>
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
                                <></>
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
