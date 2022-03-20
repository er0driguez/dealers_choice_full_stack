import React from 'react';
import { connect } from 'react-redux';

const NavBar = (props) => {
    const { divers, divesites } = props

    return (
        <div id='nav'>
            <a> Divers ({ divers.length }) </a>
            <a> Dive Sites ({ divesites.length }) </a>
        </div>
    )
};

export default connect(state => state)(NavBar);