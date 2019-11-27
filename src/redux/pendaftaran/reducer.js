import {
    GET_PENDAFTARAN,
    GET_MAHASISWA_PROFILE
} from "Constants/actionTypes";


const INIT_STATE = {
    data:[],
    riwayat:[],
    aktif:[],
    ditolak:[],
    diterima:[],
    anggota:[],
    alumni:[],
    
    mahasiswa_id:null,
    nama:null,
    email:null,
    nim:null,
    pt_id:null,
    nama_pt:null,
    fakultas_id:null,
    nama_fakultas:null,
    prodi_id:null,
    nama_prodi:null,
    gambar:null
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
      case GET_MAHASISWA_PROFILE:
        return {
          ...state,
          data: action.payload,
          mahasiswa_id:action.payload.id,
          nama:action.payload.nama,
          email:action.payload.email,
          nim:action.payload.nim,
          pt_id:action.payload.pt_id,
          nama_pt: action.payload.nama_pt,
          fakultas_id:action.payload.fakultas_id,
          nama_fakultas: action.payload.nama_fakultas,
          prodi_id:action.payload.prodi_id,
          nama_prodi: action.payload.nama_prodi,
          gambar:"http://127.0.0.1:3333/api/maha/file/"+action.payload.gambar
        }
      default:
        return { ...state };
    }
  };
  