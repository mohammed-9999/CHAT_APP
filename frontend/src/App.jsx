
import {Route, Routes }from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";
import ProfilePage from "./components/ProfilePage";
import HomePage from "./components/HomePage";
import SettingsPage from "./components/SettingsPage";
import { axiosInstance } from "./lib/axios";
 const App = () => {
  return (
    <div>
      
      <Navbar/>

      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/signup' element={<SignUpPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/setting' element={<SettingsPage/>}/>
        <Route path='/profile' element={<ProfilePage/>}/> 
      </Routes>

     
    </div>
  )
}
export default App;