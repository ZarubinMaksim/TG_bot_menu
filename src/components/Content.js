import { useEffect, useState } from "react"
import menu from '../text/menu'
import Card from "./Card"
import Cart from "./Cart"

function Content ({ sendData, isCartOpened, guestDetails, orderList }) {
  const [currenntCategory, setCurrentCategory] = useState('')
  // const [orderList, setOrderList] = useState(JSON.parse(localStorage.getItem('orderList')) || [])

  // useEffect(() => {
  //   const savedOrderList = localStorage.getItem('orderList')
  //   if (savedOrderList) {
  //     setOrderList(JSON.parse(savedOrderList))
  //     // sendData(savedOrderList)
  //   }
  // }, [])

  // useEffect(() => {
  //   localStorage.setItem('orderList', JSON.stringify(orderList))
  //   sendData(orderList)
  // }, [orderList])

  useEffect(() => {
    if (!currenntCategory && menu.length > 0) {
      setCurrentCategory(menu[0].category) // Устанавливаем первую категорию
    }
  }, [currenntCategory])

  const handleCurrentCategory = (category) => {

    if (currenntCategory === category) {
      setCurrentCategory(currenntCategory)
    } else {
      setCurrentCategory(category)
    }
  }


  // const addToOrderList = (item) => {
  //   setOrderList(prevOrderList => {
  //     const existingItem = prevOrderList.find(orderItem => orderItem.name === item.name)

  //     if (existingItem) {
  //       return prevOrderList.map(orderItem => 
  //         orderItem.name === item.name 
  //         ? {...orderItem, amount: orderItem.amount + 1}
  //         : orderItem)
  //     } else {
  //       return [...prevOrderList, {...item, amount: 1}]
  //     }
  //   })
  // }

  // const removeFromOrderList = (item) => {
  //   setOrderList(prevOrderList => {
  //     const existingItem = prevOrderList.find(orderItem => orderItem.name === item.name)
  
  //     if (existingItem) {
  //       if (existingItem.amount > 1) {
  //         // Если количество больше 1, уменьшаем его
  //         return prevOrderList.map(orderItem => 
  //           orderItem.name === item.name 
  //           ? { ...orderItem, amount: orderItem.amount - 1 }
  //           : orderItem
  //         )
  //       } else {
  //         // Если количество 1, удаляем объект
  //         return prevOrderList.filter(orderItem => orderItem.name !== item.name)
  //       }
  //     } else {
  //       // Если объекта нет, ничего не меняем
  //       return prevOrderList
  //     }
  //   })
    
  // }



  return (
    <div className="flex flex-col">
      {isCartOpened ? (
        // <Cart data={orderList} addToOrderList={addToOrderList} removeFromOrderList={removeFromOrderList} guestDetails={guestDetails}/>
        <Cart data={orderList} guestDetails={guestDetails}/>

      ) : (
        <>        
        <div className="flex justify-between">
        {menu.map((category, index) => {
          return (
            <div className={`pb-0.5 transition ${currenntCategory === category.category ? 'border-b-4 border-green-700 font-bold' : 'opacity-70'}`} onClick={() => handleCurrentCategory(category.category)}>
              <p>{category.category}</p>
            </div>
            // <div className={`w-1/4 flex flex-col items-center gap-2 rounded hover:bg-green-100 pt-2 p-1 cursor-pointer transition ${currenntCategory === category.category ? 'bg-green-200' : ''}`} onClick={() => handleCurrentCategory(category.category)}> 
            //   <img className="rounded-full h-16 w-16 overflow-hidden object-cover" src={require(`../images/${category.img}`)}></img>
            //   <p className="text-center text-xs">{category.category}</p>
            // </div>
          )
        })}
      </div>

        {currenntCategory && (
          <div className="flex flex-col justify-around gap-4 mt-5"> 
            {menu.find((category) => category.category === currenntCategory).items.map((item, index) => {

              // const itemInOrder = orderList.find(orderItem => orderItem.name === item.name)
              // const amount = itemInOrder ? itemInOrder.amount : 0
              return (
                <Card item={item}/>
              )
            })}
          </div>
        )}
        </>

      )}

      </div>
  )
}

export default Content