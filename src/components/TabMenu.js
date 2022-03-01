import {faHome, faShoppingCart, faUsers, faCheckCircle,faCompass} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon}  from '@fortawesome/react-fontawesome';
import {useLocation, Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCarts } from '../features/cartSlice';
import Cart from './Cart';
import {useEffect, useState} from 'react';
function TabMenu() {
  const dispatch = useDispatch();
  const {carts} = useSelector(state => state.carts);
  const count = 3
  const [cart, setCart] = useState(false)
  const showCart = () => setCart(!cart)
  const {pathname} = useLocation()
  useEffect(()=>{
    dispatch(getCarts())
  },[])
  return (
    <div className='block lg:hidden fixed flex justify-center items-center w-full bg-primary h-20 space-x-2 bottom-0 left-0 '>
        <Link to="/" className={`flex flex-col ${(pathname==='/')?'text-secondary':'text-white'} w-16 text-center`}><FontAwesomeIcon size="xl" icon={faHome} /> Home</Link>
        <Link to="/products" className={`flex flex-col ${(pathname==='/products')?'text-secondary':'text-white'} w-16 text-center`}><FontAwesomeIcon size="xl" icon={faCompass} /> Products</Link>
        <div className={`flex flex-col relative text-white w-16 cursor-pointer text-center`} onClick={showCart}><FontAwesomeIcon size="xl" icon={faShoppingCart} /> Cart<div className={`${(carts&&carts.length>0)?'bg-red':''} text-white px-2 rounded-full absolute top-0 right-0`}>{(carts&&carts.length>0)?carts&&carts.length:<></>}</div></div>
        <Link to="/konfirmasi" className={`flex flex-col ${(pathname==='/konfirmasi')?'text-secondary':'text-white'} w-16 text-center`}><FontAwesomeIcon size="xl" icon={faCheckCircle} /> Konfirm</Link>
        <Link to="/sellers" className={`flex flex-col ${(pathname==='/sellers')?'text-secondary':'text-white'} w-16 text-center`}><FontAwesomeIcon size="xl" icon={faUsers} /> Sellers</Link>
        <Cart cart={cart} showCart={showCart} />
    </div>
  );
}

export default TabMenu;
