import {useState} from 'react';
import {useDispatch} from 'react-redux'
import { useNavigate } from "react-router-dom";
import {faInstagram,faShopify, faWhatsapp, faFacebook,} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon}  from '@fortawesome/react-fontawesome';
function Join() {
  const navigate = useNavigate();
  const [valid, setValid]=useState('')
  const [validation, setValidation]=useState('')
  const [repassword,setRepassword] = useState('')
  const [showpass,setShowpass] = useState(false)
  const [user, setUser] = useState({
      fullname: '',
      name: '',
      email:'',
      tgllhr:null,
      whatsapp:'',
      instagram:'',
      facebook:'',
      shoope:'',
      status:'',
      refferal:'',
      provinsi:'',
      kota:'',
      alamat:'',
      password:''
  })
  function cek(e){
      e.preventDefault()
      if(user.fullname==='') return setValid('Isi Nama Lengkap Anda')
      if(user.name==='') return setValid('Isi Nama Panggilan Anda')
      if(user.email==='') return setValid('Isi Email Anda')
      if(user.tgllhr===''|| user.tgllhr===null) return setValid('Isi Tanggal Lahir Anda')
      if(user.whatsapp==='') return setValid('Isi WhatsApp Anda')
      if(user.instagram==='') return setValid('Isi Instagram Anda')
      if(user.shoope==='') return setValid('Isi Shoope Anda')
      if(user.status==='') return setValid('Isi Status Anda')
      if(user.provinsi==='') return setValid('Isikan Provinsi Anda')
      if(user.kota==='') return setValid('Isikan Kota Anda')
      if(user.alamat==='') return setValid('Isi Alamat Lengkap Anda')
      return setShowpass(!showpass)
  }
  const status = null
  // function handleSubmit(){
  //     if(user.password==='') return setValidation('Isi password anda')
  //     if(user.password!==repassword) return setValidation('Isi ulang password anda')
  //     adduser(user)
  //     setShowpass(!showpass)
  // }

  // perlu ditambahkan reset status
  if(status===201){
      setTimeout(()=>{
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
        navigate('/')
    },3000)
    return (
      <div className='justify-center items-center flex'>
        <div className='bg-gray-800 text-2xl font-bold p-8 rounded-md text-white'>Kode Refferal Tersebut Tidak Dapat Ditemukan.</div>
      </div>
    )
  }
  if(status===500){
    setTimeout(()=>{
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
      navigate('/')
  },3000)
    return (
      <div className='justify-center items-center flex'>
        <div className='bg-red text-2xl font-bold p-8 rounded-md text-white'>Email atau nomor WhatsApp anda pernah didaftarkan....</div>
      </div>
    )
  }
  return (
    <div className='flex-col lg:flex lg:flex-row border-2 border-orange-500 w-full h-auto p-4 rounded-sm lg:space-x-60'>
      <div className='flex-col space-y-2 lg:justify-start'>
        <div className='flex-col'>
          <div className='font-semibold text-base text-primary'>Nama Lengkap</div>
          <input type='text' require value={user.fullname} onChange={(e)=> setUser({...user, fullname: e.target.value})} className='w-full border-2 border-gray-500 p-1 rounded-md outline-none' placeholder='Rebecca Ferguson' />
        </div>
        <div className='flex-col'>
          <div className='font-semibold text-base text-primary'>Nama Panggilan</div>
          <input type='text' required value={user.name} onChange={(e)=> setUser({...user, name: e.target.value})} className='w-full border-2 border-gray-500 p-1 rounded-md outline-none' placeholder='Rebecca' />
        </div>
        <div className='flex-col'>
          <div className='font-semibold text-base text-primary'>Email</div>
          <input type='email' required value={user.email} onChange={(e)=> setUser({...user, email: e.target.value})} className='w-full border-2 border-gray-500 p-1 rounded-md outline-none' placeholder='rebecaF@gmail.com' />
        </div>
        <div className='flex-col'>
          <div className='font-semibold text-base text-primary'>Tanggal Lahir</div>
          <input type='date' required value={user.tgllhr} onChange={(e)=> setUser({...user, tgllhr: e.target.value})} className='w-full border-2 border-gray-500 p-1 rounded-md outline-none' placeholder='Rebecca' />
        </div>
        <div className='flex-col'>
          <div className='font-semibold text-base text-primary'>Provinsi</div>
          <input type='text' required value={user.provinsi} onChange={(e)=> setUser({...user, provinsi: e.target.value})} className='w-full border-2 border-gray-500 p-1 rounded-md outline-none' placeholder='Jawa Timur' />
        </div>
        <div className='flex-col'>
          <div className='font-semibold text-base text-primary'>Kota</div>
          <input type='text' required value={user.kota} onChange={(e)=> setUser({...user, kota: e.target.value})} className='w-full border-2 border-gray-500 p-1 rounded-md outline-none' placeholder='Surabaya' />
        </div>
        <div className='flex-col'>
          <div className='font-semibold text-base text-primary'>Alamat</div>
          <input type='text' required value={user.alamat} onChange={(e)=> setUser({...user, alamat: e.target.value})} className='w-full border-2 border-gray-500 p-1 rounded-md outline-none' placeholder='Jl. Soekarno Hatta No. 03' />
        </div>
      </div>
      <div className='flex-col space-y-2 lg:justify-end'>
        <div className='flex-col w-52'>
          <div className='font-semibold text-base text-primary'>Pilih member</div>
          <select required value={user.status} onChange={(e)=> setUser({...user, status: e.target.value})} className='w-full border-2 border-gray-500 p-1 rounded-md outline-none'>
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
            <input type='text' required value={user.refferal} onChange={(e)=> {setUser({...user, refferal: e.target.value.replace(/\s/g, '')})}} className='w-full border-2 border-gray-500 p-1 rounded-md outline-none' placeholder='DSXX' />
          </div>
        }
        <div className='font-semibold text-base text-primary'>Social Media</div>
        <div className='flex-col w-52'>
          <div className='flex space-x-1 border-2 border-gray-500 p-1 rounded-md justify-center items-center'><FontAwesomeIcon icon={faWhatsapp} size="lg" className='text-green-500' /><input type='text' required value={user.whatsapp} onChange={(e)=> setUser({...user, whatsapp: e.target.value})} className='w-full outline-none' placeholder='085xxxxxxxxx' /></div>
        </div>
        <div className='flex-col w-52'>
          <div className='flex space-x-1 border-2 border-gray-500 p-1 rounded-md justify-center items-center'><FontAwesomeIcon icon={faInstagram} size="lg" className='text-red' /><input type='text' required value={user.instagram} onChange={(e)=>setUser({...user, instagram: e.target.value})} className='w-full outline-none' placeholder='rebeca.ferguson07' /></div>
        </div>
        <div className='flex-col w-52'>
          <div className='flex space-x-1 border-2 border-gray-500 p-1 rounded-md justify-center items-center'><FontAwesomeIcon icon={faFacebook} size="lg" className='text-blue-600' /><input type='text' required value={user.facebook} onChange={(e)=>setUser({...user, facebook: e.target.value})} className='w-full outline-none' placeholder='rebeca.ferguson07' /></div>
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
        </div>
        <button className='bg-green-500 px-4 py-2 rounded-md text-white hover:bg-green-700 '>Submit</button>
      </div>
    </div>
  );
}

export default Join;
