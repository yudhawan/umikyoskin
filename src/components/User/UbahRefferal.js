import React, { useEffect, useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getSellers} from '../../features/sellers/sellersSlice';
function UbahRefferal({auth}) {
    const dispatch = useDispatch()
    const [ref,setref] =useState(auth?.kode_ref)
    useEffect(()=>{
        dispatch(getSellers())
    },[])
  return (
    <div className={`'flex z-10 '`}>
        <div className='flex-col mx-2 my-2'>
            <div className='text-base font-semibold'>Kode Refferal</div>
            <div className='rounded-sm border border-gray-300 p-1 w-56'><input type="text" value={ref} onChange={(e)=> setref(e.target.value.toUpperCase())} className="outline-none w-full" /></div>
        </div>
        <button className='py-1 px-2 bg-green-600 text-white rounded-md mt-2'>Save</button>
    </div>
  )
}

export default UbahRefferal