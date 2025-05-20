import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './styles/styles.css'
import App from './App.tsx'
import {BrowserRouter} from "react-router-dom";

import {AuthProvider} from "./components/context/AuthProvider.tsx";




createRoot(document.getElementById('root')!).render(
    <StrictMode>
 <AuthProvider>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
 </AuthProvider>
    </StrictMode>,
)
