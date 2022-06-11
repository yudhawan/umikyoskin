import {FontAwesomeIcon}  from '@fortawesome/react-fontawesome';
import {faBox, faTrash} from '@fortawesome/free-solid-svg-icons';
import {getBasket, deleteItem,incrementProductQty,decrementProductQty} from '../features/cartSlice'
import {makeOrder} from '../features/orderSlice'
import {useDispatch,useSelector} from 'react-redux'
import { useEffect, useState } from 'react'
function Checkout() {
    const dispatch = useDispatch()
    const {basket,basketLoading} = useSelector(state => state.carts)
    const {invoice} = useSelector(state => state.orders)
    const [info,setinfo] = useState({
        nama:'',
        alamat:'',
        wa:'',
        note:''
    })
    const [validation,setvalidation] = useState('')
    function cek(){
        if(info.nama==='' || info.nama===null) return setvalidation("Isi Nama Anda")
        if(info.alamat==='' || info.alamat===null) return setvalidation("Isi Alamat Anda")
        if(info.wa==='' || info.wa===null) return setvalidation("Isi Nomor WA Anda")
        setvalidation('')
        dispatch(makeOrder({nama:info.nama, alamat:info.alamat, wa: info.wa, cart: basket, note:info.note}))
    }
    const token = 'osd8ej893j8j8j8j8j8j'
    useEffect(() => {
        dispatch(getBasket())
    },[])
    if(invoice){
        return(
            <div className='flex flex-col w-full space-y-2'>
                <div className='bg-green-100 p-5 rounded-md space-y-1 border border-gray-200'>
                    <div className='flex rounded-md bg-gray-200 w-60 h-full p-2 border border-gray-600 items-center'><input id="invoice" disabled value={invoice} className="w-full outline-none bg-gray-200 text-center text-xl font-semibold" /></div>
                    <button className='bg-orange-600 text-white text-lg font-base px-3 py-1 rounded-md active:bg-gray-600' onClick={(e)=>{
                                let invoice = document.getElementById("invoice")
                                invoice.select()
                                invoice.setSelectionRange(0,99999)
                                navigator.clipboard.writeText(invoice.value)
                            }}>Copy Invoice</button>
                </div>
                <div className='bg-gray-100 p-2 rounded-md border border-gray-200'>
                    <p>Jangan melakukan pembayaran terlebih dahulu sebelum mendapatkan pesan di WhatsApp anda mengenai total harga yang harus di transfer beserta biaya kirimnya, untuk memantau status pesanan anda saat ini silahkan masuk ke menu <b>Konfirmasi</b>, kemudian masukan invoice anda, Terimakasih :D</p>
                </div>
            </div>
        )
    }
    return (
        <>
        {(basket.length>0)?<div className='flex flex-col lg:flex-row justify-center items-center lg:justify-between lg:space-x-10'>
            <div className='flex flex-col space-y-2'>
            {
                basket&&basket.map(val => 
                    
                    <div className='flex space-x-2 lg:space-x-10 bg-white w-full rounded-sm p-2 lg:p-3 border border-gray-400' key={val.id}>
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
                            token?(val.grosir_min===val.quantity | val.quantity>val.grosir_min)?<div className='text-green-700'>{val.grosir_price*val.quantity}</div>:val.price*val.quantity:val.price*val.quantity
                        }
                        </div> */}
                        <div className='text-red cursor-pointer hover:text-rose-600' onClick={()=> dispatch(deleteItem(val.id))}><FontAwesomeIcon icon={faTrash} /></div>
                    </div>
                    
                )
                
            }
            <div className='border border-gray-400 bg-gray-200 rounded-sm justify-between p-3 flex'>
                <div className='text-xl font-semibold'>Total</div>
                {/* <div className='select-none text-xl font-semibold'>Rp. {
                            basket&&basket.reduce((sum,item)=>{
                                return sum + (item.quantity * item.fixprice)
                            },0)
                        }
                </div> */}
            </div>
            <div className='flex flex-col'>
                <div className='border border-gray-400 bg-blue-200 rounded-sm w-full text-center py-3 px-3'>
                    <div className='text-blue-800 font-semibold text-xl flex justify-between'>Catatan</div>
                </div>
                <div className='border border-gray-400 rounded-sm p-2'><textarea value={info.note} className='outline-none w-full' onChange={(e)=> setinfo({...info, note:e.target.value})} placeholder="type something here...." /></div>
            </div>
            </div>
            

            <div className='flex flex-col w-full sm:w-96 sm:mt-5 sm:mb-3 lg:w-[80vh]'>
                <div className='border border-gray-400 bg-blue-200 rounded-sm w-full text-center py-3 px-3'>
                    <div className='text-blue-800 font-semibold text-xl flex justify-between'>
                        <div>Penting !</div>
                    </div>
                </div>
                <div className={` border border-gray-400 bg-gray-200 p-3`}>
                    <p>Setelah melakukan Pesanan segera masukan invoice ke menu Konfirmasi untuk mengetahui step berikutnya. Pastikan pesanan, nama, alamat dan nomor yang bisa dihubungi sudah benar.</p>
                </div>
                <div className='mt-1 flex-col space-y-1'>
                    <div className='border border-gray-400 rounded-sm p-2'><input required type='text' value={info.nama} className='outline-none w-full' placeholder="Nama" onChange={(e)=> setinfo({...info, nama:e.target.value})} /></div>
                    <div className='border border-gray-400 rounded-sm p-2'><textarea required value={info.alamat} className='outline-none w-full' onChange={(e)=> setinfo({...info, alamat:e.target.value})} placeholder="Alamat Lengkap" /></div>
                    <div className='border border-gray-400 rounded-sm p-2'><input required type='number' value={info.wa} className='outline-none w-full' placeholder="WhatsApp" onChange={(e)=> setinfo({...info, wa:e.target.value})} /></div>
                </div>
                {validation&&<div className='bg-rose-700 mt-1 text-white font-semibold text-xl rounded-sm text-center'>{validation}</div>}
                <button className='mt-2 py-1 px-3 bg-orange-500 text-xl font-semibold' onClick={cek}>Make Order</button>
            </div>
        </div>
        :<div className='flex flex-col justify-center items-center space-y-5'>
            <div className='text-lg lg:text-3xl font-semibold text-gray-400 '>Belum ada barang di keranjangmu</div>
            <div className='text-gray-400'><FontAwesomeIcon icon={faBox} size={'4x'} /></div>
        </div>
        }
        </>
    )
}

export default Checkout