import React from 'react';
import { render } from 'react-dom';
import store, { loadDivers, loadDivesites } from './store'
import { Provider, connect } from 'react-redux';
import NavBar from './NavBar';
import Divers from './Divers';
import DiveSites from './DiveSites';
import axios from 'axios'

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
                    <Divers />
                    <DiveSites />
                </div>
            )
        }
    }
)

render(<Provider store={store}>
        <App />
    </Provider>, document.querySelector('#root'));
