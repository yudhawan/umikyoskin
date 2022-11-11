import {useParams,useNavigate} from 'react-router-dom'
import {getProducts} from '../features/products/productsSlice'
import {addProductToCart} from '../features/cartSlice'
import {useDispatch,useSelector} from 'react-redux'
import { useEffect } from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCartPlus} from '@fortawesome/free-solid-svg-icons'
import {host} from '../features/host'
function DetailProduct() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {cartLoading}= useSelector(state => state.carts)
  const {products, productsLoading} = useSelector(state => state.products)
  const {product} = useParams()
  useEffect(()=>{
    dispatch(getProducts())
  },[])
  return (
    <div className='w-full flex justify-center items-center'>
      {products&&products.filter(val => val.product_name==product).map(({id,product_name,stock,price,category,sub,images,description,grosir_min,grosir_price})=>{
        const img = images.split(',')[0]
        return(
          <div className='flex flex-col space-y-2 justify-center items-center'>
            <div className='w-96 h-60 lg:w-[60vw] lg:h-[60vh] lg:pt-0 border-b border-gray-300 p-2'>
              <img src={host+'/products/img/'+img} alt={product_name} className='w-full h-full' />
            </div>
            <div className='flex w-full'>
              <div className='flex flex-col'>
                <div className='text-2xl font-medium line-clamp-1'>{product_name}</div>
                <div className='flex w-full space-x-52'>
                  <div>
                    <div className='text-xl font-semibold'>RP. {price}</div>
                    <div className='text-gray-400'>Stock {stock}</div>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <div className='bg-green-700 p-1 border rounded-md text-white font-semibold text-sm lg:text-md cursor-pointer' onClick={()=>{
                      dispatch(addProductToCart({id:id,stock:stock}))
                      navigate('/checkout')
                    }}>Buy</div>
                    <div className='bg-amber-500 border rounded-md font-semibold text-md lg:text-lg px-1 cursor-pointer items-center' onClick={()=>dispatch(addProductToCart({id:id, stock:stock}))} >{cartLoading?<div className='animate-spin'>u</div>:<FontAwesomeIcon icon={faCartPlus} size={'lg'} />}</div>
                  </div>
                </div>
                {true&&<div className='text-sm text-green-700 font-semibold'>RP. {price} (Grosir)</div>}
                <div className='w-full'>
                  <div className='text-xl font-semibold'>Description :</div>
                  <div className='text-sm'>{description}</div>
                </div>

              </div>
            </div>
          </div>
        )
      })}
      {/* {product} */}
    </div>
  )
}

export default DetailProduct