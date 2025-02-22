import logo from '../images/logo.png'
import cart from '../images/cart.png'
import { useEffect, useState } from 'react'

function Header ({ data, setIsCartOpened, isCartOpened }) {
  const [orderQuantity, setOrderQuantity] = useState('')


  useEffect(() => {
    if (data) {
      const totalQuantity = data.reduce((sum, order) => sum + order.amount, 0)
      setOrderQuantity(totalQuantity)
    }
  }, [data])

  const handleCartOpenStatus = () => {
    setIsCartOpened(!isCartOpened)
  }


  return (
    <div className="flex justify-between items-center pr-1 pl-1">

      <img className='w-20' src={logo}></img>

      <div className='relative pt-1'>
        <img className='w-6 h-6 cursor-pointer' src={cart} onClick={handleCartOpenStatus}></img>
        <div className='absolute top-0 right-0 text-xs bg-green-200 rounded-full w-3 h-3 text-center'>{orderQuantity}</div>
      </div>
    </div>
  )
}

export default Header