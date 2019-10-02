import {
    GET_PENDAFTARAN
} from "Constants/actionTypes";


const INIT_STATE = {
    data:[],
    riwayat:[],
    aktif:[],
    ditolak:[],
    diterima:[],
    anggota:[],
    alumni:[],
    contoh:[
      {
        label:'',
        
      }
    ]
  };


  export default (state = INIT_STATE, action) => {
    switch (action.type) {
      case GET_PENDAFTARAN:
        return { 
          ...state, 
          data: action.payload,
          riwayat: action.payload.riwayat,
          aktif: action.payload.aktif,
          diterima: action.payload.diterima,
          ditolak: action.payload.ditolak,
          anggota: action.payload.anggota,
          alumni: action.payload.alumni
        };
      default:
        return { ...state };
    }
  };
  