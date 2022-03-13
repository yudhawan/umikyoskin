import React from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {forgetPassword} from '../features/users/usersSlice'
function ForgetPassword() {
    const dispatch = useDispatch()
    const {status,usersLoading} = useSelector(state => state.users)
    const [email,setemail] = React.useState('')
    const [valid,setvalid] = React.useState('')
    function handleSubmit(e){
      if(email==='') return setvalid('Email is required')
      setvalid('')
      setemail('')
      return dispatch(forgetPassword(email))
    }
  return (
    <div className='flex flex-col justify-center space-y-4 items-center w-full border border-orange-500 rounded-md py-5'>
        <div className='text-2xl font-semibold'>Forgot Password</div>
        <div className='border border-gray-400 rounded-md w-60 px-2 py-1'><input type="email" value={email} onChange={(e)=>setemail(e.target.value)} placeholder='Masukan Email Anda' className='outline-none w-full' /></div>
        {valid&&<div className='p-1 bg-rose-200 text-rose-600 border border-rose-400 rounded-md'>{valid}</div>}
        <button onClick={handleSubmit} className={`bg-green-500 px-2 py-1 font-semibold hover:bg-green-600 text-white rounded-md`}>{usersLoading?<>Loading...</>:<>Submit</>}</button>
        {
            (status===401)?<div className='bg-rose-200 text-red py-1 px-2 rounded-md border border-rose-500'>Email tersebut tidak terdaftar</div>:(status===250)?<div className='bg-green-200 text-green-500 font-semibold py-1 px-2 rounded-md border border-green-500'>Silahkan cek email anda dalam 5 menit kedepan untuk melakukan pemulihan password, silahkan cek di kontak masuk atau spam</div>:<></>
        }
    </div>
  )
}

export default ForgetPassword