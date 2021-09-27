import { ADD_STAFF, SAVE_STAFF, UPDATE_STAFF, DELETE_STAFF } from "../_types/staffTypes";
let cloneDeep = require('lodash.clonedeep');
const initState = { allStaff: [] }

const staffReducer = (state = initState, action) => {
  switch (action.type) {

    case ADD_STAFF:
      
      let addStaffState = cloneDeep(state && state.allStaff.data) || null
      if (action.payload && action.payload.data) {
        addStaffState.push(action.payload.data)
      }

      let addStaffObj = {
        success: state.allStaff.success || false,
        message: state.allStaff.message || 'failed',
        data: addStaffState
      }

      return {
        ...state,
        allStaff: addStaffObj,
      }

    case SAVE_STAFF:
      return {
        ...state,
        allStaff: action.payload,
      }

    case UPDATE_STAFF:
      
      let staffState = cloneDeep(state && state.allStaff.data) || null
      if (staffState && staffState.length > 0) {
        staffState.map((staff, indx) => {
          if (staff._id === action.payload.data._id) {
            staffState[indx] = action.payload.data
            
            //staff = action.payload.data
          }
        })
      }

      let tempObj = {
        success: state.allStaff.success || false,
        message: state.allStaff.message || 'failed',
        data: staffState
      }

      return {
        ...state,
        allStaff: tempObj,
      }

    case DELETE_STAFF:
      
      let staffStateTemp = cloneDeep(state && state.allStaff.data) || null
      if (staffStateTemp && staffStateTemp.length > 0) {
        staffStateTemp.map((staff, indx) => {
          if (staff._id === action.payload.id) {
            delete staffStateTemp[indx]
            staffStateTemp.length -= 1
          }
        })
      }

      let tempObjTemp = {
        success: state.allStaff.success || false,
        message: state.allStaff.message || 'failed',
        data: staffStateTemp
      }

      return {
        ...state,
        allStaff: tempObjTemp,
      }

    default:
      return state;
  }
}

export default staffReducer;