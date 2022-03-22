import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import store from './store'
import Create from './Create';


const deleteDiver = async (diver) => {
    await axios.delete(`/api/divers/${diver.id}`)
    store.dispatch({ type: 'DELETE_DIVER', diver })
};

const Divers = (props) => {
    const { divers } = props

    return (
        <div id="members">
            Club Members
            <Create />

            <ul id="divers">
            {
                divers.map( (diver) => {
                    return (
                        <li key={diver.id}>
                            { diver.name } <button onClick={ () => deleteDiver(diver)}> X </button>
                            <p> Certification Level: { diver.certificationLevel } </p>
                        </li>
                    )
                })
            }
            </ul>
        </div>
        
    )
}

export default connect((state) => state)(Divers)