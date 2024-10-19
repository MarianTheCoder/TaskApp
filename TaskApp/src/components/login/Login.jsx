import React, { useState , useContext } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import axios from 'axios'
import { AuthContext } from '../other/context/AuthContext';
import { NameContext} from '../other/context/NameContext';

export default function Login() {

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const { setAuth } = useContext(AuthContext);
  const [alert , setAlert] = useState('');
  const [submit , setSubmit] = useState(false);
  const navigate = useNavigate();
  const {setNameUser} = useContext(NameContext);
 
  

  const handleSubmit = async(e) => {
 
    setSubmit(true);
  e.preventDefault();
    try{
      const result = await axios.post('http://localhost:4000/api/login' ,{name,password})
      setAuth(result.data.token);
      setNameUser(name);
      navigate('/home');
    }
    catch(error){
      console.log(error.response.data.error);
      setAlert(error.response.data.error);
    }
    finally{
      setTimeout(() => {
        setAlert('');
        setSubmit(false);
      }, 3000);
  }
}

  return (
    <div className="flex items-center justify-center min-h-screen bg-primary font-OpenSans">
      <form className="bg-secondary p-6 rounded shadow-md w-full max-w-sm" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-5 text-white text-center">Login</h2>
        <div className="mb-6">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:shadow-outline"
            placeholder="Enter your name"
          />
        </div>
        <div className="">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight  focus:shadow-outline"
            placeholder="Enter your password"
          />
        </div>
        <div className='h-12 flex text-sm font-bold text-accent justify-center items-center'>
          {alert !== '' ? <p>{alert}</p> : ''}
        </div>
        <div className="flex items-center justify-center">
          <button 
          disabled = {submit}
            onClick={handleSubmit}
            className="bg-accent hover:bg-btn-hoverAcc text-white font-bold py-2 px-4 rounded "
          >
            Login
          </button>
    
        </div>
      </form>
    </div>
  );
}
