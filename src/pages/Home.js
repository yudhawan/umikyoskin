import { useEffect } from 'react';
import {getbanners,getTestimony} from '../features/categories/categoriesSlice'
import Products from '../components/Products';
import { getProducts } from '../features/products/productsSlice';
import {FontAwesomeIcon}  from '@fortawesome/react-fontawesome';
import {faCompass,faCommentDots} from '@fortawesome/free-solid-svg-icons';
import {useSelector, useDispatch} from 'react-redux'
import {host} from '../features/host'
function Home() {
  const dispatch = useDispatch()
  const {banners,bannersLoading,testimony} = useSelector(state => state.categories)
  const {products,productsLoading} = useSelector(state => state.products)
  useEffect(()=>{
    dispatch(getbanners())
    dispatch(getProducts())
    dispatch(getTestimony())
  },[])
  
  return (
    <div className='flex flex-col justify-center items-center lg:-mt-4 space-y-2 lg:space-y-4'>
      <div className='w-96 justify-center items-center flex flex-col'>
        {
          bannersLoading?
            <div className='w-96 h-60 lg:w-[84vw] lg:h-[66vh] flex lg:pt-0 bg-gray-300 animate-pulse'>
            </div>
          :
          <div className='relative z-0 w-full md:w-[80vw] lg:w-[84vw]'>
            <div className='relative z-0 w-full md:w-[80vw] lg:w-[84vw]'>
              {/* image */}
              <img src={host+`/banner/img/${banners[0]?.name}`} className={`w-full h-full lg:pt-0 bg-no-repeat bg-contain select-none`}/>
              {/* link */}
              <div style={{backgroundColor:banners[0]?.bg, color:banners[0]?.text}} className={`absolute px-1 lg:px-2 rounded-sm lg:rounded-lg  top-0  ${(banners[0]?.position==='left')?'left-0 ml-8':(banners[0]?.position==='right')?'right-0 mr-8':(banners[0]?.position==='center')?'right-0 mr-14':''} mt-[12vh] md:mt-[30vh] lg:ml-16 lg:mt-[44vh] cursor-pointer line-clamp-1 text-sm w-20 lg:w-60 lg:font-semibold `} onClick={()=> window.location.href=banners[0]?.link}>{banners[0]?.alt}</div>
            </div>
          </div>
        }
      </div>
      <div className='border-y w-full py-2 flex justify-center ml-2 items-center'>
        <div className='flex justify-center items-center text-blue-600 p-1 w-8 h-8'><FontAwesomeIcon icon={faCompass} className="w-full h-full"/></div>
        <div className='text-blue-600 text-2xl font-semibold'>Explore Products</div>
      </div>
      <div className={'flex flex-wrap mt-1 justify-center items-center'}>
        {
          productsLoading?
          [1,2,3,4,5,6].map(val => 
          <div key={val} className='shadow-lg my-2 mx-2 rounded-md flex flex-col space-y-1 w-36 lg:w-44 h-auto animate-pulse'>
              <div className=' w-36 h-36 lg:w-[11rem] lg:h-[11rem] flex justify-center items-center rounded-sm bg-gray-300'></div>
              <div className='text-left p-1'>
                  <div className='text-md rounded-sm w-28 h-4 m-1 bg-gray-300'></div>
                  <div className='text-sm rounded-sm w-32 h-4 m-1 bg-gray-300 '></div>
              </div>
              <div className=' p-1 line-clamp-1 font-medium text-left rounded-sm w-28 h-4 bg-gray-300'></div>    
          </div>)
          :products.map(({id,product_name,stock,price,category,sub,images,description,grosir_min,grosir_price})=> <Products id={id} product_name={product_name} stock={stock} price={price} category={category} sub={sub} images={images} description={description} grosir_min={grosir_min} grosir_price={grosir_price} />)
          
        }
        
      </div>
      <div className='border-y w-full py-2 flex justify-center ml-2 items-center'>
        <div className='flex justify-center items-center text-blue-600 p-1 w-8 h-8'><FontAwesomeIcon icon={faCommentDots} className="w-full h-full"/></div>
        <div className='text-blue-600 text-2xl font-semibold'>Testimony</div>
      </div>
      <div className='flex flex-wrap gap-4 justify-center items-center'>
        {
          testimony?.map((val,index)=>
            <div className='flex justify-center w-40 h-40 lg:w-60 lg:h-60 border-2 rounded-sm border-primary ' key={index}>
              <img src={host+'/banner/img/'+val.img} className="w-full h-full" />
            </div>
          )
        }
      </div>
    </div>
  );
}

export default Home;
