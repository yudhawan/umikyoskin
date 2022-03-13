import React, { useEffect, useState } from 'react'
import { CheckmarkOutline } from 'react-ionicons'
import {faInstagram,faShopify, faWhatsapp, faFacebook,} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon}  from '@fortawesome/react-fontawesome';
import {useDispatch,useSelector} from 'react-redux'
import {updateSosmed,resetStatus} from '../../features/users/usersSlice'
function SocialMedia({auth,token}) {
    const dispatch = useDispatch()
    const {status} = useSelector(state => state.users)
    const [sosmed, setsosmed] = useState({
        whatsapp:auth?.wa,
        instagram:auth?.ig,
        shopee:auth?.shoope,
        facebook:auth?.fb,
        email:auth?.email,
    })
    useEffect(()=>{
        setTimeout(()=>{
            if(status) dispatch(resetStatus())
            sosmed.whatsapp=auth?.wa
        },3000)
    },[status])
  return (
    <div className='flex-col'>
        {(status===200)?<div className='flex px-2 py-1 bg-green-500 text-white font-semibold rounded-md'><CheckmarkOutline color={'white'} /><p>Saved</p></div>:<></>}
        {(status===403)?<div className='flex px-2 py-1 bg-rose-500 text-white font-semibold rounded-md'><CheckmarkOutline color={'white'} /><p>Nomor WhatsApp Pernah Terdaftarkan</p></div>:<></>}
        <div className='flex-col'>
            <div className='text-base font-semibold'>WhatsApp</div>
            <div className='rounded-md border border-gray-300 p-1 w-56 flex justify-center items-center space-x-1'>
                <FontAwesomeIcon icon={faWhatsapp} className='text-green-500'/>
                <input type="number" value={sosmed.whatsapp} onChange={(e)=> setsosmed({...sosmed, whatsapp:e.target.value})} className="outline-none w-full" />
            </div>
        </div>
        <div className='flex-col'>
            <div className='text-base font-semibold'>instagram</div>
            <div className='rounded-md border border-gray-300 p-1 w-56 flex justify-center items-center space-x-1'>
                <FontAwesomeIcon icon={faInstagram} className='text-red'/>
                <input type="text" value={sosmed.instagram} onChange={(e)=> setsosmed({...sosmed, instagram:e.target.value})} className="outline-none w-full" />
            </div>
        </div>
        <div className='flex-col'>
            <div className='text-base font-semibold'>Shopee</div>
            <div className='rounded-md border border-gray-300 p-1 w-56 flex justify-center items-center space-x-1'>
                <FontAwesomeIcon icon={faShopify} className='text-orange-600'/>
                <input type="text" value={sosmed.shopee} onChange={(e)=> setsosmed({...sosmed, shopee:e.target.value})} className="outline-none w-full" />
            </div>
        </div>
        <div className='flex-col'>
            <div className='text-base font-semibold'>Facebook</div>
            <div className='rounded-md border border-gray-300 p-1 w-56 flex justify-center items-center space-x-1'>
                <FontAwesomeIcon icon={faFacebook} className='text-blue-600'/>
                <input type="text" value={sosmed.facebook} onChange={(e)=> setsosmed({...sosmed, facebook:e.target.value})} className="outline-none w-full" />
            </div>
        </div>
        <button onClick={()=>{
            if(auth.wa===sosmed.whatsapp) return dispatch(updateSosmed({email:auth.email,whatsapp:'',instagram:sosmed.instagram,shopee:sosmed.shopee,facebook:sosmed.facebook}))
            return dispatch(updateSosmed(sosmed))
        }} className='py-1 px-2 bg-green-600 text-white rounded-md mt-2'>Save</button>
    </div>
  )
}

export default SocialMedia