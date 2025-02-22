import { useState } from "react";
import Content from "./components/Content";
import Header from "./components/header";

function App() {
  const [orderData, setOrderData] = useState()
  const [isCartOpened, setIsCartOpened] = useState(false)

  const handleOrderData = (orderData) => {
    setOrderData(orderData)
  }


  return (
    <div className="p-2 w-1/2 flex flex-col gap-5">
      <Header data={orderData} isCartOpened={isCartOpened} setIsCartOpened={setIsCartOpened}/>
      <Content sendData={handleOrderData} isCartOpened={isCartOpened}/>
    </div>

  );
}

export default App;
