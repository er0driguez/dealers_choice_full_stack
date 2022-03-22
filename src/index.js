import React from 'react';
import { render } from 'react-dom';
import store, { loadDivers, loadDivesites, createDiver } from './store'
import { Provider, connect } from 'react-redux';
import { HashRouter, Route, Link } from 'react-router-dom';
import NavBar from './NavBar';
import Divers from './Divers';
import DiveSites from './DiveSites';
import Create from './Create';

const Detail = connect(state => state)( 
    (props) => {
        const divesite = props.divesites.find( divesite => divesite.id === props.match.params.id*1);
        if(!divesite){
            return null;
        }
        return (
            <div>
                <h1> { divesite.name }</h1>
                <div> Details About Divesite </div>
            </div>
        );
    }
);

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
                        <Route path="/divers" component={Divers}/>
                    </div>
                    <div id='itinerary'>
                        Diving Itinerary 2022
                        <Route path='/divesites/:id' component={ Detail } />
                        <Route path="/divesites" component={DiveSites}/>
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
