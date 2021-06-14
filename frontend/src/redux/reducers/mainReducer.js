//importamos el metodo combine reducer
import { combineReducers } from 'redux';

import authReducer from './authReducer';

const mainReducer = combineReducers({
    authReducer
})

export default mainReducer;