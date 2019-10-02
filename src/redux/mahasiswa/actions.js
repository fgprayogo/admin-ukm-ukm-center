import {
    GET_MAHASISWA,
    UPDATE_MAHASISWA
} from "Constants/actionTypes";

import axios from 'axios';

export function getProfile (history){
 
    return async (dispatch) => {
       //default token
       const token = localStorage.getItem("token")
       const apiToken = {
         headers: {
           Authorization: `Bearer ${token}`
         }
       }
       const res = await axios.get(`http://127.0.0.1:3333/api/maha/profile`, apiToken)
       dispatch({
         type: GET_MAHASISWA,
         payload: res.data.profile[0]
         })
    }
}

export function updateProfile ({nama,nim}, history){
 
  return async (dispatch) => {
     //default token
     const token = localStorage.getItem("token")
     const apiToken = {
       headers: {
         Authorization: `Bearer ${token}`
       }
     }
     const res = await axios.put(`http://127.0.0.1:3333/api/maha/profile`,{nama,nim} ,apiToken)
     dispatch({
       type: UPDATE_MAHASISWA,
       payload: res.data
       })

    history.push('/')
  }

}