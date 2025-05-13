import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from "react";
import Content from "./components/Content";
import Header from "./components/header";
import ItemDescription from './components/ItemDescription';
import Cart from './components/Cart';

function App() {
  // const [orderData, setOrderData] = useState()
  const [isCartOpened, setIsCartOpened] = useState(false)
  const [guestDetails, setGuestDetails] = useState('')

  // !!!!!!
  const [orderList, setOrderList] = useState(JSON.parse(localStorage.getItem('orderList')) || [])
  console.log('ORDERLIST', orderList)

  useEffect(() => {
    localStorage.setItem('orderList', JSON.stringify(orderList))
  }, [orderList])

  const handleOrderList = (data) => {
    setOrderList(data)
  }

  const addToOrderList = (newOrder, newOrderAmount) => {
    setOrderList(prevOrderList => {
      const existingOrders = prevOrderList.find(prevOrder => prevOrder.name === newOrder.name)

      if (existingOrders) {
        return prevOrderList.map(prevOrder => 
          prevOrder.name === newOrder.name 
          ? {...prevOrder, amount: prevOrder.amount + newOrderAmount}
          : prevOrder)
      } else {
        return [...prevOrderList, {...newOrder, amount: newOrderAmount}]
      }
    })
  }

  const removeFromOrderList = (removedOrder) => {
    setOrderList(prevOrderList => {
      const existingOrders = prevOrderList.find(prevorder => prevorder.name === removedOrder.name)
  
      if (existingOrders) {
        if (existingOrders.amount > 1) {
          // Если количество больше 1, уменьшаем его
          return prevOrderList.map(prevOrder => 
            prevOrder.name === removedOrder.name 
            ? { ...prevOrder, amount: prevOrder.amount - 1 }
            : prevOrder
          )
        } else {
          // Если количество 1, удаляем объект
          return prevOrderList.filter(prevOrder => prevOrder.name !== removedOrder.name)
        }
      } else {
        // Если объекта нет, ничего не меняем
        return prevOrderList
      }
    })
    
  }


  //  !!!!!!!!

  // const handleOrderData = (orderData) => {
  //   setOrderData(orderData)
  // }

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const rawGuestdetails = query.get('guestDetails');
  
    if(rawGuestdetails) {
      try {
        const guestDetails = JSON.parse(rawGuestdetails);
        setGuestDetails(guestDetails)
      } catch (error) {
        console.error('Ошибка при парсинге guestDetails:', error);
      }
    }
  }, [])

  return (
    <Router>
      <div className="p-4 flex flex-col gap-5 bg-white h-full max-w-lg m-auto">
        <Header data={orderList} isCartOpened={isCartOpened} setIsCartOpened={setIsCartOpened} />

        <Routes>
          <Route path="/" element={
            <Content
              sendData={handleOrderList}
              isCartOpened={isCartOpened}
              guestDetails={guestDetails}
              orderList={orderList}
            />
          } />
          <Route path="/item/:name" element={<ItemDescription orderList={orderList} addToOrderList={addToOrderList}/>}/>
          <Route path="/cart" element={<Cart orderList={orderList} guestDetails={guestDetails} addToOrderList={addToOrderList} removeFromOrderList={removeFromOrderList}/>}/>
        </Routes>
      </div>
    </Router>
      // <div className="p-4 flex flex-col gap-5 bg-white h-full max-w-lg m-auto">
      //   <Header data={orderData} isCartOpened={isCartOpened} setIsCartOpened={setIsCartOpened}/>
      //   <Content sendData={handleOrderData} isCartOpened={isCartOpened} guestDetails={guestDetails}/>
      // </div>

  );
}

export default App;
