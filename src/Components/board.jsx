import React, { useState , useEffect } from 'react'
import './board.css'

import GroupByPriority from './GroupBy/groupByPriority.jsx'
import GroupByStatus from './GroupBy/groupByStatus.jsx'
import GroupByUser from './GroupBy/groupByUser.jsx'

import { ImEqualizer } from "react-icons/im";
import { FaChevronDown } from "react-icons/fa";

import getBodyData from '../Services/GlobalAPI.jsx'

function Body() {
    const [data, setData] = useState(null);

    const [isOptionsVisible, setIsOptionsVisible] = useState(false);

    const [selectedGrouping, setSelectedGrouping] = useState(
        localStorage.getItem('selectedGrouping') || 'Status'
    );
    const [selectedOrdering, setSelectedOrdering] = useState(
        localStorage.getItem('selectedOrdering') || 'Priority'
    );

    
    useEffect(() => {
        getBodyData()
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        localStorage.setItem('selectedGrouping', selectedGrouping);
        localStorage.setItem('selectedOrdering', selectedOrdering);
    }, [selectedGrouping, selectedOrdering]);

    const handleButtonClick = () => {
        setIsOptionsVisible(!isOptionsVisible);
    };

    const handleGroupingChange = (event) => {
        setSelectedGrouping(event.target.value);
        setIsOptionsVisible(false);
    };

    const handleOrderingChange = (event) => {
        setSelectedOrdering(event.target.value);
        setIsOptionsVisible(false);
    };

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
            <div className='body'>
                    {data ? (
                        <div className='groupCard'>
                        { renderGroupingComponent() }
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
            </div>
        </div>
    )
}

export default Body;