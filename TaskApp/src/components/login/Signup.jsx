// src/Form.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

const Form = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [alert , setAlert] = useState('')
  const [submit , setSubmit] = useState(false);

  

  const handleSubmit = async(e) => {
    

    e.preventDefault();
    setSubmit(true);
    try{
      const result = await axios.post('http://localhost:4000/api/register' ,{name,password})
      console.log(result.data.message);
      navigate("/login");
      
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
    <div className="flex items-center justify-center min-h-screen font-OpenSans text-white bg-primary">
      <form className="bg-secondary p-6 rounded shadow-md w-full max-w-sm" onSubmit={handleSubmit}>
        <h2 className="text-2xl  font-bold mb-5 text-center">Signup</h2>
        <div className="mb-6">
          <label className="block text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:shadow-outline text-black"
            placeholder="Enter your name"
          />
        </div>
        <div className="">
          <label className="block  text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow  text-black appearance-none border rounded w-full py-2 px-3  leading-tight  focus:shadow-outline"
            placeholder="Enter your password"
          />
        </div>
        <div className='h-12 flex text-sm font-bold text-accent justify-center items-center'>
          {alert !== '' ? <p>{alert}</p> : ''}
        </div>
        <div className="flex items-center justify-center">
          <button 
            onClick={handleSubmit}
            disabled={submit}
            className="bg-accent hover:bg-btn-hoverAcc text-white font-bold py-2 px-4 rounded "
          >
            Sign Up
          </button>
   
        </div>
      </form>
    </div>
  );
};

export default Form;
