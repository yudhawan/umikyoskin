import {useNavigate} from 'react-router-dom'
function Categories({category,id}) {
  const navigate = useNavigate()
  return (
    <div key={id} className={'p-2 h-auto cursor-pointer'} onClick={()=>navigate('/products/'+category)}>
        <div className={'bg-white w-auto cursor-pointer h-auto p-2 rounded-lg shadow-md  text-center'}>
            <div className={'text-sm text-bold'}>{category}</div>
        </div>
    </div>
  )
}

export default Categories