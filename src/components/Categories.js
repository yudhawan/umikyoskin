function Categories({category,sub,id}) {
  return (
    <div key={id} className={'p-2 h-auto'}>
        <div className={'bg-white -auto cursor-pointer h-auto p-2 rounded-lg shadow-md  text-center'}>
            <div className={'text-sm text-bold'}>{category}</div>
        </div>
    </div>
  )
}

export default Categories