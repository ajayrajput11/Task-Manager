
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import LogIn from './Pages/LogIn'
import SignUp from './Pages/SignUp'
import Maincomp from './Components/Maincomp'
import ForgetPassword from './Pages/ForgetPassword'
import Dashboard from './Pages/Dashboard'
import Tasks from './Pages/Tasks'
import Archived from './Pages/Archived'
import Setting from './Pages/Setting'

const App = () => {
  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<LogIn/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path="/forgotPassword" element={<ForgetPassword/>}/>
      
      <Route path='/maincomp' element={<Maincomp/>}>
      
      <Route path='setting' element={<Setting/>}/>
      <Route path='dashboard' element={<Dashboard />} />
      <Route path="tasks" element={<Tasks/>}/>
      <Route path='archived' element={<Archived/>}/>

      </Route>

      
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
