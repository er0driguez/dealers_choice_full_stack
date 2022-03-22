import { createStore, combineReducers, applyMiddleware } from 'redux'
import axios from 'axios'
const LOAD_DIVERS = 'LOAD_DIVERS'
const LOAD_DIVESITES = 'LOAD_DIVESITES'
const DELETE_DIVER = 'DELETE_DIVER'
const CREATE_DIVER = 'CREATE_DIVER'
import thunk from 'redux-thunk'

const divers = (state = [], action) => {
    if (action.type === LOAD_DIVERS){
        return action.divers;
    }
    if (action.type === CREATE_DIVER) {
        return [...state, action.diver];
    }
    if (action.type === DELETE_DIVER) {
        return state.filter( diver => diver.id !== action.diver.id)
    }
    return state;
}

const divesites = (state = [], action) => {
    if (action.type === LOAD_DIVESITES) {
        return action.divesites
    }
    return state
}

const reducer = combineReducers({
    divers,
    divesites
});

const store = createStore(reducer, applyMiddleware(thunk))

const loadDivers = () => {
    return async(dispatch) => {
        const response = await axios.get('/api/divers');
        const divers = response.data;
        dispatch({ type: LOAD_DIVERS, divers });
    }
};

const loadDivesites = () => {
    return async(dispatch) => {
        const response = await axios.get('/api/divesites');
        const divesites = response.data;
        dispatch({ type: LOAD_DIVESITES, divesites })
    }
};

const createDiver = (name) => {
    return async(dispatch) => {
        const response = await axios.post('/api/divers', { name });
        dispatch({ type: CREATE_DIVER, diver: response.data });
    }
};

export { loadDivers, loadDivesites, createDiver };
export default store;