import React from 'react';
import CardHead from '../Card/cardHead.jsx';
import CardBody from '../Card/cardBody.jsx';
import './groupBy.css';

// Importing priorities data for grouping
import priorities from '../groupingObjects/priorities.jsx'


function GroupByPriority({ data, grouping,ordering }) {

    // State to store grouped tickets based on priority
    const [groupedTickets, setGroupedTickets] = React.useState({});

    // Effect to group tickets by priority when data changes
    React.useEffect(() => {
        // Check if data is available
        if (data) {
            // Grouping tickets based on priority
            const groupedData = data.tickets.reduce((acc, ticket) => {
                const priority = ticket.priority;
                if (!acc[priority]) {
                    acc[priority] = [];
                }
                acc[priority].push(ticket);
                return acc;
            }, {});

            // Updating state with grouped data
            setGroupedTickets(groupedData);
        }
    }, [data]);

    return (
        <div>
            {/* Check if there are grouped tickets to display */}
            {/* Rendering grouped tickets based on priority */}
            {groupedTickets && Object.keys(groupedTickets).length > 0 ? (
                <div className='HorizontalAlign'> 
                    {priorities.map(priority => (
                        <div key={priority.id} className='CardWidth'>

                            {/* CardHead component for displaying priority information */}
                            <CardHead
                                title = {priority.name}
                                number = {groupedTickets[priority.id]?.length || 0}
                                icon = {priority.icon}
                                users = {data.users}
                            />
                            
                            {/* Conditional rendering based on ordering type */}
                                {/* Rendering tickets based on priority, if available */}
                                {ordering === 'Priority' && (
                                    groupedTickets[priority.id] ? (
                                    groupedTickets[priority.id].map(ticket => (
                                        <CardBody key={ticket.id} ticket={ticket} users={data.users} grouping={grouping} />
                                    ))
                                    ) : (
                                        <></> // Placeholder for empty case
                                    )
                                )}
                                {/* Sorting and rendering tickets based on title */}
                                {ordering === 'Title' && (
                                    groupedTickets[priority.id] ? (
                                    groupedTickets[priority.id]
                                    .sort((a, b) => a.title.localeCompare(b.title)) // Sort by title in increasing order
                                    .map(ticket => (
                                        <CardBody key={ticket.id} ticket={ticket} users={data.users} grouping={grouping} />
                                    ))
                                    ) : (
                                        <></> // Placeholder for empty case
                                    )
                                )}
                        </div>
                    ))}
                </div>
            ) : (
                <></> // Displayed while data is being loaded
            )}
        </div>
    );
}

export default GroupByPriority;
