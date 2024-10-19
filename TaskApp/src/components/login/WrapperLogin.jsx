import React, { useContext } from 'react'
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Signup';
import Home from '../Home';
import { AuthContext } from '../other/context/AuthContext';
import { Routes , Route , Navigate } from 'react-router-dom';
import Tasks from '../Sections/Tasks/Tasks';
import Notes from '../Sections/Notes/Notes';
import Focus from '../Sections/Focus/Focus';
import NotFound from '../other/NotFound';


export default function WrapperLogin() {
  return (
    <>
           
                <Routes>
                    <Route path="/login" element={<LoginRoute/>} />
                    <Route path="/register" element={<RegisterRoute />} />
                    <Route path="/home">
                        <Route index element = {<ProtectedRoute component={Home} />}/>
                        <Route path='tasks' element = {<ProtectedRoute component={Tasks} />}/>
                        <Route path='focus' element = {<ProtectedRoute component={Focus} />}/>
                        <Route path='notes' element = {<ProtectedRoute component={Notes} />}/>
                        <Route path='*' element = {<NotFound/>}/>
                    </Route>
                    <Route path="/" element={<RegisterRoute />} />
                    <Route path="/*" element={<NotFound />} />

                </Routes>
        
    </>
  )
}

const LoginRoute = () => {
    const { auth } = useContext(AuthContext);
    return auth ? <Navigate to="/home" /> : <Login />;
  };
  
  const RegisterRoute = () => {
    const { auth } = useContext(AuthContext);
    return auth ? <Navigate to="/home" /> : <Register />;
  };
