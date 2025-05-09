import { useEffect, useState } from "react";
import Content from "./components/Content";
import Header from "./components/header";

function App() {
  const [orderData, setOrderData] = useState()
  const [isCartOpened, setIsCartOpened] = useState(false)
  const [guestDetails, setGuestDetails] = useState('')

  const handleOrderData = (orderData) => {
    setOrderData(orderData)
  }

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
      <div className="p-2 flex flex-col gap-5 bg-white h-full">
        <div>
          <p>{guestDetails.chatId}</p>
          <p>{guestDetails.chatId}</p>

        </div>
        <Header data={orderData} isCartOpened={isCartOpened} setIsCartOpened={setIsCartOpened}/>
        <Content sendData={handleOrderData} isCartOpened={isCartOpened} guestDetails={guestDetails}/>
      </div>

  );
}

export default App;
