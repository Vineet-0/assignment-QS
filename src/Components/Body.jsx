import React, { useState , useEffect , useRef } from 'react'
import Card from './Card'
// import { FaSearch , FaPlus , FaPlay , FaTv } from "react-icons/fa";
import getBodyData from '../Services/GlobalAPI'

function Body() {
    const [data, setData] = useState(null);
    
    useEffect(() => {
        // Call the function that performs the Axios request
        getBodyData()
          .then(response => {
            // Access the data property
            const responseData = response.data;
    
            // Set the data to your component state
            setData(responseData);
    
            // Now you can work with the data
            console.log(responseData);
          })
          .catch(error => {
            // Handle errors here
            console.error(error);
          });
      }, []);

    return (
        <>
            <div>
                {data ? (
                <>
                    <h2>Tickets</h2>
                        {data.tickets.map(ticket => (
                            <Card key={ticket.id} ticket={ticket} status={ticket.status} tag={ticket.tag} />
                        ))}
                </>
                ) : (
                <p>Loading...</p>
                )}
            </div>
        </>
    )
}

export default Body