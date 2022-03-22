import React from 'react';
import { connect } from 'react-redux';
import {Link, Route } from 'react-router-dom';

const DiveSites = (props) => {
    const { divesites } = props

    return (
        <ul>
            {
            divesites.map( (divesite) => {
                return (
                    <li key={divesite.id}>
                        <Link to={`/divesites/${divesite.id}`}>{divesite.name}</Link> Location: {divesite.location}
                    </li>
                )
            })
        }
        </ul>
    )
}

export default connect((state) => state)(DiveSites);