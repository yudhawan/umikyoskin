import {useState,useEffect} from 'react';
import {FontAwesomeIcon}  from '@fortawesome/react-fontawesome';
import {faInstagram,faShopify, faWhatsapp} from "@fortawesome/free-brands-svg-icons";
import {faMap} from '@fortawesome/free-solid-svg-icons';
import {faIdBadge} from '@fortawesome/free-regular-svg-icons';
import Logo from '../components/logo.png'
import {useDispatch,useSelector} from 'react-redux';
import {getSellers} from '../features/sellers/sellersSlice';
function Sellers() {
  const dispatch = useDispatch();
  const {sellers,sellersLoading} = useSelector(state => state.sellers);
  const [wilayah, setwilayah] = useState('')
  const [id, setid] = useState('')
  useEffect(()=>{
    dispatch(getSellers())
  },[])
 
  return (
    <div>
      {/* panel search */}
      <div className='p-2 flex space-x-3 justify-center items-center'>
        <div className='flex p-1 items-center space-x-1 w-48 lg:w-60 border-gray-500 text-gray-500 border rounded-md'><FontAwesomeIcon icon={faMap} /><input className='outline-none w-full' type="text" placeholder='Search Location...' value={wilayah} onChange={(e)=>setwilayah(e.target.value)} /></div>
        <div className='flex p-1 items-center space-x-1 w-48 lg:w-60 border-gray-500 text-gray-500 border rounded-md'>
          <FontAwesomeIcon icon={faIdBadge} />
          <select value={id} onChange={(e)=>setid(e.target.value)} className='w-full outline-none'>
            <option value="">Pilih ID</option>
            <option value="RNV">Reseller</option>
            <option value="ANV">Agen</option>
            <option value="DS">Distributor</option>
            <option value="DVIP">Distributor VIP</option>
          </select>
        </div>
        {/* <div className='flex p-1 items-center space-x-1 w-48 lg:w-60 border-gray-500 text-gray-500 border rounded-md'><FontAwesomeIcon icon={faIdBadge} /><input className='outline-none w-full' type="text" placeholder='Search by ID...' value={id} onChange={(e)=>setid(e.target.value)} /></div> */}
      </div>
      {/* --/-- */}
      <div className={'flex flex-wrap mt-1 justify-center w-full items-center'}>
        {
          sellers.filter(val => val.kota.toLowerCase().includes(wilayah.toLocaleLowerCase())).filter(value => value.status.toUpperCase().includes(id.toUpperCase())).map((seller,index)=>{
            let status = (seller.status.includes('RNV'))?'RESELLER':(seller.status.includes('ANV'))?'AGEN':(seller.status.includes('DS'))?'DISTRIBUTOR':'DISTRIBUTOR VIP';
          const wea = seller.wa.split('')
          if(wea[0]==='0') wea[0]='62'
          if(wea[0]==='+') wea[0]=''
          const whatsapp=wea.toString().replace(/,/g,"")
          const instagram = seller.ig.includes('://')?seller.ig:`https://www.instagram.com/${seller.ig}`
          const shoope = seller.shoope.includes('://')?seller.shoope:`https://shopee.co.id/${seller.shoope}`
          return(
          <div className='shadow-lg my-2 mx-2 rounded-md flex space-y-1 w-72 h-64' key={index}>
            <div className='flex flex-col h-full space-y-2 ml-1'>
              <div className='flex'>
                <div className='w-8 h-16 left-0 bg-logobg rounded-b-xl'></div>
                <div className='flex-col space-x-1 mt-3'>
                  <div className='text-logobg text-base font-semibold ml-1 w-full'>{status}</div>
                  <div className='text-logobg text-xs w-full '>{seller.kota}</div>
                </div>
              </div>
              {/* sosmed */}
              <div className='flex-col text-center justify-center text-logobg space-y-2'>
                <div className='cursor-pointer flex space-x-1' onClick={()=> {
                      const newTab = window.open(instagram, '_blank', 'noopener,noreferrer')
                      if (newTab) newTab.opener = null
                  }}>
                  <div className='border-logobg border-2 w-8 h-8 rounded-full pt-1'><FontAwesomeIcon icon={faInstagram} /></div>
                  <div className='text-black text-sm w-24 text-left line-clamp-1 p-1 font-semibold'>{seller.ig}</div>
                </div>
                <div className='cursor-pointer flex space-x-1' onClick={()=> {
                      const newTab = window.open(`https://api.whatsapp.com/send?phone=${whatsapp}`, '_blank', 'noopener,noreferrer')
                      if (newTab) newTab.opener = null
                  }}>
                  <div className='border-logobg border-2 w-8 h-8 rounded-full pt-1'><FontAwesomeIcon icon={faWhatsapp} /></div>
                  <div className='text-black text-sm w-24 text-left line-clamp-1 p-1 font-semibold'>{seller.wa}</div>
                </div>
                <div className='cursor-pointer flex space-x-1' onClick={()=> {
                      const newTab = window.open(shoope, '_blank', 'noopener,noreferrer')
                      if (newTab) newTab.opener = null
                  }}>
                  <div className='border-logobg border-2 w-8 h-8 rounded-full pt-1'><FontAwesomeIcon icon={faShopify} /></div>
                  <div className='text-black text-sm w-24 text-left line-clamp-1 p-1 font-semibold'>{seller.shoope}</div>
                </div>
              </div>
              {/* --/-- */}
              <div className='w-8 h-16 left-0 bg-logobg rounded-t-xl'></div>
            </div>

            <div className='flex flex-col '>
              <div className='flex w-full'>
                <div className='shrink w-28'></div>
                <img src={Logo} className='w-10 h-10 mt-3 mr-4' />
              </div>
              <div className='flex p-1 space-x-8 py-6 justify-end'>
                <div className='flex-col'>
                    <div className='border-logobg border-2 w-24 h-28 mt-1 rounded-sm'>
                        <img src={seller.picture?'https://beautyshop.yashacode.com/users/img/'+seller.picture:'https://via.placeholder.com/150.png?text=umikyo'} className='w-full h-full' />
                    </div>
                    <div className='text-black text-md font-semibold line-clamp-1'>{seller.nama_lengkap}</div>
                    <div className='text-black text-sm font-semibold'>{(seller.status.includes('DS') | seller.status.includes('DVIP'))?seller.status+'-'+seller.kode_ref:seller.kode_ref+'-'+seller.status}</div>
                  </div>
              </div>
            </div>
            
          </div>
          )})
        }  
      </div>
      <div className={'flex flex-wrap mt-1 justify-center w-full items-center'}>
        {
          sellersLoading&&
          [1,2,3,4,5,6].map(val=>
            <div className='shadow-lg my-2 mx-2 rounded-md flex space-y-1 w-72 h-64 animate-pulse justify-center' key={val}>
              <div className='flex space-x-10 items-center'>
                <div className='flex-col space-y-2'>
                  <div className='w-24 h-4 bg-gray-300'></div>
                  <div className='w-24 h-4 bg-gray-300'></div>
                  <div className='w-24 h-4 bg-gray-300'></div>
                </div>
                <div className='flex-col space-y-2'>
                  <div className='flex space-x-1 w-24 h-24 bg-gray-300'></div>
                  <div className='w-20 h-4 bg-gray-300'></div>
                  <div className='w-16 h-4 bg-gray-300'></div>
                </div>
              </div>
            </div>
            )
        }
      </div>
    </div>
  );
}

export default Sellers;
