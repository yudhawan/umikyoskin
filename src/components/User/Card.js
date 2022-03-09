import React, { useEffect, useRef,useState } from 'react'
import { CameraOutline,CloudDownloadOutline,CheckmarkOutline } from 'react-ionicons'
import { useReactToPrint } from 'react-to-print';
import { useDispatch,useSelector } from 'react-redux';
import {updatePicture,resetStatus} from '../../features/users/usersSlice'
import Logo from '../logo.png'
import Hiragana from '../hiragana.png'
function Card({auth,token}) {
  const dispatch = useDispatch()
  const {status,usersLoading} = useSelector(state => state.users)
  const componentRef = useRef();
  const [image,setimage] = useState(auth?.picutre)
  const [picture,setpicture] = useState('')
  const img = useRef()
  const downloadcard=useReactToPrint({content: ()=> componentRef.current})
  function handleSave(){
    dispatch(updatePicture({image:image, email:auth.email}))
    setpicture('')
    setimage(auth.picutre)
  }

  useEffect(()=>{
    setTimeout(()=>{
      if(status) dispatch(resetStatus())
  },3000)
  },[status])
  return (
    <div className='w-full bg-slate-100 h-auto flex flex-col justify-center items-center space-y-2 py-3'>
      {(status===200)?<div className='flex px-2 py-1 bg-green-500 text-white font-semibold rounded-md'><CheckmarkOutline color={'white'} /><p>Saved</p></div>:<></>}
      <div className='border border-primary rounded-full w-60 h-60 relative'>
          <div onClick={()=> img.current.click()} className='cursor-pointer rounded-full w-10 h-10 absolute bottom-0 right-10 bg-slate-500 justify-center items-center flex'><CameraOutline color={'black'} /></div>
          {
            picture?<img src={picture} className="w-full h-full rounded-full" />:
            <img src={auth.picture?`https://beautyshop.yashacode.com/users/img/${auth.picture}`:'https://via.placeholder.com/150.png?text=umikyo'} className="w-full h-full rounded-full" />
          }
      </div>
      <input type='file' hidden name="image" accept="image/*" ref={img} onChange={(e)=>{
        setimage(e.target.files[0])
        const pic = URL.createObjectURL(e.target.files[0])
        setpicture(()=>pic)
      }} />
      {
        usersLoading?<div className='bg-gray-500 px-3 py-1 rounded-md text-white text-lg font-semibold'>Loading</div>:
        <button className={`'py-1 px-2 bg-green-500 text-lg text-white rounded-md mt-2 font-semibold'`} onClick={handleSave}>Save</button>
      }
      <div onClick={downloadcard} className='bg-gray-500 text-white select-none px-4 py-1 rounded-md font-semibold flex space-x-1 cursor-pointer'><CloudDownloadOutline color={'white'} /><p>My ID Card</p></div>

      

      <div ref={componentRef} className={`bg-[#D3C3E6] w-full h-auto px-3 py-5 space-y-3 z-0`}>
        <div className='bg-[#D6C8E4] border border-[#9F92AD] w-full h-auto px-5 py-3 rounded-md flex justify-between' >
          <div className='w-16 h-16 relative'><img src={Logo} className='w-full h-full absolute'/></div>
          <div className='w-32 h-3 relative self-center'><img src={Hiragana} className='w-full fill-primary h-full absolute'/></div>
        </div>
        <div className='bg-[#331A44] flex flex-col rounded-md ' >
          <div className='flex justify-between px-10 py-3'>
            <div className='text-2xl text-white font-semibold self-center'>{(auth.status.includes('RNV'))?'RESELLER':(auth.status.includes('ANV'))?'AGEN':(auth.status.includes('DS'))?'DISTRIBUTOR':'DISTRIBUTOR VIP'}</div>
            <div className='w-16 h-16 relative'><img src={Logo} className='w-full h-full absolute'/></div>
            <div className='text-2xl text-white font-semibold self-center'>{(auth.status.includes('DS') | auth.status.includes('DVIP'))?auth.status+'-'+auth.kode_ref:auth.kode_ref+'-'+auth.status}</div>
          </div>
          <div className='flex justify-between px-10 py-3'>
            <div className='flex flex-col space-y-2 self-center'>
              <div className='font-semibold text-xl text-white'>Nama</div>
              <div className='font-semibold text-xl text-white'>WhatsApp</div>
              <div className='font-semibold text-xl text-white'>Instagram</div>
            </div>
            <div className='flex flex-col space-y-2 self-center'>
              <div className='font-semibold text-xl text-primary bg-white px-2 rounded-sm w-60 line-clamp-1'>{auth.nama_lengkap}</div>
              <div className='font-semibold text-xl text-primary bg-white px-2 rounded-sm w-60 line-clamp-1'>{auth.wa}</div>
              <div className='font-semibold text-xl text-primary bg-white px-2 rounded-sm w-60 line-clamp-1'>{auth.ig}</div>
            </div>
            <div className='w-40 h-40 relative rounded-lg'>
              <img src={auth.picture?`https://beautyshop.yashacode.com/users/img/${auth.picture}`:'https://via.placeholder.com/150.png?text=umikyo'} className="w-full h-full rounded-lg" />
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Card