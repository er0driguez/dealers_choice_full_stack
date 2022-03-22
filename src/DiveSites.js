import React from 'react';
import { connect } from 'react-redux';
import {Link, Route } from 'react-router-dom';

const DiveSites = (props) => {
    const { divesites } = props

    return (
        <div id="itinerary">
            <div id="itin-title">Diving Itinerary 2022</div>
            <ul>
            {
            divesites.map( (divesite) => {
                return (
                    <li key={divesite.id} id="dive-site">
                        <Link to={`/divesites/${divesite.id}`}>{divesite.name}</Link> 
                        <div>Location: {divesite.location}</div>
                    </li>
                );
            })
            }
            </ul>
        </div>
        
    )
}

export default connect((state) => state)(DiveSites);