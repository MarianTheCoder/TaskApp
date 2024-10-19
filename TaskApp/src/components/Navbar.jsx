
import React, { useContext } from 'react'
import {Link ,Routes , Route, useLocation } from 'react-router-dom'
import { AuthContext } from './other/context/AuthContext';
import { NameContext } from './other/context/NameContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faHouse, faListCheck, faNoteSticky, faTicket } from '@fortawesome/free-solid-svg-icons';
import useWindowSize from "./other/ResizeHook"





export default function Navbar() {

    const {auth , setAuth } = useContext(AuthContext);
    const {nameUser , setNameUser} = useContext(NameContext);
    const size = useWindowSize();
    console.log(size);

  return (
   
    <nav className='  flex lg:flex-col items-center py-6 gap-5 bg-[#4a148c] font-OpenSans   text-white'>
        <div className=' w-auto lg:w-w85 ml-4 lg:ml-0  h-auto p-6 bg-[#4a148c] rounded-xl flex  flex-col justify-center items-center border'>
            {nameUser !== (null) ?  <><p className=' font-bold tracking-wide'>Hello</p> <p className=' font-Varela text-lg font-bold tracking-wide mb-5'>{nameUser}</p> </>: "" }
        <Routes>
            <Route path='/login' element={<Link  className="bg-accent hover:bg-btn-hoverAcc text-white font-bold py-2 px-4 rounded" to="/register" >Register</Link>}/>
            <Route path='/register' element={<Link to="/login"
            className="bg-accent hover:bg-btn-hoverAcc text-white font-bold py-2 px-4 rounded " >Log in</Link> }/>
            <Route path='/*' element={auth === (undefined) ? 
            <Link to="/login" className="bg-accent hover:bg-btn-hoverAcc text-white font-bold py-2 px-4 rounded " >Log in</Link> :
            <Link to="/login" className="bg-accent hover:bg-btn-hoverAcc text-white font-bold py-2 px-4 rounded" onClick={() =>{setAuth(undefined);}}>Logout</Link>}/>
      
            <Route path='/home/*' element={  <Link to="/login" className="bg-accent hover:bg-btn-hoverAcc text-white font-bold py-2 px-4 rounded" onClick={() =>{
            setAuth(undefined); setNameUser(null);
        }}>Logout</Link>}/>
         </Routes>
        </div>
        { size.width > 1024 ? <div className=' w-w85 pl-2 text-lg tracking-tight space-y-4 '>

        <Link to="/home/" className=' w-w85 h-auto py-4  hover:bg-btn-hover rounded-xl flex justify- items-center'><FontAwesomeIcon  className="  text-accent text-xl px-4" icon={faHouse}/> Home </Link>
        <Link to="/home/tasks" className=' w-w85 h-auto py-4  hover:bg-btn-hover   rounded-xl flex justify- items-center'><FontAwesomeIcon className="text-accent text-xl px-4" icon={faListCheck}/>Task </Link>
        <Link to="/home/focus" className=' w-w85 h-auto py-4 hover:bg-btn-hover   rounded-xl flex justify- items-center'><FontAwesomeIcon className="text-accent  text-xl px-4" icon={faClock}/>Focus </Link>
        <Link to="/home/notes" className=' w-w85 h-auto py-4  hover:bg-btn-hover  rounded-xl flex justify- items-center'><FontAwesomeIcon className="text-accent text-xl  px-4" icon={faNoteSticky}/>Notes </Link>
        
        </div> : 
        <div className=' grid grid-cols-2 grid-rows-2 text-2xl    w-full'>
        <Link to="/home/" className='  h-auto  p-4  hover:bg-btn-hover rounded-xl flex justify-center items-center'><FontAwesomeIcon  className="  text-accent  px-4" icon={faHouse}/>  </Link>
        <Link to="/home/tasks" className='  h-auto p-4  hover:bg-btn-hover   rounded-xl flex justify-center items-center'><FontAwesomeIcon className="text-accent  px-4" icon={faListCheck}/> </Link>
        <Link to="/home/focus" className='  h-auto p-4 hover:bg-btn-hover   rounded-xl flex justify-center items-center'><FontAwesomeIcon className="text-accent   px-4" icon={faClock}/> </Link>
        <Link to="/home/notes" className='  h-auto  p-4  hover:bg-btn-hover  rounded-xl flex justify-center items-center'><FontAwesomeIcon className="text-accent   px-4" icon={faNoteSticky}/> </Link>
        </div>
        
        }
    </nav>
  )
}
