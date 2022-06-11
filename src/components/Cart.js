import {FontAwesomeIcon}  from '@fortawesome/react-fontawesome';
import {faShoppingCart, faTrash} from '@fortawesome/free-solid-svg-icons';
import {getBasket, deleteItem,incrementProductQty,decrementProductQty} from '../features/cartSlice'
import {useNavigate} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import { useEffect,  } from 'react';
function Cart({cart, showCart}) {
    const navigate = useNavigate()
    const {basket,basketLoading} = useSelector(state => state.carts)
    const {token} = useSelector(state => state.auth)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getBasket())
    },[cart])
  return (
    <div className={`${cart?'block fixed':'hidden'} top-0 self-center flex justify-center bg-transparent backdrop-blur-sm items-center w-full h-full lg:bg-opacity-10 bg-opacity-75 bg-black`}>
        <div className='flex flex-col justify-center items-center w-92 lg:w-[50vw] h-auto bg-primary rounded-sm p-2 space-y-1'>
        <div className='text-lg lg:text-xl font-semibold text-white text-left  w-full'>Keranjangmu <FontAwesomeIcon size="md" icon={faShoppingCart} /></div>
        {/* {
            basketLoading&&
            <div className='text-center bg-gray-400 w-full px-2 py-1 flex space-x-2 rounded-sm h-14 items-center animate-pulse'>
                <div className='w-48 h-8 rounded-md animate-pulse bg-gray-500'></div>
                <div className='w-48 h-8 rounded-md animate-pulse bg-gray-500'></div>
                <div className='w-48 h-8 rounded-md animate-pulse bg-gray-500'></div>
            </div>
            
        } */}
        {
            (basket.length>0)?
            basket&&basket.map(val => 
                <div className='flex space-x-2 lg:space-x-10 bg-white w-full rounded-sm p-2 lg:p-3 ' key={val.id}>
                    <div className='select-none line-clamp-1 text-black font-semibold text-md lg:text-lg w-48'>{val.product_name}</div>
                    <div className='w-10'>
                        <div className='flex space-x-2 text-black text-md lg:text-lg'>
                        <div onClick={()=> dispatch(decrementProductQty(val.id))} className='select-none bg-white cursor-pointer text-black font-semibold text-md lg:text-lg'>-</div>
                        <div className='select-none text-black font-semibold text-md lg:text-lg'>{val.quantity}</div>
                        <div onClick={()=> dispatch(incrementProductQty(val.id))} className='select-none bg-white cursor-pointer text-black font-semibold text-md lg:text-lg' >+</div>
                        <div/>
                    </div>
                    </div>
                    {/* <div className='select-none flex text-black font-bold text-md lg:text-base w-24'>Rp.
                    {
                        token?(val.grosir_min===val.quantity | val.quantity>val.grosir_min)?<div className='text-green-700'>{val.fixprice*val.quantity}</div>:<div>{val.fixprice*val.quantity}</div>:<div>{val.fixprice*val.quantity}</div>
                    }
                    </div> */}
                    <div className='text-red cursor-pointer hover:text-rose-600' onClick={()=> dispatch(deleteItem(val.id))}><FontAwesomeIcon icon={faTrash} /></div>
                </div>                
            )
            :<div className='text-lg lg:text-xl font-semibold text-gray-300'>Belum ada barang di keranjangmu</div>
        }
        {
            basket.length>0?<div className='text-xs text-white flex left-0'>(nominal berwarna hijau mendapatkan harga grosir)</div>:null
        }
        <div className='flex space-x-2 lg:space-x-4 justify-end right-10 w-full p-1 lg:p-2'>
            <div className='text-white font-semibold text-md lg:text-lg'>Total</div>
            <div className='select-none text-white font-bold text-md lg:text-lg'>Rp. {
                        basket&&basket.reduce((sum,item)=>{
                            return sum + (item.quantity * item.fixprice)
                        },0)
                    }</div>
        </div>

          
        <div className='w-full text-right p-2 space-x-2'>
            <button className='bg-amber-400 text-white font-bold  p-1 rounded-md lg:p-2' onClick={()=>{
                navigate('/checkout')
                showCart()
                }}>Checkout</button>
            <button className='bg-red text-white font-bold  p-1 rounded-md lg:p-2' onClick={showCart}>Close</button>
        </div>
        </div>
    </div>
  )
}

export default Cart