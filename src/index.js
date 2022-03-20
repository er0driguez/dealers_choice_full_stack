import React from 'react';
import { render } from 'react-dom';
import store, { loadDivers, loadDivesites, createDiver } from './store'
import { Provider, connect } from 'react-redux';
import NavBar from './NavBar';
import Divers from './Divers';
import DiveSites from './DiveSites';
import Create from './Create';
import axios from 'axios';

const App = connect(
    null, 
    (dispatch) => {
        return {
            loadData: async() => {
                dispatch(loadDivers());
                dispatch(loadDivesites());
            }
        };
    }
)(class App extends React.Component {
        componentDidMount() {
            this.props.loadData();
        }
        
        render() {
            return (
                <div id="body">
                    <h1> Gotham Dive Club </h1>
                    <NavBar />
                    <Create />
                    <div id='members'>
                        Club Members
                        <Divers />
                    </div>
                    <div id='itinerary'>
                        Diving Itinerary 2022
                        <DiveSites />
                    </div>
                </div>
            )
        }
    }
)

render(<Provider store={store}>
        <App />
    </Provider>, document.querySelector('#root'));
