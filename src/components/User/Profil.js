import React, { useEffect, useState } from 'react'
import { CheckmarkOutline } from 'react-ionicons'
import {useDispatch,useSelector} from 'react-redux'
import {updateProfile,resetStatus} from '../../features/users/usersSlice'
function Profil({auth,token}) {
    const dispatch = useDispatch()
    const {status} = useSelector(state => state.users)
    const [profil,setprofil] = useState({
        nama_lengkap:auth?.nama_lengkap,
        nama:auth?.nama,
        ttl: new Date(auth?.ttl).toISOString().substring(0,10),
        wilayah:auth?.wilayah,
        kota:auth?.kota,
        alamat:auth?.alamat_lengkap,
        email: auth?.email,
    })
    useEffect(()=>{
        setTimeout(()=>{
            if(status) dispatch(resetStatus())
        },3000)
    },[status])
  return (
    <div className='flex flex-col lg:flex-wrap h-auto lg:w-1/2 w-full'>
        {(status===200)?<div className='flex px-2 py-1 bg-green-500 text-white font-semibold rounded-md'><CheckmarkOutline color={'white'} /><p>Saved</p></div>:<></>}
        <div className='flex-col mx-2 my-2'>
            <div className='text-base font-semibold'>Nama Lengkap</div>
            <div className='rounded-sm border border-gray-300 p-1 w-56'><input type="text" value={profil.nama_lengkap} onChange={(e)=> setprofil({...profil, nama_lengkap:e.target.value})} className="outline-none w-full" /></div>
        </div>
        <div className='flex-col mx-2 my-2'>
            <div className='text-base font-semibold'>Nama Panggilan</div>
            <div className='rounded-sm border border-gray-300 p-1 w-56'><input type="text" value={profil.nama} onChange={(e)=> setprofil({...profil, nama:e.target.value})} className="outline-none w-full" /></div>
        </div>
        <div className='flex-col mx-2 my-2'>
            <div className='text-base font-semibold'>Tanggal Lahir</div>
            <div className='rounded-sm border border-gray-300 p-1 w-56'><input type="date" value={profil.ttl} onChange={(e)=> setprofil({...profil, ttl:e.target.value})} className="outline-none w-full" /></div>
        </div>
        <div className='flex-col mx-2 my-2'>
            <div className='text-base font-semibold'>Wilayah</div>
            <div className='rounded-sm border border-gray-300 p-1 w-56'><input type="text" value={profil.wilayah} onChange={(e)=> setprofil({...profil, wilayah:e.target.value})} className="outline-none w-full" /></div>
        </div>
        <div className='flex-col mx-2 my-2'>
            <div className='text-base font-semibold'>Kota</div>
            <div className='rounded-sm border border-gray-300 p-1 w-56'><input type="text" value={profil.kota} onChange={(e)=> setprofil({...profil, kota:e.target.value})} className="outline-none w-full" /></div>
        </div>
        <div className='flex-col mx-2 my-2'>
            <div className='text-base font-semibold'>Alamat</div>
            <div className='rounded-sm border border-gray-300 p-1 w-56'><textarea type="text" value={profil.alamat} onChange={(e)=> setprofil({...profil, alamat:e.target.value})} className="outline-none w-full" /></div>
        </div>
        <button className='py-1 px-2 bg-green-600 text-white rounded-md mt-2' onClick={()=>dispatch(updateProfile(profil))}>Save</button>
    </div>
  )
}

export default Profil