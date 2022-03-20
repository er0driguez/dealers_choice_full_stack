import React from 'react';
import { connect } from 'react-redux';

const DiveSites = (props) => {
    const { divesites } = props

    return (
        <ul>
            {
            divesites.map( (divesite) => {
                return (
                    <li key={divesite.id}>
                        {divesite.name} {divesite.location}
                    </li>
                )
            })
        }
        </ul>
    )
}

export default connect((state) => state)(DiveSites);