import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../other/context/AuthContext';

const ProtectedRoute = ({ component: Component }) => {
    const { auth } = useContext(AuthContext);

    return auth ? <Component /> : <Navigate to="/register" />;
};

export default ProtectedRoute;
