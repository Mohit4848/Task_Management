import React, { useEffect } from 'react'
import Home from "./pages/Home";
import Alltasks from "./pages/Alltasks";
import Imptasks from "./pages/Imptasks";
import Completedtasks from "./pages/Completedtasks";
import Incompletetasks from "./pages/Incompletetasks";
import { Routes, Route, useNavigate } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './store/auth';

const App = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  useEffect(() => {
    if(localStorage.getItem("id") && localStorage.getItem("token")){
      dispatch(authActions.login());
    } else if(isLoggedIn === false){
      navigate("/signup");
    }
  }, []);
  return (
    <div className='bg-gray-900 text-white h-screen p-2 relative'>
        <Routes>
          <Route exact path="/" element={<Home />}>
            <Route index element={<Alltasks />} />
            <Route exact path="/Imptasks" element={<Imptasks />} />
            <Route exact path="/Completedtasks" element={<Completedtasks />} />
            <Route exact path="/Incompletetasks" element={<Incompletetasks />} />
          </Route>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      
    </div>
  )
}

export default App

