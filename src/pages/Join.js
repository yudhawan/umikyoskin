import {useState,useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux'
import {addUser,resetStatus} from '../features/users/usersSlice'
import { useNavigate } from "react-router-dom";
import {faInstagram,faShopify, faWhatsapp, faFacebook,} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon}  from '@fortawesome/react-fontawesome';
function Join() {
  const dispatch = useDispatch()
  const {status,usersLoading} = useSelector(state => state.users)
  const navigate = useNavigate();
  const [valid, setValid]=useState('')
  const [validation, setValidation]=useState('')
  const [repassword,setRepassword] = useState('')
  const [user, setUser] = useState({
      nama_lengkap: '',
      nama: '',
      email:'',
      ttl:null,
      wa:'',
      ig:'',
      fb:'',
      shoope:'',
      status:'',
      kode_ref:'',
      wilayah:'',
      kota:'',
      alamat_lengkap:'',
      password:'',
      verification:0
  })
  
  function handleSubmit(e){
      e.preventDefault()
      if(user.nama_lengkap==='') return setValid('Isi Nama Lengkap Anda')
      if(user.nama==='') return setValid('Isi Nama Panggilan Anda')
      if(user.email==='') return setValid('Isi Email Anda')
      if(user.ttl===''|| user.ttl===null) return setValid('Isi Tanggal Lahir Anda')
      if(user.wa==='') return setValid('Isi Whatsapp Anda')
      if(user.status==='') return setValid('Isi Status Anda')
      if(user.wilayah==='') return setValid('Isikan Provinsi Anda')
      if(user.kota==='') return setValid('Isikan Kota Anda')
      if(user.alamat_lengkap==='') return setValid('Isi Alamat_lengkap Lengkap Anda')
      if(user.password==='') return setValidation('Isi password anda')
      if(user.password!==repassword) return setValidation('Isi ulang password anda')
      submit()  
  }
  const submit =()=> {
    if(user.status==='DS' || user.status==='DVIP') user.kode_ref=user.ttl.replaceAll('-','')
    setValid('')
    dispatch(addUser(user))
  }
  
  
  if(status===201){
      setTimeout(()=>{
        dispatch(resetStatus())
        navigate('/')
      },3000)
      return (
        <div className='justify-center items-center flex'>
          <div className='bg-green-500 text-2xl font-bold p-8 rounded-md text-white'>Akun anda berhasil dibuat.</div>
        </div>
      )
  }
  if(status===203){
      setTimeout(()=>{
        dispatch(resetStatus())
        navigate('/')
    },3000)
    return (
      <div className='justify-center items-center flex'>
        <div className='bg-gray-800 text-2xl font-bold p-8 rounded-md text-white'>Kode kode_ref Tersebut Tidak Dapat Ditemukan.</div>
      </div>
    )
  }
  if(status===500){
    setTimeout(()=>{
      dispatch(resetStatus())
      navigate('/')
    },3000)
    return (
      <div className='justify-center items-center flex'>
        <div className='bg-purple-600 text-2xl font-bold p-8 rounded-md text-white'>Internal Server Error</div>
      </div>
    )
  }
  if(status===202){
    setTimeout(()=>{
      dispatch(resetStatus())
      navigate('/')
  },3000)
    return (
      <div className='justify-center items-center flex'>
        <div className='bg-red text-2xl font-bold p-8 rounded-md text-white'>Email atau nomor wa anda pernah didaftarkan....</div>
      </div>
    )
  }
  return (
    <div className='flex-col lg:flex lg:flex-row border-2 border-orange-500 w-full h-auto p-4 rounded-sm lg:space-x-60'>
      <div className='flex-col space-y-2 lg:justify-start'>
        <div className='flex-col'>
          <div className='font-semibold text-base text-primary'>Nama Lengkap</div>
          <input type='text' require value={user.nama_lengkap} onChange={(e)=> setUser({...user, nama_lengkap: e.target.value})} className='w-full border-2 border-gray-500 p-1 rounded-md outline-none' placeholder='Rebecca Ferguson' />
        </div>
        <div className='flex-col'>
          <div className='font-semibold text-base text-primary'>Nama Panggilan</div>
          <input type='text' required value={user.nama} onChange={(e)=> setUser({...user, nama: e.target.value})} className='w-full border-2 border-gray-500 p-1 rounded-md outline-none' placeholder='Rebecca' />
        </div>
        <div className='flex-col'>
          <div className='font-semibold text-base text-primary'>Email</div>
          <input type='email' required value={user.email} onChange={(e)=> setUser({...user, email: e.target.value})} className='w-full border-2 border-gray-500 p-1 rounded-md outline-none' placeholder='rebecaF@gmail.com' />
        </div>
        <div className='flex-col'>
          <div className='font-semibold text-base text-primary'>Tanggal Lahir</div>
          <input type='date' required value={user.ttl} onChange={(e)=> setUser({...user, ttl: e.target.value})} className='w-full border-2 border-gray-500 p-1 rounded-md outline-none' placeholder='Rebecca' />
        </div>
        <div className='flex-col'>
          <div className='font-semibold text-base text-primary'>Provinsi</div>
          <input type='text' required value={user.wilayah} onChange={(e)=> setUser({...user, wilayah: e.target.value})} className='w-full border-2 border-gray-500 p-1 rounded-md outline-none' placeholder='Jawa Timur' />
        </div>
        <div className='flex-col'>
          <div className='font-semibold text-base text-primary'>Kota</div>
          <input type='text' required value={user.kota} onChange={(e)=> setUser({...user, kota: e.target.value})} className='w-full border-2 border-gray-500 p-1 rounded-md outline-none' placeholder='Surabaya' />
        </div>
        <div className='flex-col'>
          <div className='font-semibold text-base text-primary'>Alamat</div>
          <input type='text' required value={user.alamat_lengkap} onChange={(e)=> setUser({...user, alamat_lengkap: e.target.value})} className='w-full border-2 border-gray-500 p-1 rounded-md outline-none' placeholder='Jl. Soekarno Hatta No. 03' />
        </div>
      </div>
      <div className='flex-col space-y-2 lg:justify-end'>
        <div className='flex-col w-52'>
          <div className='font-semibold text-base text-primary'>Pilih member</div>
          <select required value={user.status} onChange={(e)=> {
            setUser({...user, kode_ref: ''})
            setUser({...user, status: e.target.value})
            }} className='w-full border-2 border-gray-500 p-1 rounded-md outline-none'>
            <option>---/---</option>
            <option value="RNV">Reseller</option>
            <option value="ANV">Agen</option>
            <option value="DS">Distributor</option>
            <option value="DVIP">Distributor VIP</option>
          </select>
        </div>
        {
          (user.status==='DS' || user.status==='DVIP')?<></>:
          <div className='flex-col w-52'>
            <div className='font-semibold text-base text-primary'>Kode Refferal</div>
            <input type='text' required value={user.kode_ref} onChange={(e)=> {setUser({...user, kode_ref: e.target.value.toLocaleUpperCase()})}} className='uppercase w-full border-2 border-gray-500 p-1 rounded-md outline-none' placeholder='DSXX' />
          </div>
        }
        <div className='font-semibold text-base text-primary'>Social Media</div>
        <div className='flex-col w-52'>
          <div className='flex space-x-1 border-2 border-gray-500 p-1 rounded-md justify-center items-center'><FontAwesomeIcon icon={faWhatsapp} size="lg" className='text-green-500' /><input type='number' required value={user.wa} onChange={(e)=> setUser({...user, wa: e.target.value})} className='w-full outline-none' placeholder='085xxxxxxxxx' /></div>
        </div>
        <div className='flex-col w-52'>
          <div className='flex space-x-1 border-2 border-gray-500 p-1 rounded-md justify-center items-center'><FontAwesomeIcon icon={faInstagram} size="lg" className='text-red' /><input type='text' required value={user.ig} onChange={(e)=>setUser({...user, ig: e.target.value})} className='w-full outline-none' placeholder='rebeca.ferguson07' /></div>
        </div>
        <div className='flex-col w-52'>
          <div className='flex space-x-1 border-2 border-gray-500 p-1 rounded-md justify-center items-center'><FontAwesomeIcon icon={faFacebook} size="lg" className='text-blue-600' /><input type='text' required value={user.fb} onChange={(e)=>setUser({...user, fb: e.target.value})} className='w-full outline-none' placeholder='rebeca.ferguson07' /></div>
        </div>
        <div className='flex-col w-52'>
          <div className='flex space-x-1 border-2 border-gray-500 p-1 rounded-md justify-center items-center'><FontAwesomeIcon icon={faShopify} size="lg" className='text-orange-600' /><input type='text' required value={user.shoope} onChange={(e)=> setUser({...user, shoope: e.target.value})} className='w-full outline-none' placeholder='rebcaF.shopee' /></div>
        </div>
        <div className='flex-col w-52 space-y-1'>
          <div className='font-semibold text-base text-primary'>Password</div>
          <input type='password' required value={user.password} onChange={(e)=> setUser({...user,password:e.target.value})} className='w-full border-2 border-gray-500 p-1 rounded-md outline-none' placeholder='********' />
          <input type='password'  value={repassword} onChange={(e)=> {
            setRepassword(e.target.value)
            if (e.target.value!==user.password){ 
                return setValidation('Password tidak sama')
            } 
            return setValidation('')
          }} className='w-full border-2 border-gray-500 p-1 rounded-md outline-none' placeholder='Ulangi Password' />
          <div className='bg-rose-100 text-rose-700 font-semibold text-center rounded-md'>{valid}</div>
          <div className='bg-rose-100 text-rose-700 font-semibold text-center rounded-md'>{validation}</div>
        </div>
        {
          usersLoading?<div className='bg-gray-100 text-gray-700 font-semibold text-center rounded-md'>Loading...</div>:
          <button className='bg-green-500 px-4 py-2 rounded-md text-white hover:bg-green-700 ' onClick={handleSubmit}>Submit</button>
        }
      </div>
    </div>
  );
}

export default Join;
