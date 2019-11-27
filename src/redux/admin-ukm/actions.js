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
       const res = await axios.get(`http://127.0.0.1:3333/api/admin/profile`, apiToken)
       dispatch({
         type: GET_MAHASISWA,
         payload: res.data
         })
    }
}

export function updateProfile ({nama,deskripsi_ukm}, history){
 
  return async (dispatch) => {
     //default token
     const token = localStorage.getItem("token")
     const apiToken = {
       headers: {
         Authorization: `Bearer ${token}`
       }
     }
     const res = await axios.put(`http://127.0.0.1:3333/api/ukm/ukm`,{nama,deskripsi_ukm} ,apiToken)
     dispatch({
       type: UPDATE_MAHASISWA,
       payload: res.data
       })

    history.push("/")
  }

}