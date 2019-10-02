import {
    GET_PENDAFTARAN
} from "Constants/actionTypes";

import axios from 'axios';

export function getPendaftaran (history){
 
    return async (dispatch) => {
       //default token
       const token = localStorage.getItem("token")
       const apiToken = {
         headers: {
           Authorization: `Bearer ${token}`
         }
       }
       const res = await axios.get('http://127.0.0.1:3333/api/maha/pendaftaran', apiToken)
       dispatch({
         type: GET_PENDAFTARAN,
         payload: res.data
         })
         
    }
}