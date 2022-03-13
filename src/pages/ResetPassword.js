import React, { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import NotFound from './NotFound'
import {resetPassword,setNewPassword,resetStatus} from '../features/users/usersSlice'
import {useParams, useNavigate} from 'react-router-dom'
function ResetPassword() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [newpassword, setnewpassword] = React.useState('')

    const [valid,setvalid] = React.useState('')
    const {token} = useParams()
    const {status,usersLoading} = useSelector(state => state.users)
    function handleSubmit(e){
        if(newpassword==='') return setvalid('Email is required')
        setvalid('')
        return dispatch(setNewPassword({token:token,password:newpassword}))
    }
    useEffect(()=>{
        dispatch(resetStatus())
        dispatch(resetPassword(token))
    },[token])
    if(status===null) return <div>Loading</div>
    if(status===401) {
      setTimeout(()=>{
        dispatch(resetStatus())
        navigate('/')
      },3000)
      return <NotFound />
    }
    if(status===201){
      setTimeout(()=>{
        dispatch(resetStatus())
        navigate('/')
      },3000)
        return(
          <div className='flex flex-col justify-center space-y-4 items-center w-full border border-gray-500 rounded-md py-5'>
            <div className={`bg-green-500 px-2 py-1 font-semibold hover:bg-green-600 text-white rounded-md`}>Password Anda Berhasil di Ubah</div>
          </div>
        )
    }
  return (
    <div className='flex flex-col justify-center space-y-4 items-center w-full border border-gray-500 rounded-md py-5'>
      <div className='text-2xl font-semibold'>Masukan Password Baru</div>
      <div className='border border-gray-400 rounded-md w-60 px-2 py-1'><input type="password" value={newpassword} onChange={(e)=>setnewpassword(e.target.value)} placeholder='Masukan Password Baru' className='outline-none w-full' /></div>
      <div className='text-2xl font-semibold'>Ulangi Password</div>
      <div className='border border-gray-400 rounded-md w-60 px-2 py-1'><input type="password" onChange={(e)=> {
          if(e.target.value!==newpassword) return setvalid('Password tidak sama')
          return setvalid('')
          }} placeholder='Ulangi Password' className='outline-none w-full' /></div>
      {valid&&<div className='p-1 bg-rose-200 text-rose-600 border border-rose-400 rounded-md'>{valid}</div>}
      <button onClick={handleSubmit} className={`bg-green-500 px-2 py-1 font-semibold hover:bg-green-600 text-white rounded-md`}>{usersLoading?<>Loading...</>:<>Submit</>}</button>       
    </div>
  )
}

export default ResetPassword