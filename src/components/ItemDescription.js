import { useState } from 'react'
import { useParams } from 'react-router-dom'
import menu from '../text/menu'

function ItemDescription ({ orderList, addToOrderList, removeFromOrderList  }) {
  const { name } = useParams()
  const category = menu.find(c => c.items.find(i => i.name === name))
  const item = category?.items.find(i => i.name === name)
  const ordersInCart = orderList.find(order => order.name === item.name)?.amount || 0;
  const [orderAmount, setOrderAmount] = useState(0)

  
  // const handleAddToOrderList = () => {
  //   addToOrderList(item)
  // }

  const handleAdd = () => {
    setOrderAmount(orderAmount + 1)
  }

  const handleDelete = () => {
    if (orderAmount > 0) {
      setOrderAmount(orderAmount - 1)
    }
  }


  const handleRemoveFromOrderList = () => {
    removeFromOrderList(item)
  }
  

  return (
    <div className='h-full relative flex  flex-col'>

      <div className='flex flex-col'>
        <div className='w-full h-80'>
          <img className='object-cover w-full h-full rounded-lg' src={require(`../images/${item.img}`)}></img>
        </div>
        <p className='text-3xl uppercase mt-3'>{item.name}</p>
        <p className='text-lg'>{item.price}</p>
        <p className='mt-3 italic'>{item.ingredients}</p>
      </div>

    <div className="flex justify-around items-center mt-5 ">

      <div className='flex gap-3 items-center'>
        <p className="bg-red-500 w-10 h-10 text-3xl text-center rounded cursor-pointer" onClick={handleDelete}>-</p>
        <p>{orderAmount}</p>
        <p className="bg-green-500 w-10 h-10 text-3xl text-center rounded cursor-pointer" onClick={handleAdd}>+</p>
      </div>
      
      <div className='pl-4 pr-4 p-2 bg-green-500 rounded-full' onClick={() => addToOrderList(item, orderAmount)}>
        <p className='text-white'>В Корзину {item.price * orderAmount} THB</p>
      </div>
    </div>
  </div>

    


    // <div className="border border-green-200 w-auto hover:bg-green-100 transition cursor-pointer rounded-lg flex flex-col justify-between items-center p-3 items-center">
    //   <img className="rounded overflow-hidden object-cover w-40 h-40" src={require(`../images/${item.img}`)}></img>
    //   <p className="w-40 text-md text-center mt-3">{item.name}</p>
    //   <p className="mt-2 mb-2 text-xs italic text-center border-t w-40 border-b border-green-200">{item.ingredients}</p>
    //   <p className="text-xs">{item.price} Руб.</p>

      // <div className=" flex gap-2 text-xs items-center mt-3">
      //   <p className="bg-red-500 w-4 h-4 text-center rounded cursor-pointer" onClick={handleRemoveFromOrderList}>-</p>
      //   <p>{amount}</p>
      //   <p className="bg-green-500 w-4 h-4 text-center rounded cursor-pointer" onClick={handleAddToOrderList}>+</p>
      // </div>
    // </div>
  )
}

export default ItemDescription