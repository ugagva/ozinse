import  {ReactNode} from 'react';
import {Navigate} from "react-router-dom";
import {useAuth} from "../context/AuthProvider.tsx";



const PrivateRoute = ({children}:{children:ReactNode}) => {

    const isAuthenticated = useAuth();
    return  isAuthenticated ? children:<Navigate to='/'/>

};

export default PrivateRoute;