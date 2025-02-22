function Card ({ item, addToOrderList, removeFromOrderList, amount }) {

  const handleAddToOrderList = () => {
    addToOrderList(item)
  }

  const handleRemoveFromOrderList = () => {
    removeFromOrderList(item)
  }

  return (
    <div className="border border-green-200 hover:bg-green-100 cursor-pointer rounded-lg flex flex-col justify-between items-center w-2/5 p-3 items-center">
      <img className="rounded-full w-16 h-16" src={require(`../images/${item.img}`)}></img>
      <p className="text-sm text-center mt-3">{item.name}</p>
      <p className="mt-2 mb-2 text-xs italic text-center border-t border-b border-green-200">{item.ingredients}</p>
      <p className="text-xs">{item.price} Руб.</p>

      <div className=" flex gap-2 text-xs items-center mt-3">
        <p className="bg-red-500 w-4 h-4 text-center rounded cursor-pointer" onClick={handleRemoveFromOrderList}>-</p>
        <p>{amount}</p>
        <p className="bg-green-500 w-4 h-4 text-center rounded cursor-pointer" onClick={handleAddToOrderList}>+</p>
      </div>
    </div>
  )
}

export default Card