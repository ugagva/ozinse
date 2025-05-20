import React, {createContext, useContext, useEffect, useState} from "react";

type AuthContextType={
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
}


const AuthContext= createContext<AuthContextType>({
   isAuthenticated:false,
    login:()=> {} ,
    logout:() => {},
});

type Props = {
    children: React.ReactNode;
}
// type InitialState = {
//     auth: boolean,
//     setAuth: (value: boolean) => void,
// }


export const AuthProvider = ({children}:Props) => {

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsAuthenticated(!!token);
    }, []);

    const login = (token: string) => {
        localStorage.setItem("token", token);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);