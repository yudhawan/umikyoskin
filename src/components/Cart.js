import {FontAwesomeIcon}  from '@fortawesome/react-fontawesome';
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import {getBasket} from '../features/cartSlice'
import {useDispatch,useSelector} from 'react-redux'
import { useEffect,  } from 'react';
function Cart({cart, showCart}) {
    const {basket} = useSelector(state => state.carts)
    const token = 'osd8ej893j8j8j8j8j8j'
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getBasket())
    },[cart])
  return (
    <div className={`${cart?'block fixed':'hidden'} top-0 self-center flex justify-center bg-transparent backdrop-blur-sm items-center w-full h-full lg:bg-opacity-10 bg-opacity-75 bg-black`}>
        <div className='flex flex-col justify-center items-center w-92 lg:w-[50vw] h-auto bg-primary rounded-sm p-2 space-y-2'>
        <div className='text-lg lg:text-xl font-semibold text-white text-left  w-full'>Keranjangmu <FontAwesomeIcon size="md" icon={faShoppingCart} /></div>
        
        {
            (basket.length>0)?
            basket&&basket.map(val => 
                <>
                <div className='flex space-x-2 lg:space-x-6 bg-white w-full rounded-sm p-2 lg:p-3 ' key={val.id}>
                    <div className='line-clamp-1 text-black font-semibold text-md lg:text-lg w-48'>{val.product_name}</div>
                    <div className='w-10'>
                        <div className='flex space-x-1 text-black text-md lg:text-lg'>
                        <button className='bg-white text-black font-semibold text-md lg:text-lg'>-</button>
                        <div className='text-black font-semibold text-md lg:text-lg'>{val.quantity}</div>
                        <button className='bg-white text-black font-semibold text-md lg:text-lg'>+</button>
                    </div>
                    </div>
                    <div className='flex text-black font-bold text-md lg:text-base w-24'>Rp.
                    {
                        token?(val.grosir_min===val.quantity | val.quantity>val.grosir_min)?<div className='text-green-700'>{val.grosir_price*val.quantity}</div>:val.price*val.quantity:val.price*val.quantity
                    }
                    </div>
                </div>
                </>
            )
            :<div className='text-lg lg:text-xl font-semibold text-gray-300'>Belum ada barang di keranjangmu</div>
        }
        {
            basket.length>0?<div className='text-xs text-white flex left-0'>(nominal berwarna hijau mendapatkan harga grosir)</div>:null
        }
        <div className='flex space-x-2 lg:space-x-4 justify-end right-10 w-full p-1 lg:p-2'>
            <div className='text-white font-semibold text-md lg:text-lg'>Total</div>
            <div className='text-white font-bold text-md lg:text-lg'>Rp. {
                        basket&&basket.reduce((sum,item)=>{
                            return sum + (item.quantity * item.fixprice)
                        },0)
                    }</div>
        </div>

          
        <div className='w-full text-right p-2 space-x-2'>
            <button className='bg-amber-400 text-white font-bold  p-1 rounded-md lg:p-2'>Checkout</button>
            <button className='bg-red text-white font-bold  p-1 rounded-md lg:p-2' onClick={showCart}>Close</button>
        </div>
        </div>
    </div>
  )
}

export default Cart