import { ADD_LEAD, SAVE_LEAD, UPDATE_LEAD, DELETE_LEAD } from "../_types/leadTypes";
import { CLEAR_ERRORS } from './../types';
import { setAlert } from './../_actions/alertAction'
import axios from 'axios';
const endPoint =  'https://whatsappcampaign.herokuapp.com'
export const getQrCode = leadData => {
    return async (dispatch) => {

        //const config = {header: {'Content-Type': 'application/json'}}  
        try {

            const res = await axios.get(`${endPoint}/api/whatsapp/status`);
debugger

            console.log(res.data);
            dispatch({ type: SAVE_LEAD, payload: res.data })
            return res.data
        } catch (err) {
            console.log(err);
            dispatch(setAlert(err.response.data.message, 'danger'));
            dispatch({ type: CLEAR_ERRORS });
        }
    }
}

export const sendMessages = msgData => {
    return async (dispatch) => {

        //const config = {header: {'Content-Type': 'application/json'}}  
        try {
            //
debugger
            const res = await axios.post(`${endPoint}/api/whatsapp/sendMessage`, msgData);
            debugger
            console.log(res.data);
            await dispatch({ type: ADD_LEAD, payload: res.data })

            return res.data

        } catch (err) {
            console.log(err);
            dispatch(setAlert(err.response.data.message, 'danger'));
            dispatch({ type: CLEAR_ERRORS });
        }
    }
}

export const logout = leadData => {
    return async (dispatch) => {
        try {


            const res = await axios.post(`${endPoint}/api/whatsapp/logout`);

            dispatch({ type: UPDATE_LEAD, payload: res.data })

            return true

        } catch (err) {
            console.log(err);
            dispatch(setAlert(err.response.data.message, 'danger'));
            dispatch({ type: CLEAR_ERRORS });
        }
    }
}






