
import {Navigate, Route, Routes }from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";
import ProfilePage from "./components/ProfilePage";
import HomePage from "./components/HomePage";
import SettingsPage from "./components/SettingsPage";
import { axiosInstance } from "./lib/axios";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { Loader } from 'lucide-react';
 const App = () => {
  const{authUser,checkAuth,isCheckingAuth}=useAuthStore();

  useEffect(()=>{
    checkAuth()

  },[checkAuth]);

  console.log(authUser)
  if(isCheckingAuth && !authUser){
    return <div className="flex items-center justify-center h-screen">
       <Loader className="size-10 animate-spin"/>
    </div>
 

  }


  return (
    <div>
      
      <Navbar/>

      <Routes>
        <Route path='/' element={authUser? <HomePage/> :<Navigate to="/login"/>}/>
        <Route path='/signup' element={!authUser ?<SignUpPage/>:<Navigate to="/"/> }/>
        <Route path='/login' element={!authUser ?<LoginPage/> :<Navigate to="/"/> }/>
        <Route path='/setting' element={<SettingsPage/>}/>
        <Route path='/profile' element={authUser? <ProfilePage/>:<Navigate to="/login"/>}/> 
      </Routes>

     
    </div>
  )
}
export default App;