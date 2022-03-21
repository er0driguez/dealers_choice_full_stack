import React from 'react'
import { connect } from 'react-redux'
import { createDiver } from './store'

const CreateDiver = ({ create }) => {
    return (
        <div id='create'>
            <button onClick={ create }> Add Diver </button>
        </div>
    )
};

const mapDispatchToProps = (dispatch) => {
    return {
        create: () => {
            dispatch(createDiver())
        }
    };
};

export default connect(null, mapDispatchToProps)(CreateDiver)