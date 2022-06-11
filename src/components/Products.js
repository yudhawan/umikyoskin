import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCartPlus} from '@fortawesome/free-solid-svg-icons'
import {useDispatch,useSelector} from 'react-redux'
import {addProductToCart} from '../features/cartSlice'
import {useNavigate} from 'react-router-dom'
const host = 'https://beautyshop.yashacode.com/products/img'
function Products({id,product_name,stock,price,category,sub,images,description,grosir_min,grosir_price}) {
  const navigate = useNavigate()
  const img = images.split(',')[0]
  const {cartLoading}= useSelector(state => state.carts)
  const dispatch = useDispatch()
  return (
    <div key={id} className='shadow-lg my-2 mx-2 rounded-md flex flex-col space-y-1 w-36 lg:w-44 h-auto select-none' >
        <div className=' w-36 h-36 lg:w-[11rem] lg:h-[11rem] flex justify-center items-center cursor-pointer' onClick={()=> navigate(`/products/view/${product_name}`)}>
            <img src={host+'/'+img} alt={product_name} className='w-full h-full' />
        </div>
        <div className='text-left p-1'>
            <div className='text-md font-medium line-clamp-1 cursor-pointer' onClick={()=> navigate(`/products/view/${product_name}`)}>{product_name}</div>
            <div className='text-sm text-gray-400 line-clamp-1'>{category} / {sub}</div>
        </div>
        <div className='flex w-full'>
          {/* <div className='justify-start p-1 font-medium text-sm lg:text-lg text-left w-full'>Rp.{price}</div> */}
          <div className='p-1 justify-end flex space-x-1'>
            <div className='bg-green-700 p-1 border rounded-md text-white font-semibold text-sm lg:text-md cursor-pointer' onClick={()=>{
              dispatch(addProductToCart({id:id,stock:stock}))
              navigate('/checkout')
            }}>Buy</div>
            <div className='bg-amber-500 border rounded-md font-semibold text-md lg:text-lg px-1 cursor-pointer items-center' onClick={()=>dispatch(addProductToCart({id:id, stock:stock}))} >{cartLoading?<div className='animate-spin'>u</div>:<FontAwesomeIcon icon={faCartPlus} />}</div>
          </div>
        </div>
    </div>
  )
}

export default Products