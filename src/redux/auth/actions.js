import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  PROFILE,
  LOGIN_FAILED,
  LOAD_PT,
  LOAD_FAKULTAS,
  LOAD_PRODI,
  CLEAR_FORM_FAKULTAS,
  CLEAR_FORM_PRODI
} from 'Constants/actionTypes';
import axios from 'axios'
import { async } from 'q';



export const loginUser = ({email, password}, history) => async(dispatch) => {

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  // const body = JSON.stringify({email, password})
  
  try{
    const res = await axios.post('http://127.0.0.1:3333/api/admin/login', {email, password}, config)
    dispatch({
      type: LOGIN_USER,
      payload: res.data
      })
    localStorage.setItem("token", res.data.token)
    history.push('/')
  }catch(e){
      dispatch({
        type: LOGIN_FAILED
      });
    
  }  

};


// export function loginUser ({email, password}, history) {

//     const config = {
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     }
//     // const body = JSON.stringify({email, password})
    
//     return async (dispatch) => {  
      
//         const res = await axios.post('http://127.0.0.1:3333/api/maha/login', {email, password}, config)
//         dispatch({
//           type: LOGIN_USER,
//           payload: res.data
//           })
//         localStorage.setItem("token", res.data.token)
//         history.push('/')

        
//       // axios.post('http://localhost:3333/api/admin/login', {email, password}, config)
//       //   .then( res => 
//       //     dispatch({
//       //       type: LOGIN_USER,
//       //       payload: res.data
//       //       },
//       //       localStorage.setItem("token", res.data.token)
//       //     )
//       //   ).catch( res =>
//       //     dispatch({
//       //       type: LOGIN_FAILED,
//       //       payload: res.data
//       //     })
//       //   )

//       //   history.push('/')
        


// }
    
    

// };

export function loadProfile (history){
 
    return async (dispatch) => {
       //default token
       const token = localStorage.getItem("token")
       const apiToken = {
         headers: {
           Authorization: `Bearer ${token}`
         }
       }
       const res = await axios.get('http://localhost:3333/api/admin/profile', apiToken)
       dispatch({
         type: PROFILE,
         payload: res.data
         })

      // localStorage.setItem("profile", res.data)
    }
}

export const loginUserSuccess = (user) => ({
  type: LOGIN_USER_SUCCESS,
  payload: user
});

export function registerUser ({nama, email, nim, pt_id, fakultas_id, prodi_id, password , gambar}, history) {
  const body = {nama, email, nim, pt_id, fakultas_id, prodi_id, password , gambar}

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  // const body = JSON.stringify({email, password})
  
  return async (dispatch) => {  
    
      const res = await axios.post('http://127.0.0.1:3333/api/maha/mahasiswa', body, config)
      dispatch({
        type: REGISTER_USER,
        payload: res.data
        })
      history.push('/login')
  }
}
export const registerUserSuccess = (user) => ({
  type: REGISTER_USER_SUCCESS,
  payload: user
})

export function logoutUser (history){ 
  //default token
const token = localStorage.getItem("token")
const apiToken = {
  headers: {
    Authorization: `Bearer ${token}`
  }
}
//end
  
  const data = {
    body:{
      nama: 'nama'
    }
  }
  
  return async (dispatch) => {
    const res = await axios.post('http://localhost:3333/api/admin/logout', data, apiToken)

    dispatch({
      type: LOGOUT_USER,
      payload: res.data
      })
    
    localStorage.clear()
    history.push('/login') 
  } 
};


export function loadPt (history){
 
  return async (dispatch) => {
     //default token
     const token = localStorage.getItem("token")
     const apiToken = {
       headers: {
         Authorization: `Bearer ${token}`
       }
     }
     const res = await axios.get('http://localhost:3333/api/maha/pt')
     dispatch({
       type: LOAD_PT,
       payload: res.data
       })

    // localStorage.setItem("profile", res.data)
  }
}

export function loadFakultas ({pt_id}){
 
  return async (dispatch) => {
     //default token
     const token = localStorage.getItem("token")
     const apiToken = {
       headers: {
         Authorization: `Bearer ${token}`
       }
     }

     const res = await axios.get(`http://localhost:3333/api/maha/pt/${pt_id}`, )
     dispatch({
       type: LOAD_FAKULTAS,
       payload: res.data
       })

    // localStorage.setItem("profile", res.data)
  }
}

export function loadProdi ({fakultas_id}){
 
  return async (dispatch) => {
     //default token
     const token = localStorage.getItem("token")
     const apiToken = {
       headers: {
         Authorization: `Bearer ${token}`
       }
     }
     const res = await axios.get(`http://localhost:3333/api/maha/fakultas/${fakultas_id}`)
     dispatch({
       type: LOAD_PRODI,
       payload: res.data
       })

    // localStorage.setItem("profile", res.data)
  }
}

export function clearFormFakultas (){
  return async (dispatch) => {
    dispatch({
      type: CLEAR_FORM_FAKULTAS,
      payload: ''
      })
  }
}
export function clearFormProdi (){
  return async (dispatch) => {
    dispatch({
      type: CLEAR_FORM_PRODI,
      payload: ''
      })
  }
}
