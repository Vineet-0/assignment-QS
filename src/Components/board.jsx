// Importing necessary React components, styles, and external modules
import React, { useState, useEffect } from 'react';
import './board.css';
import GroupByPriority from './GroupBy/groupByPriority.jsx';
import GroupByStatus from './GroupBy/groupByStatus.jsx';
import GroupByUser from './GroupBy/groupByUser.jsx';
import { ImEqualizer } from "react-icons/im";
import { FaChevronDown } from "react-icons/fa";
import getBodyData from '../Services/GlobalAPI.jsx';

// React functional component definition
function Body() {
    // State Hooks to manage component state
    const [data, setData] = useState(null);
    const [isOptionsVisible, setIsOptionsVisible] = useState(false);
    const [selectedGrouping, setSelectedGrouping] = useState(localStorage.getItem('selectedGrouping') || 'Status');
    const [selectedOrdering, setSelectedOrdering] = useState(localStorage.getItem('selectedOrdering') || 'Priority');

    // Effect hook to fetch data when the component mounts
    useEffect(() => {
        getBodyData()
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    // Effect hook to sync selectedGrouping and selectedOrdering with local storage
    useEffect(() => {
        localStorage.setItem('selectedGrouping', selectedGrouping);
        localStorage.setItem('selectedOrdering', selectedOrdering);
    }, [selectedGrouping, selectedOrdering]);

    // Event handler to toggle visibility of dropdown options
    const handleButtonClick = () => {
        setIsOptionsVisible(!isOptionsVisible);
    };

    // Event handler for changing the grouping selection
    const handleGroupingChange = (event) => {
        setSelectedGrouping(event.target.value);
        setIsOptionsVisible(false);
    };

    // Event handler for changing the ordering selection
    const handleOrderingChange = (event) => {
        setSelectedOrdering(event.target.value);
        setIsOptionsVisible(false);
    };

    // Function to render the appropriate grouping component based on user selection
    const renderGroupingComponent = () => {
        switch (selectedGrouping) {
            case 'Status':
                return <GroupByStatus data={data} grouping={selectedGrouping} ordering={selectedOrdering} />;
            case 'Priority':
                return <GroupByPriority data={data} grouping={selectedGrouping} ordering={selectedOrdering} />;
            case 'User':
                return <GroupByUser data={data} grouping={selectedGrouping} ordering={selectedOrdering} />;
            default:
                return null;
        }
    };

    // JSX for rendering the component
    return (
        <div>
            {/* Button to toggle visibility of dropdown options */}
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

            {/* Dropdown options for grouping and ordering */}
            {isOptionsVisible && (
                <div className='onSelect'>
                    {/* Grouping dropdown */}
                    <div className='onSelectContainer'>
                        <div className='onSelectSubContainer'>
                            <div className='bg-trans'>
                                Grouping
                                <FaChevronDown className='bg-white pos1'/>
                            </div>
                            <div className='custom-select'>
                                <select id="option1" value={selectedGrouping} onChange={handleGroupingChange}>
                                    <option value="Status">Status</option>
                                    <option value="User">User</option>
                                    <option value="Priority">Priority</option>
                                </select>
                            </div>
                        </div>

                        {/* Ordering dropdown */}
                        <div className='onSelectSubContainer'>
                            <div className='bg-trans'>
                                Ordering
                                <FaChevronDown className='bg-white pos2'/>
                            </div>
                            <div className='custom-select'>
                                <select id="option2" value={selectedOrdering} onChange={handleOrderingChange}>
                                    <option value="Priority">Priority</option>
                                    <option value="Title">Title</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Main body section */}
            <div className='body'>
                {/* Conditional rendering based on data availability */}
                {data ? (
                    <div className='groupCard'>
                        { renderGroupingComponent() }
                    </div>
                ) : (
                    <p></p>
                )}
            </div>
        </div>
    );
}

// Exporting the Body component for use in other parts of the application
export default Body;
