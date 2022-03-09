import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faReceipt,faTruck,faCompass} from '@fortawesome/free-solid-svg-icons';
import {useState, useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux';
import {cekInvoice,paymentConfirmation} from '../features/orderSlice'
function Confirmation() {
  const dispatch = useDispatch();
  const {order,orderLoading,error} = useSelector(state => state.orders);
  const [bukti, setBukti] = useState()
  const [img, setImg] = useState(()=>{
    return bukti?img:''
  })
  const [inv, setinv] = useState('')
  const [validation,setValidation] = useState('')
  function handleImage(e){
    const file = e.target.files[0]
    const img = URL.createObjectURL(file)
    setBukti(file)
    setImg(img)
  }
  function cekInv(e){
    e.preventDefault()
    if(inv==='') return setValidation('Isi invoice terlebih dahulu')
    if(inv.length < 12) return setValidation('Invalid Data')
    return dispatch(cekInvoice(inv))
  }
  function cekUpload(){
    console.log(bukti)
    if(typeof bukti==='undefined') return setValidation('upload bukti pembayaran terlebih dahulu')
    return dispatch(paymentConfirmation(bukti))
  }
  // useEffect(()=>{
  //   if (typeof bukti==='undefined') setImg('')
  // },[getinv])
  return (
    <div className='flex flex-col text-center items-center justify-center space-y-2 w-full h-auto'>
      <div className='text-3xl'>Masukan Invoice Anda</div>
      <div className='flex justify-center items-center w-96 h-10 p-2 text-gray-500 space-x-1 border-2 border-gray-500 p-2 rounded-md'>
        <FontAwesomeIcon icon={faReceipt} />
        <input className=' outline-none w-full' type='text' placeholder='Invoice...' value={inv} onChange={(e)=> setinv(e.target.value)} />
      </div>
      <button className='bg-green-600 text-white px-6 py-2 rounded-lg' onClick={cekInv}>Cek</button>
      {validation&&
        <div className='flex flex-col w-full justify-center items-center space-y-2 p-4 h-auto border-orange-500 border-2 rounded-md divide-y divide-solid'>
          <div className='bg-rose-700 rounded-lg px-4 py-2 text-2xl font-semibold text-white'>{validation}</div>
        </div>
      }
      {
        orderLoading&&
        <div className='flex w-full justify-center items-center space-y-2 p-4 h-auto border-orange-500 border-2 rounded-md divide-y divide-solid'>
          <div className='bg-rose-700 rounded-lg px-4 py-2 text-2xl font-semibold text-white flex space-x-1'>
            <div>Loading...</div>
            <div className='animate-spin justify-center flex items-center'><FontAwesomeIcon icon={faCompass} /></div>
          </div>
          
        </div>
      }
      {
        order&&(order.status==='amount')&&
        <div className='flex flex-col w-full justify-center items-center space-y-2 p-4 h-auto border-orange-500 border-2 rounded-md divide-y divide-solid'>
          <div className='font-bold text-4xl'>Rp. {order.total+order.ongkir}</div>
          <div>
            <div className='text-lg font-semibold'>Silahkan lakukan pembayaran sejumlah nilai di atas ke nomor rekening berikut</div>
            <div className='text-base font-semibold'>*biaya diatas sudah termasuk biaya pengiriman</div>
          </div>
          <div >
            <div className='text-xl font-semibold'>Upload Bukti Pembayaran</div>
            <div className='border border-gray-500 p-2 rounded-sm w-auto'>
              <input type="file" name="image" onChange={handleImage} accept="image/*" />
            </div>
            <button className='bg-orange-500 px-2 py-1 rounded-md text-white text-lg mt-1' onClick={cekUpload}>Upload</button>
          </div>
          {
            img&&
            <>
            <div className='w-48 h-60 rounded-sm'>
              <img src={img} className='w-full h-full' />
            </div>
            <button className='bg-orange-600 px-4 py-2 text-white rounded-md' onClick={cekUpload}>Upload</button>
            <div className='flex space-x-4'>
              <div className='flex flex-col justify-center items-center'>
                <img className='w-14 h-10' src="https://rekreartive.com/wp-content/uploads/2019/04/Logo-BRI-Bank-Rakyat-Indonesia-PNG-Terbaru-1140x973.png"/>
                <div>217001009195500</div>
              </div>
              <div className='flex flex-col justify-center items-center'>
                <img className='w-14 h-10' src="https://www.freepnglogos.com/uploads/logo-bca-png/bank-central-asia-logo-bank-central-asia-bca-format-cdr-png-gudril-1.png"/>
                <div>6670363374</div>
              </div>
            </div>
            </>
          }
        </div>
      }
      {
        order&&(order.status==='payed')&&
        <div className='flex flex-col w-full justify-center items-center space-y-2 p-4 h-auto border-orange-500 border-2 rounded-md divide-y divide-solid'>
          <div>
            <div className='text-lg font-semibold'>Harap Tunggu...</div>
            <div className='text-lg font-semibold'>Pesanan Sedang di Proses</div>
            <div className='text-base font-semibold'>*status ini sewaktu-waktu bisa berubah apabila anda mengupload bukti pembayaran yang salah</div>
          </div>
        </div>
      }
      {
        order&&(order.status==='queue')&&
        <div className='flex flex-col w-full justify-center items-center space-y-2 p-4 h-auto border-orange-500 border-2 rounded-md divide-y divide-solid'>
          <div>
            <div className='text-lg font-semibold'>Pesanan anda dalam antrian, cek secara berkala di laman ini, admin sedang biaya kesuluruhan pesanan anda, proses ini membutuhkan waktu tidak lebih dari 30 menit</div>
            <div className='text-base font-base'>*Admin akan mencarikan kurir dengan biaya pengiriman yang terjangkau</div>
          </div>
        </div>
      }
      {
        order&&(order.status==='dispatch')&&
        <div className='flex flex-col w-full justify-center items-center space-y-2 p-4 h-auto border-orange-500 border-2 rounded-md divide-y divide-solid'>
          <div>
            <FontAwesomeIcon icon={faTruck} size={'4x'} className='text-gray-500' />
            <div className='text-base font-semibold'>Pesanan Anda Dalam Antrian untuk Dikirim</div>
          </div>
        </div>
      }
      {
        error&&
        <div className='flex flex-col w-full justify-center items-center space-y-2 p-4 h-auto border-orange-500 border-2 rounded-md divide-y divide-solid'>
          <div className='bg-rose-700 rounded-lg px-4 py-2 text-2xl font-semibold text-white'>Data dengan nomor Invoice tersebut Tidak Ditemukan</div>
        </div>
      }
      
    </div>);
}

export default Confirmation;
