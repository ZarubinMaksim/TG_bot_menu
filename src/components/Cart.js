import { useState } from "react"

function Cart ({ orderList, addToOrderList, removeFromOrderList, guestDetails }) {
const [paymentType, setPaymentType] = useState('')
const totalAmount = orderList.reduce((sum, item) => sum + item.amount, 0)
const totalPrice = orderList.reduce((sum, order) => sum + order.price * order.amount, 0)
// const handleRemoveItem = (item) => {
//   removeFromOrderList(item)
// }

// const handleAddItem = (item) => {
//   addToOrderList(item)
// } 

const submitCart = async (orderList) => {
  const guestDetailsTEMPORARY = {
    chatId: '317138824',
    keyRequest: '',
    lastname: '小马',
    name: '马克西姆',
    room: 'B606',
    arrival: '05-05-2025',
    departure: '08-05-2025'
  }
  try {
    await fetch ('https://yunobot.com:3000/send-order', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ guestDetailsTEMPORARY, orderList })
    })
  } catch(error) {
    console.log(error)
  }
}
  return (
    <div className="p-1 flex flex-col gap-2">
      {orderList?.length > 0 ? (
        <>
      <p>Ваш заказ: </p>
      <div className="border-t-2 border-black-100 flex flex-col gap-3 pt-3">
        {orderList && (
          orderList.map((order, index) => {

            return (

              <div className="bg-green-100 rounded-lg flex flex-col gap-3 p-5 w-full h-full"> 

                <div className="flex gap-5">
                  <img className="w-28 h-28 object-cover rounded-lg" src={require(`../images/${order.img}`)}></img>
                  <div className="w-3/5">
                    <p className="uppercase text-lg">{order.name}</p>
                    <p className="text-sm italic mt-2">{order.ingredients}</p>
                  </div>
                </div>

                <div className="w-full border-t-2 pt-4 border-green-700 flex justify-between">
                  <div className='flex gap-3 items-center'>
                    <p className="border border-black w-7 h-7 text-center text-md cursor-pointer" onClick={() => removeFromOrderList(order, 1)}>-</p>
                    <p>{order.amount}</p>
                    <p className="border border-black w-7 h-7 text-center text-md cursor-pointer" onClick={() => addToOrderList(order, 1)}>+</p>
                  </div>
                  <p>THB {order.price * order.amount}</p>
                </div>
              </div>

              // <div className="flex gap-2">
              //   <p>{index + 1}.</p>
              //   <div className="p-1 flex border-b-2 border-black-100 w-full justify-between">
              //     <p className="border border-red-500 w-fit break-words p-1">{order.name}</p>
              //     <div className="flex gap-2 items-center">
              //       <p className="italic">x {order.amount},</p>
              //       <p className="italic">{order.price * order.amount} Руб.</p>
              //       <div className="bg-red-200 rounded-full w-4 h-4 flex justify-center items-center cursor-pointer" onClick={() => removeFromOrderList(order)}>
              //         <p>-</p>
              //       </div>
              //       <div className="bg-green-200 rounded-full w-4 h-4 flex justify-center items-center text-sm cursor-pointer" onClick={() => addToOrderList(order)} >
              //         <p>+</p>
              //       </div>
              //     </div>
              //   </div>

              // </div>
            )
          })
          
        )}
      </div> 

      <div className="shadow-cardShadow rounded-lg p-5 flex flex-col">
        <p className="uppercase">Всего {totalAmount} наименований</p>

        <div className="flex justify-between mt-5 pt-2 border-t border-green-700">
          <p className="uppercase">Общая сумма </p>
          <p>THB {totalPrice}</p>
        </div>
{/* 
        <div className="flex  justify-around mt-6 text-sm">
          <div className="flex gap-1">
            <input type="radio" name="payment" value="card" checked={paymentType === 'card'} onChange={() => setPaymentType('card')}/>
            <span className="ml-1 mr-4">Картой</span>
          </div>
          <div className="flex gap-1">
            <input type="radio" name="payment" value="cash" checked={paymentType === 'cash'} onChange={() => setPaymentType('cash')}/>
            <span className="ml-1 mr-4">Наличными</span>
          </div>
          <div className="flex gap-1">
            <input type="radio" name="payment" value="room" checked={paymentType === 'room'} onChange={() => setPaymentType('room')}/>
            <span className="ml-1">На счет номера</span>
          </div>
        </div> */}

        <div className="flex gap-3 w-fit pt-2 pb-2 pl-4 pr-4 bg-green-600 rounded-full text-white mt-5 self-center" onClick={() => submitCart(orderList)}>
          <p className="uppercase">Заказать</p>
          <p>THB {totalPrice}</p>
        </div>
      </div>
    </>
      ) : (
        <p>В корзине пока пусто..</p>
      )}



    </div>
  )
}

export default Cart