import {useEffect,useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {FontAwesomeIcon}  from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import Categories from '../components/Categories'
import Products from '../components/Products';
import { getProducts } from '../features/products/productsSlice';
import { getCategories } from '../features/categories/categoriesSlice';
function AllProducts() {
  const dispatch = useDispatch()
  const {products,productsLoading} = useSelector(state => state.products)
  const {categories,categoriesLoading} = useSelector(state => state.categories)
  const [search, setsearch] = useState('')
  useEffect(()=>{
    dispatch(getCategories())
    dispatch(getProducts())
  },[])
  return (
    <div>
      {/* panel search */}
      <div className='p-1 flex justify-center items-center '>
        <div className='flex p-2 items-center space-x-1 w-full border-gray-400 text-gray-400 border rounded-md'><FontAwesomeIcon icon={faSearch} /><input className='outline-none w-full' type="text" placeholder='Search Products...' value={search} onChange={(e)=>setsearch(e.target.value)} /></div>
      </div>
      {/* categories and subs */}
      <div className={'flex overflow-x-auto w-full items-center justify-center'}>
        {
        categoriesLoading?
          [1,2,3,4].map(val => 
            <div key={val} className={'p-2 h-auto'}>
            <div className={'bg-gray-300 -auto cursor-pointer animate-pulse h-auto p-2 rounded-lg shadow-md  text-center'}>
                <div className={'text-sm text-bold w-10 h-3'}></div>
            </div>
          </div>
        )       
        :categories.map(({category,sub_categories,id})=> <Categories category={category} id={id} sub={sub_categories} />
        )}
      </div>
      {/* All products */}
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
          :products.filter(val => val.product_name.toLowerCase().includes(search.toLowerCase())).map(({id,product_name,stock,price,category,sub,images,description,grosir_min,grosir_price})=> <Products id={id} product_name={product_name} stock={stock} price={price} category={category} sub={sub} images={images} description={description} grosir_min={grosir_min} grosir_price={grosir_price} search={search} />)
          
        }
        
      </div>
    </div>
  );
}

export default AllProducts;
