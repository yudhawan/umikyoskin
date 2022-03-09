import React,{useState} from 'react'
import Card from '../components/User/Card'
import Profil from '../components/User/Profil'
import SocialMedia from '../components/User/SocialMedia'
import Pengaturan from '../components/User/Pengaturan'
import Refferal from '../components/User/Refferal'
import useAuth from '../hooks/useAuth'
function UserProfile() {
    const {auth,token} = useAuth()
    const menus =(auth?.status.includes("DS") || auth?.status.includes("DVIP"))?['Profil','Sosmed','Pengaturan','My Refferal','My ID Card']:['Profil','Sosmed','Pengaturan','My ID Card']
    const [tab,settab] = useState('Profil')
    
  return (
    <div className='flex flex-col lg:flex-row w-full space-y-2 lg:space-y-0 lg:space-x-2'>
        <div className='w-full h-auto lg:w-40 lg:h-[45vh] p-2 lg:p-3 lg:divide-y divide-solid flex lg:flex-col lg:space-y-2 rounded-sm border border-gray-400'>
            {
                menus.map((menu,index)=>{
                    return <div key={index} className={`${tab===menu?'text-black font-semibold':'text-gray-500'} lg:text-left text-center cursor-pointer hover:text-black p-2 lg:p-3`} onClick={()=>settab(menu)}>{menu}</div>
                })
            }
        </div>
        <div className='w-full h-auto lg:h-auto rounded-md border border-orange-700 py-2 px-4 relative'>
            {
                tab==='Profil'?<Profil auth={auth} token={token} />:tab==='Sosmed'?<SocialMedia auth={auth} token={token} />:tab==='Pengaturan'?<Pengaturan auth={auth} token={token} />:tab==='My Refferal'?<Refferal auth={auth} token={token} />:tab==='My ID Card'?<Card auth={auth} token={token}/>:''
            }
        </div>
    </div>
  )
}

export default UserProfile