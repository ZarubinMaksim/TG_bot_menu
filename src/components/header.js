import logo from '../images/logo.png'
import cart from '../images/cart.png'
import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

function Header ({ data, setIsCartOpened, isCartOpened }) {
  const [orderQuantity, setOrderQuantity] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  const goBack = () => {
    navigate(-1)
  }

  const goMenu = () => {
    navigate('/')
  }

  useEffect(() => {
    if (data) {
      const totalQuantity = data.reduce((sum, order) => sum + order.amount, 0)
      setOrderQuantity(totalQuantity)
    }
  }, [data])

  // const handleCartOpenStatus = () => {
  //   setIsCartOpened(!isCartOpened)
  // }


  return (
    <div className="flex justify-between items-center pr-1 pl-1">

      <img className='w-20' src={logo}></img>

      {location.pathname === '/cart' ? (
        <div className='flex gap-2'>
          <p className='pt-0.5 pb-0.5 pl-2 pr-2 bg-green-500 text-white rounded-lg' onClick={goMenu}>В меню</p>
          <p className='pt-0.5 pb-0.5 pl-2 pr-2 bg-green-500 text-white rounded-lg' onClick={goBack}>Назад</p>
        </div> 
      ) : (
        <div className='relative pt-1'>
        <img className='w-6 h-6 cursor-pointer' src={cart} onClick={() => navigate('/cart')}></img>
        <div className='absolute top-0 right-0 text-xs bg-green-200 rounded-full w-3 h-3 text-center'>{orderQuantity}</div>
      </div>
      )}
    </div>
  )
}

export default Header