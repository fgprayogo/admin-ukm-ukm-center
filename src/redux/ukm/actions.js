import {
    GET_UKM,
    GET_UKM_PROFILE,
    POST_PENDAFTAR_UKM
} from "Constants/actionTypes";

import axios from 'axios';

export function getUkm (history){
 
    return async (dispatch) => {
       //default token
       const token = localStorage.getItem("token")
       const apiToken = {
         headers: {
           Authorization: `Bearer ${token}`
         }
       }
       const res = await axios.get('http://127.0.0.1:3333/api/ukms', apiToken)
       dispatch({
         type: GET_UKM,
         payload: res.data
         })
    }
}

export function getUkmProfile ({id}, history){
 
    return async (dispatch) => {
       //default token
       const token = localStorage.getItem("token")
       const apiToken = {
         headers: {
           Authorization: `Bearer ${token}`
         }
       }
       const res = await axios.get(`http://127.0.0.1:3333/api/ukm/${id}`, apiToken)
       dispatch({
         type: GET_UKM_PROFILE,
         payload: res.data.data
         })
    }
}

export function postPendaftaranUkm ({ukm_id}, history){
 
    return async (dispatch) => {
       //default token
       const token = localStorage.getItem("token")
       const apiToken = {
         headers: {
           Authorization: `Bearer ${token}`
         }
       }
       const res = await axios.post(`http://127.0.0.1:3333/api/pendaftaran`,{ukm_id}, apiToken)
       dispatch({
         type: POST_PENDAFTAR_UKM,
         payload: res.data
         })
        history.push("/")
    }
}