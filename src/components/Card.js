import { useNavigate } from 'react-router-dom'
function Card ({ item }) {

  // const handleAddToOrderList = () => {
  //   addToOrderList(item)
  // }

  // const handleRemoveFromOrderList = () => {
  //   removeFromOrderList(item)
  // }

  const navigate = useNavigate()
  return (

<div className="flex justify-between shadow-cardShadow max-h-28 p-2 rounded-lg" onClick={() => navigate(`/item/${item.name}`)}>

  <div className="flex flex-col justify-between">
    <p>{item.name}</p>
    <p>150 THB</p>
  </div>

  <div className="w-2/5 min-w-36 h-26 overflow-hidden">
    <img
      className="w-full h-full object-cover rounded-lg"
      src={require(`../images/${item.img}`)}
      alt=""
    />
  </div>
</div>

    // <div className="border border-green-200 w-auto hover:bg-green-100 transition cursor-pointer rounded-lg flex flex-col justify-between items-center p-3 items-center">
    //   <img className="rounded overflow-hidden object-cover w-40 h-40" src={require(`../images/${item.img}`)}></img>
    //   <p className="w-40 text-md text-center mt-3">{item.name}</p>
    //   <p className="mt-2 mb-2 text-xs italic text-center border-t w-40 border-b border-green-200">{item.ingredients}</p>
    //   <p className="text-xs">{item.price} Руб.</p>

    //   <div className=" flex gap-2 text-xs items-center mt-3">
    //     <p className="bg-red-500 w-4 h-4 text-center rounded cursor-pointer" onClick={handleRemoveFromOrderList}>-</p>
    //     <p>{amount}</p>
    //     <p className="bg-green-500 w-4 h-4 text-center rounded cursor-pointer" onClick={handleAddToOrderList}>+</p>
    //   </div>
    // </div>
  )
}

export default Card