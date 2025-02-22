function Cart ({ data, addToOrderList, removeFromOrderList }) {
console.log('121212', data)

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
                  <p>{order.name}</p>
                  <div className="flex gap-2 items-center">
                    <p>x {order.amount},</p>
                    <p className="">{order.price * order.amount} Руб.</p>
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
      <p className="mt-4 self-end">Полная сумма заказа: {data.reduce((sum, order) => sum + order.price * order.amount, 0)} Руб.</p>
      </>
      ) : (
        <p>В корзине пока пусто..</p>
      )}



    </div>
  )
}

export default Cart