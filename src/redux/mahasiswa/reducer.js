import {
  GET_MAHASISWA,
  UPDATE_MAHASISWA
} from "Constants/actionTypes";


const INIT_STATE = {
  data:[],
  id:'',
  nama:'',
  nim:'',
  email:'',
  nama_pt:'',
  nama_fakultas:'',
  nama_prodi:'',
  gambar: ''
  };


  export default (state = INIT_STATE, action) => {
    switch (action.type) {
      case GET_MAHASISWA:
        return { 
          ...state, 
          data: action.payload,
          id : action.payload.id,
          nama :action.payload.nama,
          nim : action.payload.nim,
          email: action.payload.email,
          nama_pt: action.payload.nama_pt,
          nama_fakultas: action.payload.nama_fakultas,
          nama_prodi: action.payload.nama_prodi,
          gambar: "http://127.0.0.1:3333/api/maha/file/"+action.payload.gambar
        };
        case UPDATE_MAHASISWA:
          return { 
            ...state, 
            data: action.payload,
            id : action.payload.id,
            nama :action.payload.nama,
            nim : action.payload.nim
          };
      default:
        return { ...state };
    }
  };
  