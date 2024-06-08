import { combineReducers } from 'redux'
import Auth from './user'
import error from './error'
import posts from './post'

export default combineReducers({ Auth,error,posts });