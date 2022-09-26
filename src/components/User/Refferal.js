import React, { useEffect, useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getSellers} from '../../features/sellers/sellersSlice';
import {acceptRef,deleteRef} from '../../features/users/usersSlice'
function Refferal({auth}) {
    const dispatch = useDispatch()
    const [search,setsearch] = useState('')
    const {sellers,sellersLoading} = useSelector(state => state.sellers);
    useEffect(()=>{
        dispatch(getSellers())
    },[])
  return (
    <div className={`'flex-col space-y-2 z-10 '`}>
        <div className="flex space-x-2 items-center">
            <input className='border border-violet-400 py-1 px-2 rounded-xl' type="text" placeholder='Search... ' value={search} onChange={(e)=> setsearch(e.target.value)} />
            <p className="text-gray-600">{sellers.filter(val=> val.kode_ref===auth.status).filter(val=> val.nama_lengkap.toLowerCase().includes(search.toLowerCase())).length} Members</p>
        </div>
        <table className='w-full text-left'>
            <thead className='flex lg:w-full w-[93vw] bg-slate-400 overflow-x-auto'>
                <tr className='flex w-full justify-center  '>
                    <th className='text-black w-[30%]'>Nama</th>
                    {/* <th className='text-black w-[35%]'>Email</th> */}
                    <th className='text-black w-[40%]'>WhatsApp</th>
                    <th className='text-black w-[20%]'>Status</th>
                    <th className='text-black w-[20%]' >Actions</th>
                </tr>
            </thead>
            <tbody className='overflow-x-auto lg:overflow-y-scroll w-full h-[50vh] flex flex-col'>
                
                {
                    sellersLoading?<tr><td colSpan='5' className='text-center'>Loading...</td></tr>:
                    sellers.filter(val => val.kode_ref===auth?.status).filter(val=> val.nama_lengkap.toLowerCase().includes(search.toLowerCase())).map((seller,index)=>{
                        const wea = seller.wa.split('')
                        if(wea[0]==='0') wea[0]='62'
                        if(wea[0]==='+') wea[0]=''
                        const whatsapp=wea.toString().replace(/,/g,"")
                        return seller.length===0?<tr><td colSpan='5' className='text-center'>Tidak ada data</td></tr>:
                         <tr key={index} className="flex w-screen lg:w-full justify-center space-x-2">
                            <td className='w-[30%] '>{seller.nama_lengkap}</td>
                            {/* <td className='w-[35%]'>{seller.email}</td> */}
                            <td className='w-[40%] hover:text-blue-500' onClick={()=> {
                            const newTab = window.open(`https://api.whatsapp.com/send?phone=${whatsapp}`, '_blank', 'noopener,noreferrer')
                            if (newTab) newTab.opener = null
                            }}>{whatsapp}</td>
                            <td className='w-[20%] '>{seller.status}</td>
                            <td className='w-[20%] space-x-1'>
                                {(seller.verification==1)?<button onClick={()=>dispatch(deleteRef(seller.id))} className='px-2 py-1 rounded-lg border-rose-500 bg-rose-200 hover:text-white text-rose-600 border hover:bg-rose-500'>Delete</button>:<><button onClick={()=>dispatch(acceptRef(seller.id))} className='px-2 py-1 rounded-lg border-green-500 bg-green-200 hover:text-white text-green-600 border hover:bg-green-500'>Accept</button>
                                <button onClick={()=>dispatch(deleteRef(seller.id))} className='px-2 py-1 rounded-lg border-rose-500 bg-rose-200 hover:text-white text-rose-600 border hover:bg-rose-500'>Delete</button></>}
                                
                            </td>
                        </tr>
                    })
                }
            </tbody>
        </table>
    </div>
  )
}

export default Refferal