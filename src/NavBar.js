import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

const NavBar = (props) => {
    const { divers, divesites } = props

    return (
        <div id='nav'>
            <Link to="/divers"> Divers ({ divers.length }) </Link>
            <Link to="/divesites"> Dive Sites ({ divesites.length }) </Link>
        </div>
    )
};

export default connect(state => state)(NavBar);