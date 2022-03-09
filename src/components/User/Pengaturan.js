import React, { useEffect, useState } from 'react'
import {faAt, faLock, faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import { CheckmarkOutline } from 'react-ionicons'
import {FontAwesomeIcon}  from '@fortawesome/react-fontawesome';
import {useSelector,useDispatch} from 'react-redux'
import {updateSetting,resetStatus} from '../../features/users/usersSlice'
function Pengaturan({auth,token}) {
    const dispatch = useDispatch()
    const {status} = useSelector(state => state.users)
    const [valid,setvalid] = useState('')
    const [setting, setsetting] = useState({
        email: auth?.email,
        password: '',
        newpassword: '',
        repeatpassword: '',
    })
    const handleSubmit = () => {
        if(setting.password==='') return setvalid('Masukan password lama anda')
        if(setting.newpassword==='') return setvalid('Masukan password baru anda')
        if(setting.repeatpassword==='' | setting.repeatpassword!==setting.newpassword) return setvalid('Password Tidak Sama')
        submit()
    }
    const submit=()=>{
        setvalid('')
        dispatch(updateSetting(setting))
        setsetting({...setting, password:'',newpassword:'',repeatpassword:''})
    }
    useEffect(()=>{
        setTimeout(()=>{
            if(status) dispatch(resetStatus())
        },3000)
    },[status])
  return (
    <div className='flex flex-col w-1/2'>
        {(status===200)?<div className='flex px-2 py-1 bg-green-500 text-white font-semibold rounded-md'><CheckmarkOutline color={'white'} /><p>Saved</p></div>:<></>}
        <div className='flex-col mx-2 my-2'>
            <div className='text-base font-semibold'>E-mail</div>
            <div className='rounded-sm border border-gray-300 p-1 w-56 flex justify-center items-center space-x-1'>
                <div className='text-gray-400'><FontAwesomeIcon icon={faAt} /></div>
                <input type="email" value={setting.email} disabled className="outline-none w-full" />
            </div>
        </div>
        <div className='flex-col mx-2 my-2'>
            <div className='text-base font-semibold'>Password</div>
            <div className='rounded-sm border border-gray-300 p-1 w-56 flex justify-center items-center space-x-1'>
                <div className='text-gray-400'><FontAwesomeIcon icon={faLock} /></div>
                <input type="password" id="password" value={setting.password} onChange={(e)=> setsetting({...setting, password:e.target.value})} className="outline-none w-full" placeholder='Your old password' />
                {(status===401)?<div className='text-red cursor-pointer' ><FontAwesomeIcon icon={faTimesCircle} /></div>:<></>}
            </div>
        </div>
        <div className='flex-col mx-2 my-2'>
            <div className='text-base font-semibold'>New Password</div>
            <div className='rounded-sm border border-gray-300 p-1 w-56 flex justify-center items-center space-x-1'>
                {/* <div className='text-gray-400'><FontAwesomeIcon icon={faLock} /></div> */}
                <input type="password" id="newpassword" value={setting.newpassword} onChange={(e)=> setsetting({...setting, newpassword:e.target.value})} className="outline-none w-full" placeholder='New Password' />
            </div>
        </div>
        <div className='flex-col mx-2 my-2'>
            <div className='text-base font-semibold'>Repeat Password</div>
            <div className='rounded-sm border border-gray-300 p-1 w-56 flex justify-center items-center space-x-1'>
                {/* <div className='text-gray-400'><FontAwesomeIcon icon={faLock} /></div> */}
                <input type="password" id="rptpassword" value={setting.repeatpassword} onChange={(e)=> setsetting({...setting, repeatpassword:e.target.value})} className="outline-none w-full" placeholder='Repeat New Password' />
                {(setting.repeatpassword!==setting.newpassword)?<div className='text-red cursor-pointer' ><FontAwesomeIcon icon={faTimesCircle} /></div>:<></>}
            </div>
        </div>
        {valid&&<div className='bg-rose-100 text-rose-700 text-center ml-2 px-2 py-1 rounded-md'>{valid}</div>}
        <button className='py-1 px-2 bg-green-600 text-white rounded-md mt-2 ml-2' onClick={handleSubmit}>Save</button>
    </div>
  )
}

export default Pengaturan