import {
    GET_UKM,
    GET_UKM_PROFILE,
    POST_PENDAFTAR_UKM
} from "Constants/actionTypes";


const INIT_STATE = {
    data: '',
    semua_ukm :[],
    dibuka:[],
    ditutup:[],
    anggota:[],
    alumni:[],
    ukm_id:'',
    nama_ukm:'',
    profile_ukm:'',
    pen:'',
    is_oprec: ''
    
  };


  export default (state = INIT_STATE, action) => {
    switch (action.type) {
      case GET_UKM:
        return { 
          ...state, 
          data: action.payload,
          semua_ukm: action.payload.semua_ukm,
          dibuka: action.payload.dibuka,
          ditutup: action.payload.ditutup,
          anggota: action.payload.anggota,
          alumni: action.payload.alumni
        };
        case GET_UKM_PROFILE:
        return { 
          ...state, 
          ukm_id: action.payload.id,
          nama_ukm: action.payload.nama_ukm,
          profile_ukm: action.payload.profile_ukm, 
          is_oprec: action.payload.is_oprec
        };
        case POST_PENDAFTAR_UKM:
            return { 
              ...state, 
              pen: action.payload
            };
      default:
        return { ...state };
    }
  };
  