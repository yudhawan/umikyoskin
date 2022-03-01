import {faUser,faTimesCircle,faSignInAlt,faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import {faInstagram,faShopify, faWhatsapp, faTiktok,} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon}  from '@fortawesome/react-fontawesome';
import {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCarts } from '../features/cartSlice';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Cart from './Cart';

function Header() {
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
  useEffect(()=>{ 
    dispatch(getCarts())
    catchResize()
  },[])
  return (
    <div className="top-0 left-0 w-full h-12 lg:h-20  items-center space-x-1 bg-primary fixed flex">
        {/* mobile sosmed */}
        <div className={`block lg:hidden absolute left-1 text-white bg-transparent border border-white px-1 rounded-md cursor-pointer`} onClick={()=>setsosmed(!sosmed)}>+Follow</div>
        <div className={`${sosmed?'block fixed':'hidden'} top-12 self-center z-40 flex justify-center items-center w-full h-4/5 bg-opacity-50 bg-black`}>
          <div className='bg-primary p-10 grid grid-cols-2 gap-8 rounded-sm w-auto h-auto '>
          <FontAwesomeIcon onClick={()=>setsosmed(!sosmed)} className='absolute top-20 right-20 mt-9 mr-8 w-5 h-5 cursor-pointer text-gray-700' icon={faTimesCircle}/>
            <div className='text-white cursor-pointer text-sm w-16 h-16 flex flex-col justify-center text-center'><FontAwesomeIcon icon={faInstagram} className='w-full h-full' />Instagram</div>
            <div className='text-white cursor-pointer text-sm w-16 h-16 flex flex-col justify-center text-center'><FontAwesomeIcon icon={faWhatsapp} className='w-full h-full' />WhatsApp</div>
            <div className='text-white cursor-pointer text-sm w-16 h-16 flex flex-col justify-center text-center'><FontAwesomeIcon icon={faTiktok} className='w-full h-full' />Tiktok</div>
            <div className='text-white cursor-pointer text-sm w-16 h-16 flex flex-col justify-center text-center'><FontAwesomeIcon icon={faShopify} className='w-full h-full' />Shopee</div>
          </div>
        </div>
        {/* --/-- */}

        <div className="font:semibold lg:font-bold text-white text-2xl left-20 lg:text-3xl absolute lg:left-16">Umikyo</div>
        {/* desktop menu */}
        <div className='hidden lg:block lg:flex lg:ml-10 space-x-4 text-xl justify-start lg:w-96 absolute lg:left-60'>
          <div className='flex justify-center items-center w-full h-full hover:border-b-2 hover:border-white'>  <Link to="/" className={`${(pathname==='/')?'font-bold border-b-2 border-white':'first-letter:'} text-white`}>Home</Link></div>
          <div className='flex justify-center items-center w-full h-full hover:border-b-2 hover:border-white'>  <Link to="/products" className={`${(pathname==='/products')?'font-bold border-b-2 border-white':'first-letter:'} text-white`}>Products</Link></div>
          <div className='flex justify-center items-center w-full h-full hover:border-b-2 hover:border-white'>  <Link to="/konfirmasi" className={`${(pathname==='/konfirmasi')?'font-bold border-b-2 border-white':'first-letter:'} text-white`}>Konfirmasi</Link></div>
          <div className='flex justify-center items-center w-full h-full hover:border-b-2 hover:border-white'>  <Link to="/sellers" className={`${(pathname==='/sellers')?'font-bold border-b-2 border-white':'first-letter:'} text-white`}>Sellers</Link></div>
          <div className='flex justify-center items-center w-full h-full hover:border-b-2 hover:border-white'>  <Link to="/join" className={`${(pathname==='/join')?'font-bold border-b-2 border-white':'first-letter:'} text-white`}>JOIN</Link></div>
        </div>
        {/* --/-- */}
        {/* desktop sosmed */}
        <div className='hidden lg:block lg:flex space-x-2 bg-[#D87E37] rounded-lg p-2 absolute right-60'>
            <div className='text-white cursor-pointer text-sm w-5 h-5 flex flex-col justify-center text-center'><FontAwesomeIcon icon={faInstagram} className='w-full h-full' /></div>
            <div className='text-white cursor-pointer text-sm w-5 h-5 flex flex-col justify-center text-center'><FontAwesomeIcon icon={faWhatsapp} className='w-full h-full' /></div>
            <div className='text-white cursor-pointer text-sm w-5 h-5 flex flex-col justify-center text-center'><FontAwesomeIcon icon={faTiktok} className='w-full h-full' /></div>
            <div className='text-white cursor-pointer text-sm w-5 h-5 flex flex-col justify-center text-center'><FontAwesomeIcon icon={faShopify} className='w-full h-full' /></div>
        </div>
        {/* --/-- */}
        {/* desktop basket */}
        <div className='hidden lg:block lg:flex bg-violet-700 rounded-lg p-2 absolute right-40'>
          <div className={`flex flex-col relative text-white w-12 cursor-pointer text-center`} onClick={()=>setCart(!cart)}><FontAwesomeIcon size="xl" icon={faShoppingCart} /><div className={`${(carts&&carts.length>0)?'bg-red':''} text-white px-1 text-xs rounded-full absolute top-0 right-0`}>{(carts&&carts.length>0)?carts&&carts.length:<></>}</div></div>
        </div>
        {/* --/-- */}
        {/* modal cart */}
        
        <Cart cart={cart} showCart={showCart} />
        {/* --/-- */}
        {/* mobile Users*/}
        <div className={`absolute right-3 lg:right-20 text-white cursor-pointer`} onClick={()=>setuser(!user)}><FontAwesomeIcon icon={faUser} className="lg:w-6 lg:h-6" /></div>
        <div className={`${user?'block fixed':'hidden'} top-0 self-center z-50 flex justify-center bg-transparent backdrop-blur-sm items-center w-full h-full lg:bg-opacity-10 bg-opacity-75 bg-black `}>
          <div className='bg-primary p-10 flex-col flex space-y-3 rounded-md w-auto h-auto relative'>
          <FontAwesomeIcon onClick={()=>setuser(!user)} className='absolute top-[-1.4rem] right-[-1.4rem]  w-8 h-8 cursor-pointer text-red' icon={faTimesCircle}/>
            <input type="email" className='rounded-sm h-10 placeholder:pl-3' placeholder='Email' />
            <input type="password" className='rounded-sm h-10 placeholder:pl-3' placeholder='Password' />
            <button className='bg-green-600 text-white rounded-sm p-2 justify-center items-center flex'><FontAwesomeIcon icon={faSignInAlt} /> Login</button>
            <div onClick={()=> {
              setuser(false)
              navigate('/join')
              }} className='block lg:hidden text-white text-center hover:border hover:border-bg-blue-600 p-1 cursor-pointer'>Join</div>

          </div>
        </div>
        {/* --/-- */}
    </div>
  );
}

export default Header;
