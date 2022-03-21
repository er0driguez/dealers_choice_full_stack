import React from 'react';
import { render } from 'react-dom';
import store, { loadDivers, loadDivesites, createDiver } from './store'
import { Provider, connect } from 'react-redux';
import { HashRouter, Route, Link } from 'react-router-dom';
import NavBar from './NavBar';
import Divers from './Divers';
import DiveSites from './DiveSites';
import Create from './Create';

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
                    <Route path="/divers" component={Divers}/>
                    <Route path="/divesites" component={DiveSites}/>
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
        <HashRouter>
            <App />
        </HashRouter>
    </Provider>, document.querySelector('#root'));
