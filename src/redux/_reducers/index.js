import { combineReducers } from 'redux'
import authReducer from './authReducer';
import alertReducer from './alertReducer';
import staffReducer from './staffReducer'
import leadReducer from './leadReducer'
export default combineReducers({
  auth: authReducer,
  alert: alertReducer,
  staff: staffReducer,
  lead: leadReducer
});