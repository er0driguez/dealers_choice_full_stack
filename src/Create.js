import React from 'react'
import { connect } from 'react-redux'
import { createDiver } from './store'

class CreateDiver extends React.Component{
    constructor(){
        super();
        this.state = {
            name: ''
        };
    }
    render() {
        const { name } = this.state;
        return (
            <form onSubmit={(ev) => {
                console.log(ev);
                ev.preventDefault();
                this.props.create(this.state.name)
            }}>
                <input 
                placeholder="Add Diver"
                value={ name }
                name='name'
                onChange={ ev => this.setState({ name: ev.target.value })}
                />
                <button type="submit" disabled={ !name }> 
                    Add Diver 
                </button>
            </form>
        );
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        create: (name) => {
            dispatch(createDiver(name));
        }
    };
};

export default connect(null, mapDispatchToProps)(CreateDiver)