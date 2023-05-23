import '../../App.css'

import { Home } from '../Home';
import { MyAccount } from '../MyAccount';
import { MyOrders } from '../MyOrders';
import { MyOrder } from '../MyOrder';
import { SignIn } from '../SignIn';

function App() {
  return (
    <>
      <Home/>
      <MyAccount/>
      <MyOrder/>
      <MyOrders/>
      <SignIn/>
    </>
  )
}

export default App
