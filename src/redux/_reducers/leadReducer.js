import { ADD_LEAD, SAVE_LEAD, UPDATE_LEAD, DELETE_LEAD } from "../_types/leadTypes";
let cloneDeep = require('lodash.clonedeep');
const initState = { allLead: [] }

const leadReducer = (state = initState, action) => {
  switch (action.type) {

    case ADD_LEAD:
      
      let addLeadState = cloneDeep(state && state.allLead.data) || null
      if (action.payload && action.payload.data) {
        addLeadState.push(action.payload.data)
      }

      let addLeadObj = {
        success: state.allLead.success || false,
        message: state.allLead.message || 'failed',
        data: addLeadState
      }

      return {
        ...state,
        allLead: addLeadObj,
      }

    case SAVE_LEAD:
      return {
        ...state,
        allLead: action.payload,
      }

    case UPDATE_LEAD:
      
      let leadState = cloneDeep(state && state.allLead.data) || null
      if (leadState && leadState.length > 0) {
        leadState.map((lead, indx) => {
          if (lead._id === action.payload.data._id) {
            leadState[indx] = action.payload.data
            //lead = action.payload.data
          }
        })
      }

      let tempObj = {
        success: state.allLead.success || false,
        message: state.allLead.message || 'failed',
        data: leadState
      }

      return {
        ...state,
        allLead: tempObj,
      }

    case DELETE_LEAD:
      
      let leadStateTemp = cloneDeep(state && state.allLead.data) || null
      if (leadStateTemp && leadStateTemp.length > 0) {
        leadStateTemp.map((lead, indx) => {
          if (lead._id === action.payload.id) {
            delete leadStateTemp[indx]
            leadStateTemp.length -= 1
          }
        })
      }

      let tempObjTemp = {
        success: state.allLead.success || false,
        message: state.allLead.message || 'failed',
        data: leadStateTemp
      }

      return {
        ...state,
        allLead: tempObjTemp,
      }

    default:
      return state;
  }
}

export default leadReducer;