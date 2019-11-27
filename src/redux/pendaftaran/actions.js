import {
    GET_PENDAFTARAN,
    GET_MAHASISWA_PROFILE
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
       const res = await axios.get('http://127.0.0.1:3333/api/admin/pendaftaran', apiToken)
       dispatch({
         type: GET_PENDAFTARAN,
         payload: res.data
         })
         
    }
}

export function getMahasiswaProfile ({id}){
 
  return async (dispatch) => {
     //default token
     const token = localStorage.getItem("token")
     const apiToken = {
       headers: {
         Authorization: `Bearer ${token}`
       }
     }
     const res = await axios.get(`http://127.0.0.1:3333/api/maha/mahasiswa/${id}`, apiToken)
     dispatch({
       type: GET_MAHASISWA_PROFILE,
       payload: res.data.data[0]
       })
       
  }
}

export function updatePendaftaranMahasiswa ({pendaftaran_id , is_anggota}, history){
 
  return async (dispatch) => {
     //default token
     const token = localStorage.getItem("token")
     const apiToken = {
       headers: {
         Authorization: `Bearer ${token}`
       }
     }
     const res = await axios.put(`http://127.0.0.1:3333/api/pendaftaran/${pendaftaran_id}`,{is_anggota}, apiToken)
     history.push("/app/ui/anggota")
  }
}

export function updatePendaftaranMahasasiswaDitolak ({pendaftaran_id , is_anggota}, history){
 
  return async (dispatch) => {
     //default token
     const token = localStorage.getItem("token")
     const apiToken = {
       headers: {
         Authorization: `Bearer ${token}`
       }
     }
     const res = await axios.put(`http://127.0.0.1:3333/api/pendaftaran/${pendaftaran_id}`,{is_anggota}, apiToken)
     history.push("/app/applications/ditolak")
  }
}

export function updatePendaftaranAnggota({pendaftaran_id , is_alumni}, history){
 
  return async (dispatch) => {
     //default token
     const token = localStorage.getItem("token")
     const apiToken = {
       headers: {
         Authorization: `Bearer ${token}`
       }
     }
     const res = await axios.put(`http://127.0.0.1:3333/api/pendaftaran/${pendaftaran_id}`,{is_alumni}, apiToken)
     history.push("/app/ui/alumni")
  }
}