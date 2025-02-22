import { useState } from "react"

function Cart ({ data, addToOrderList, removeFromOrderList }) {
const [paymentType, setPaymentType] = useState('')

const handleRemoveItem = (item) => {
  removeFromOrderList(item)
}

const handleAddItem = (item) => {
  addToOrderList(item)
} 

  return (
    <div className="p-1 flex flex-col justify-center gap-2">
      {data.length > 0 ? (
        <>
      <p>Вот что вы заказали: </p>
      <div className="border-t-2 border-black-100 flex flex-col gap-3 pt-3">
        {data && (
          data.map((order, index) => {
            return (
              <div className="flex gap-2">
                <p>{index + 1}.</p>
                <div className="p-1 flex border-b-2 border-black-100 w-full justify-between">
                  <p className="border border-red-500 w-fit break-words p-1">{order.name}</p>
                  <div className="flex gap-2 items-center">
                    <p className="italic">x {order.amount},</p>
                    <p className="italic">{order.price * order.amount} Руб.</p>
                    <div className="bg-red-200 rounded-full w-4 h-4 flex justify-center items-center cursor-pointer" onClick={() => handleRemoveItem(order)}>
                      <p>-</p>
                    </div>
                    <div className="bg-green-200 rounded-full w-4 h-4 flex justify-center items-center text-sm cursor-pointer" onClick={() => handleAddItem(order)}>
                      <p>+</p>
                    </div>
                  </div>
                </div>

              </div>
            )
          })
          
        )}
      </div>
      <p className="mt-3 self-end">Полная сумма заказа: {data.reduce((sum, order) => sum + order.price * order.amount, 0)} Руб.</p>

      <div className="self-center mt-4">
        <input type="radio" name="payment" value="card" checked={paymentType === 'card'} onChange={() => setPaymentType('card')}/>
        <span className="ml-1 mr-4">Картой</span>
        <input type="radio" name="payment" value="cash" checked={paymentType === 'cash'} onChange={() => setPaymentType('cash')}/>
        <span className="ml-1 mr-4">Наличными</span>
        <input type="radio" name="payment" value="room" checked={paymentType === 'room'} onChange={() => setPaymentType('room')}/>
        <span className="ml-1">На счет номера</span>
      </div>

      <button className="bg-green-200 mt-2 mb-5 rounded-md h-7 w-1/4 self-center" disabled={!paymentType}>Заказать</button>
      </>
      ) : (
        <p>В корзине пока пусто..</p>
      )}



    </div>
  )
}

export default Cart