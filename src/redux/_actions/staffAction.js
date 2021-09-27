import { ADD_STAFF, SAVE_STAFF, UPDATE_STAFF, DELETE_STAFF } from "../_types/staffTypes";
import { CLEAR_ERRORS } from './../types';
import { setAlert } from './../_actions/alertAction'
import axios from 'axios';

export const getAllStaff = staffData => {
    return async (dispatch) => {

        //const config = {header: {'Content-Type': 'application/json'}}  
        try {
            console.log(staffData)
            const res = await await axios.get('https://icrm-server.herokuapp.com/api/getStaffs', { params: staffData });

            console.log(res.data);
            dispatch({ type: SAVE_STAFF, payload: res.data })
        } catch (err) {
            console.log(err);
            dispatch(setAlert(err.response.data.message, 'danger'));
            dispatch({ type: CLEAR_ERRORS });
        }
    }
}


export const addStaffAction = staffData => {
    return async (dispatch) => {

        //const config = {header: {'Content-Type': 'application/json'}}  
        try {


            const res = await await axios.post('https://icrm-server.herokuapp.com/api/createStaff', staffData);

            console.log(res.data);
            dispatch({ type: ADD_STAFF, payload: res.data })

            return true

        } catch (err) {
            console.log(err);
            
            dispatch(setAlert(err.response.data.message, 'danger'));
            dispatch({ type: CLEAR_ERRORS });
            
        }
    }
}

export const updateStaffAction = staffData => {
    return async (dispatch) => {

        //const config = {header: {'Content-Type': 'application/json'}}  
        try {
            const res = await await axios.put('https://icrm-server.herokuapp.com/api/updateStaff', staffData);
            dispatch({ type: UPDATE_STAFF, payload: res.data })
            return true

        } catch (err) {
            console.log(err);
            dispatch(setAlert(err.response.data.message, 'danger'));
            dispatch({ type: CLEAR_ERRORS });
        }
    }
}


export const deleteStaffAction = staffData => {
    return async (dispatch) => {
        //const config = {header: {'Content-Type': 'application/json'}}  
        try {
            const res = await axios.delete('https://icrm-server.herokuapp.com/api/deleteStaff', { data: staffData });
            if (Number(res.data.data.deletedCount) > 0) {
                console.log(res.data);
                dispatch({ type: DELETE_STAFF, payload: staffData })
                return true
            } else {
                return false
            }
        } catch (err) {
            console.log(err);
            dispatch(setAlert(err.response.data.message, 'danger'));
            dispatch({ type: CLEAR_ERRORS });
        }
    }
}





