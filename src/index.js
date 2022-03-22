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
                <h1 id="site-name"> { divesite.name }</h1>
                <div id="site-cert"> 
                    Recommended Certification: { divesite.diverTypeAllowed }
                </div>
                <div id="site-details"> { divesite.description } </div>
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
                    <div id="club-line">
                        NYC's Favorite Scuba Diving Club For All Diving Levels
                    </div>
                    <NavBar />
                    
                        <Route path="/divers" component={Divers}/>
                        <Route path='/divesites/:id' component={ Detail } />
                        <Route exact path="/divesites" component={DiveSites}/>
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
