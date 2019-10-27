import {
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    REGISTER_USER,
    REGISTER_USER_SUCCESS,
    LOGOUT_USER,
    PROFILE,
    LOGIN_FAILED,
    LOAD_PT,
    LOAD_FAKULTAS,
    LOAD_PRODI,
    CLEAR_FORM
  } from "Constants/actionTypes";
  
  const INIT_STATE = {
    user: localStorage.getItem("token"),
    loading: false,
    profile: [],
    msg:'',
    pt:[],
    fakultas:[],
    prodi:[],
    msg:'',
  };
  
  export default (state = INIT_STATE, action) => {
    switch (action.type) {
      case LOGIN_USER:
        return { 
          ...state, 
          loading: true,
          user: action.payload.token
        };
      case LOGIN_FAILED:
        return {
          ...state,
          field: action.payload,
          msg: 'Periksa kembali E-mail dan Password Anda '
        }
      case LOAD_PT:
        return { 
          ...state, 
          pt : action.payload.pt,
        };
      case LOAD_FAKULTAS:
          return { 
            ...state, 
            fakultas : action.payload.fakultas
          };
      case LOAD_PRODI:
          return { 
            ...state, 
            prodi : action.payload.prodi
          };
      case CLEAR_FORM:
          return { 
            ...state, 
            fakultas : [],
            prodi : []
          };
      case PROFILE:
        return {
          ...state,
          profile: action.payload.profile
        };
      case LOGIN_USER_SUCCESS:
        //notify.success('Login Success');
        return { ...state, loading: false, user: action.payload };
      case REGISTER_USER:
        return { ...state, loading: true };
      case REGISTER_USER_SUCCESS:
        //notify.success('Register User Success');
        return { ...state, loading: false, user: action.payload.uid };
      case LOGOUT_USER:
        return { ...state, user: null, token: null };
      default:
        return { ...state };
    }
  };
  