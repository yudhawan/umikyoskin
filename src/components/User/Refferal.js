import React, { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getSellers} from '../../features/sellers/sellersSlice';
function Refferal({auth}) {
    const dispatch = useDispatch()
    const {sellers,sellersLoading} = useSelector(state => state.sellers);
    useEffect(()=>{
        dispatch(getSellers())
    },[])
  return (
    <div className={`'flex z-10 '`}>
        <table className='w-full text-left'>
            <thead className='flex lg:w-full w-[93vw] bg-slate-400 overflow-x-auto'>
                <tr className='flex w-full justify-center  '>
                    <th className='text-black w-[10%]'>No</th>
                    <th className='text-black w-[30%] '>Nama</th>
                    {/* <th className='text-black w-[35%]'>Email</th> */}
                    <th className='text-black w-[40%] '>WhatsApp</th>
                    <th className='text-black w-[20%] '>Status</th>
                </tr>
            </thead>
            <tbody className='overflow-x-auto lg:overflow-y-scroll w-full h-[50vh] flex flex-col'>
                {
                    sellersLoading?<tr><td colSpan='5' className='text-center'>Loading...</td></tr>:
                    sellers.filter(val => val.kode_ref===auth?.status).map((seller,index)=>{
                        return seller.length===0?<tr><td colSpan='5' className='text-center'>Tidak ada data</td></tr>:
                         <tr key={index} className="flex w-screen lg:w-full justify-center space-x-2">
                            <td className='w-[10%]'>{index+1}</td>
                            <td className='w-[30%] '>{seller.nama_lengkap}</td>
                            {/* <td className='w-[35%]'>{seller.email}</td> */}
                            <td className='w-[40%] '>{seller.wa}</td>
                            <td className='w-[20%] '>{seller.status}</td>
                        </tr>
                    })
                }
            </tbody>
        </table>
    </div>
  )
}

export default Refferal