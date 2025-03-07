import { useEffect, useState } from "react"
import menu from '../text/menu'
import Card from "./Card"
import Cart from "./Cart"

function Content ({ sendData, isCartOpened }) {
  const [currenntCategory, setCurrentCategory] = useState('')
  const [orderList, setOrderList] = useState(JSON.parse(localStorage.getItem('orderList')) ||[])

  useEffect(() => {
    const savedOrderList = localStorage.getItem('orderList')
    if (savedOrderList) {
      setOrderList(JSON.parse(savedOrderList))
      // sendData(savedOrderList)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('orderList', JSON.stringify(orderList))
    sendData(orderList)
  }, [orderList])


  const handleCurrentCategory = (category) => {

    if (currenntCategory === category) {
      setCurrentCategory(currenntCategory)
    } else {
      setCurrentCategory(category)
    }
  }



  const addToOrderList = (item) => {
    setOrderList(prevOrderList => {
      const existingItem = prevOrderList.find(orderItem => orderItem.name === item.name)

      if (existingItem) {
        return prevOrderList.map(orderItem => 
          orderItem.name === item.name 
          ? {...orderItem, amount: orderItem.amount + 1}
          : orderItem)
      } else {
        return [...prevOrderList, {...item, amount: 1}]
      }
    })

  }

  const removeFromOrderList = (item) => {
    setOrderList(prevOrderList => {
      const existingItem = prevOrderList.find(orderItem => orderItem.name === item.name)
  
      if (existingItem) {
        if (existingItem.amount > 1) {
          // Если количество больше 1, уменьшаем его
          return prevOrderList.map(orderItem => 
            orderItem.name === item.name 
            ? { ...orderItem, amount: orderItem.amount - 1 }
            : orderItem
          )
        } else {
          // Если количество 1, удаляем объект
          return prevOrderList.filter(orderItem => orderItem.name !== item.name)
        }
      } else {
        // Если объекта нет, ничего не меняем
        return prevOrderList
      }
    })
    
  }



  return (
    <div className="flex flex-col">
      {isCartOpened ? (
        <Cart data={orderList} addToOrderList={addToOrderList} removeFromOrderList={removeFromOrderList}/>
      ) : (
        <>        
        <div className="flex justify-around p-2">
        {menu.map((category, index) => {
          return (
            <div className={`w-1/4 flex flex-col items-center gap-2 rounded hover:bg-green-100 pt-2 p-1 cursor-pointer transition ${currenntCategory === category.category ? 'bg-green-200' : ''}`} onClick={() => handleCurrentCategory(category.category)}> 
              <img className="rounded-full h-16 w-16 overflow-hidden object-cover" src={require(`../images/${category.img}`)}></img>
              <p className="text-center text-xs">{category.category}</p>
            </div>
          )
        })}
      </div>

        {currenntCategory && (
          <div className="flex flex-wrap justify-around gap-3 mt-5"> 
            {menu.find((category) => category.category === currenntCategory).items.map((item, index) => {

              const itemInOrder = orderList.find(orderItem => orderItem.name === item.name)
              const amount = itemInOrder ? itemInOrder.amount : 0
              return (
                <Card item={item} addToOrderList={addToOrderList} removeFromOrderList={removeFromOrderList} amount={amount}/>
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