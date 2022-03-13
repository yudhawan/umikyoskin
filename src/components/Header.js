import {faUser,faTimesCircle,faSignInAlt,faShoppingCart,faHome, faUsers, faCheckCircle,faCompass} from '@fortawesome/free-solid-svg-icons';
import { CogOutline,LogOutOutline } from 'react-ionicons'
import {faInstagram,faShopify, faWhatsapp, faTiktok,} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon}  from '@fortawesome/react-fontawesome';
import {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCarts } from '../features/cartSlice';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {userLogin} from '../features/users/authSlice';
import Cart from './Cart';
import {userLogout} from '../features/users/authSlice'
function Header({token}) {
  
  const [login,setlogin] = useState({
    email:'',
    password:'',
  })
  const dispatch = useDispatch();
  const {carts} = useSelector(state => state.carts);
  const {pathname} = useLocation()
  const [cart, setCart] = useState(false)
  const [sosmed, setsosmed] = useState(false)
  const [user, setuser] = useState(false)
  const navigate = useNavigate()
  const showCart = () => setCart(!cart)
  function catchResize() {
    window.addEventListener('resize', () => {
      if(window.innerWidth >= 1024){
        setsosmed(false)
        setuser(false)
      }
    })
  }
  // console.log(token+'/'+login+'/'+auth)
  useEffect(()=>{ 
    dispatch(getCarts())
    catchResize()
  },[])
  return (
    <div className="top-0 left-0 w-full h-12 lg:h-20  items-center space-x-1 bg-primary fixed flex z-50">
        <div className="select-none font:semibold lg:font-bold text-white text-2xl text-center w-full lg:w-auto lg:text-3xl absolute lg:left-16">Umikyo</div>
      
        {/* mobile sosmed */}
        <div className={`block text-white lg:hidden absolute left-1 bg-transparent border border-white px-1 rounded-md cursor-pointer`} onClick={()=>setsosmed(!sosmed)}>+Follow</div>
        <div className={`${sosmed?'block fixed':'hidden'} top-0  self-center z-50 flex justify-center bg-transparent backdrop-blur-sm items-center w-full h-full lg:bg-opacity-10 bg-opacity-75 bg-black`}>
          <div className='bg-slate-200 p-10 grid grid-cols-2 gap-8 rounded-sm w-auto h-auto relative '>
          <FontAwesomeIcon onClick={()=>setsosmed(!sosmed)} className='absolute top-[-1.4rem] right-[-1.4rem]  w-8 h-8 cursor-pointer text-red' icon={faTimesCircle}/>
            <div className='text-red cursor-pointer text-sm w-16 h-16 flex flex-col justify-center text-center'><FontAwesomeIcon icon={faInstagram} className='w-full h-full' onClick={()=> {
                const newTab = window.open("https://www.instagram.com/umikyo.official/", '_blank', 'noopener,noreferrer')
                if (newTab) newTab.opener = null
            }} />Instagram</div>
            <div className='text-green-500 cursor-pointer text-sm w-16 h-16 flex flex-col justify-center text-center'><FontAwesomeIcon icon={faWhatsapp} className='w-full h-full' onClick={()=> {
                const newTab = window.open("https://api.whatsapp.com/send?phone=6282332411031", '_blank', 'noopener,noreferrer')
                if (newTab) newTab.opener = null
            }} />WhatsApp</div>
            <div className='text-black cursor-pointer text-sm w-16 h-16 flex flex-col justify-center text-center'><FontAwesomeIcon icon={faTiktok} className='w-full h-full' onClick={()=> {
                const newTab = window.open("https://vt.tiktok.com/ZSewCQaKJ/", '_blank', 'noopener,noreferrer')
                if (newTab) newTab.opener = null
            }} />Tiktok</div>
            <div className='text-orange-600 cursor-pointer text-sm w-16 h-16 flex flex-col justify-center text-center'><FontAwesomeIcon icon={faShopify} className='w-full h-full' onClick={()=> {
                const newTab = window.open("https://shopee.co.id/umikyo.official?smtt=0.0.9", '_blank', 'noopener,noreferrer')
                if (newTab) newTab.opener = null
            }} />Shopee</div>
          </div>
        </div>
        {/* --/-- */}

        {/* desktop menu */}
        <div className='hidden lg:block lg:flex lg:ml-10 space-x-3 text-xl justify-start lg:w-96 absolute lg:left-60'>
          <div className='flex justify-center items-center w-full h-full hover:border-b-2 hover:border-white'>  <Link to="/" className={`${(pathname==='/')?'font-bold border-b-2 border-white':''} text-white flex space-x-1 text-lg`}>
            <div className='flex justify-center items-center'><FontAwesomeIcon icon={faHome} /></div>
            <div>Home</div>
            </Link></div>
          <div className='flex justify-center items-center w-full h-full hover:border-b-2 hover:border-white'>  <Link to="/products" className={`${(pathname==='/products')?'font-bold border-b-2 border-white':''} text-white flex space-x-1 text-lg`}>
            <div className='flex justify-center items-center'><FontAwesomeIcon icon={faCompass} /></div>
            <div>Products</div>
            </Link></div>
          <div className='flex justify-center items-center w-full h-full hover:border-b-2 hover:border-white'>  <Link to="/konfirmasi" className={`${(pathname==='/konfirmasi')?'font-bold border-b-2 border-white':''} text-white flex space-x-1 text-lg`}>
            <div className='flex justify-center items-center'><FontAwesomeIcon icon={faCheckCircle} /></div>
            <div>Konfirmassi</div>
            </Link></div>
          <div className='flex justify-center items-center w-full h-full hover:border-b-2 hover:border-white'>  <Link to="/sellers" className={`${(pathname==='/sellers')?'font-bold border-b-2 border-white':''} text-white flex space-x-1 text-lg`}>
            <div className='flex justify-center items-center'><FontAwesomeIcon icon={faUsers} /></div>
            <div>Sellers</div>
            </Link></div>
          <div className='flex justify-center items-center w-full h-full bg-[#D53A5D] hover:bg-[#9A026C] p-1 rounded-sm'>  <Link to="/join" className={`${(pathname==='/join')?'font-bold border-b-2 border-white':''} text-white flex space-x-1 text-base font-semibold`}>JOIN</Link></div>
        </div>
        {/* --/-- */}
        {/* desktop sosmed */}
        <div className='hidden lg:block lg:flex space-x-2 bg-[#d5c5e2] rounded-lg p-2 absolute right-52'>
            <div onClick={()=> {
                const newTab = window.open("https://www.instagram.com/umikyo.official/", '_blank', 'noopener,noreferrer')
                if (newTab) newTab.opener = null
            }} className='text-red cursor-pointer text-sm w-5 h-5 flex flex-col justify-center text-center'><FontAwesomeIcon icon={faInstagram} className='w-full h-full' /></div>
            <div onClick={()=> {
                const newTab = window.open("https://api.whatsapp.com/send?phone=6282332411031", '_blank', 'noopener,noreferrer')
                if (newTab) newTab.opener = null
            }} className='text-green-500 cursor-pointer text-sm w-5 h-5 flex flex-col justify-center text-center'><FontAwesomeIcon icon={faWhatsapp} className='w-full h-full' /></div>
            <div onClick={()=> {
                const newTab = window.open("https://vt.tiktok.com/ZSewCQaKJ/", '_blank', 'noopener,noreferrer')
                if (newTab) newTab.opener = null
            }} className='text-black cursor-pointer text-sm w-5 h-5 flex flex-col justify-center text-center'><FontAwesomeIcon icon={faTiktok} className='w-full h-full' /></div>
            <div onClick={()=> {
                const newTab = window.open("https://shopee.co.id/umikyo.official?smtt=0.0.9", '_blank', 'noopener,noreferrer')
                if (newTab) newTab.opener = null
            }} className='text-orange-600 cursor-pointer text-sm w-5 h-5 flex flex-col justify-center text-center'><FontAwesomeIcon icon={faShopify} className='w-full h-full' /></div>
        </div>
        {/* --/-- */}
        {/* desktop basket */}
        <div className='hidden lg:block lg:flex bg-[#540F88] rounded-lg py-1 absolute right-32'>
          <div className={`flex flex-col relative text-white w-12 h-6 cursor-pointer justify-center items-center`} onClick={()=>setCart(!cart)}><FontAwesomeIcon icon={faShoppingCart} size={'lg'} /><div className={`${(carts&&carts.length>0)?'bg-red':''} text-white px-1 text-xs rounded-full absolute top-0 right-0`}>{(carts&&carts.length>0)?carts&&carts.length:<></>}</div></div>
        </div>
        {/* --/-- */}
        {/* modal cart */}
        
        <Cart cart={cart} showCart={showCart} />
        {/* --/-- */}
        {/* mobile Users*/}
        <div className={`absolute right-3 lg:right-20 text-white cursor-pointer`} onClick={()=>setuser(!user)}><FontAwesomeIcon icon={faUser} className="lg:w-6 lg:h-6" /></div>
        <div className={`${user?'block fixed':'hidden'} top-0 self-center z-50 flex justify-center bg-transparent backdrop-blur-sm items-center w-full h-full lg:bg-opacity-10 bg-opacity-75 bg-black `}>
        <div className='bg-primary p-10 flex-col flex space-y-3 rounded-md w-auto h-auto relative'>
          {token?
          <>
          <FontAwesomeIcon onClick={()=>setuser(!user)} className='absolute top-[-1.4rem] right-[-1.4rem]  w-8 h-8 cursor-pointer text-red' icon={faTimesCircle}/>
          <div className='bg-slate-500 select-none text-white font-semibold hover:bg-slate-700 flex space-x-3 rounded-md px-3 py-1 justify-center items-center cursor-pointer' onClick={()=>{
            setuser(!user)
            navigate('/userprofile')
          }}><CogOutline color={'white'} /> <p>Setting</p></div>
          <div onClick={()=>{
            setuser(false)
            dispatch(userLogout())}} className='bg-rose-500 text-white font-semibold px-3 py-1 hover:bg-rose-700 rounded-md text-center cursor-pointer flex space-x-3'><LogOutOutline color={'white'} /><p>Logout</p></div>
          </>
          :<>
          <FontAwesomeIcon onClick={()=>setuser(!user)} className='absolute top-[-1.4rem] right-[-1.4rem]  w-8 h-8 cursor-pointer text-red' icon={faTimesCircle}/>
          <form onSubmit={(e)=>{
            e.preventDefault()
            setlogin({...login, email:'', password:''})
            setuser(false)
            dispatch(userLogin(login))
          }} className="flex flex-col space-y-1">
            <input type="email" value={login.email} onChange={(e)=>setlogin({...login, email:e.target.value})} className='px-3 rounded-sm h-10' placeholder='Email' />
            <input type="password" value={login.password} onChange={(e)=>setlogin({...login, password:e.target.value})} className='px-3 rounded-sm h-10 ' placeholder='Password' />
            <button className='bg-green-600 text-white rounded-sm p-2 justify-center items-center flex' onClick={()=> {
              setlogin({...login, email:'', password:''})
              setuser(false)
              dispatch(userLogin(login))
            }}><FontAwesomeIcon icon={faSignInAlt} /> Login</button>
          </form>
            <div onClick={()=> {
              setuser(false)
              navigate('/join')
            }} className='block lg:hidden text-white text-center hover:border border-bg-blue-600 p-1 cursor-pointer'>Join</div>
            <p className='text-gray-400 cursor-pointer hover:underline' onClick={()=> {
              setuser(false)
              navigate('/forgetpassword')
              }}>Forgot Password ?</p>
          </>
          }
          </div>
        </div>
        {/* --/-- */}
    </div>
  );
}

export default Header;
