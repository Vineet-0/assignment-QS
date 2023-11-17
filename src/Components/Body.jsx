import React, { useState , useEffect } from 'react'
import Card from './Card'
import './Body.css'

import GroupByPriority from './GroupBy/groupByPriority.jsx'
import GroupByStatus from './GroupBy/groupByStatus.jsx'
import GroupByUser from './GroupBy/groupByUser.jsx'


import { FaChevronDown } from "react-icons/fa";
import { ImEqualizer } from "react-icons/im";

// import { FaSearch , FaPlus , FaPlay , FaTv } from "react-icons/fa";
import getBodyData from '../Services/GlobalAPI'

function Body() {
    const [data, setData] = useState(null);
    const [isOptionsVisible, setIsOptionsVisible] = useState(false);
    const [selectedGrouping, setSelectedGrouping] = useState('Status');
    const [selectedOrdering, setSelectedOrdering] = useState('Priority');

    
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

    const handleButtonClick = () => {
    setIsOptionsVisible(!isOptionsVisible);
    };

    const handleGroupingChange = (event) => {
    setSelectedGrouping(event.target.value);
    };

    const handleOrderingChange = (event) => {
    setSelectedOrdering(event.target.value);
    };

    const renderGroupingComponent = () => {
        switch (selectedGrouping) {
            case 'Status':
                return <GroupByStatus data={data} ordering={selectedOrdering} />;
            case 'Priority':
                return <GroupByPriority data={data} ordering={selectedOrdering} />;
            case 'User':
                return <GroupByUser data={data} ordering={selectedOrdering} />;
            default:
                return null;
        }
    };

    return (
        <div className='outer'>
            <div className="head">
                <button
                    className='btn'
                    onClick={handleButtonClick}
                >
                    <ImEqualizer className='bg-white'/>
                    Display
                    <FaChevronDown className='bg-white'/>
                </button>
            </div>
            {isOptionsVisible && (
                <div className='onselect'>
                    <div className='onselectcontainer'>
                        <div className='onSelectSubContainer'>
                            <label>Grouping</label>
                                <select id="option1" value={selectedGrouping} onChange={handleGroupingChange}>
                                    <option value="Status">Status</option>
                                    <option value="User">User</option>
                                    <option value="Priority">Priority</option>
                                </select>
                        </div>

                        <div className='onSelectSubContainer'>
                            <label>Ordering</label>
                                <select id="option2" value={selectedOrdering} onChange={handleOrderingChange}>
                                    <option value="Priority">Priority</option>
                                    <option value="Title">Title</option>
                                </select>
                        </div>
                    </div>
                </div>
            )}
            <div className='body'>
                <div className='cards'>

                    {data ? (
                        <>
                        {renderGroupingComponent()}
                        </>
                    ) : (
                        <p>Loading...</p>
                    )}

                    {/* {data ? (
                    <>
                        <h2>Tickets</h2>
                            {data.tickets.map(ticket => (
                                <Card key={ticket} ticket={ticket} users={data.users} />
                            ))}
                    </>
                    ) : (
                    <p>Loading...</p>
                    )} */}
                </div>
            </div>
        </div>
    )
}

export default Body;