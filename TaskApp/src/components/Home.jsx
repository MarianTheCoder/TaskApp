import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    
   
    return (
        <>
        <div className=' bg-primary flex w-full h-full justify-center items-center font-OpenSans'>
            <div className='p-6 text-2xl bg-secondary rounded-xl'>
                <p className=' text-white'>Welcome to my Task App <span className='text-accent'>!</span></p>
            </div>

        </div>
        </>
    );
};



export default Home;
