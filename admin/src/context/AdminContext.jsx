import { createContext } from "react";
import {useState} from 'react';

// basic Syntax of creating context api functions

// create a Context object to share the values across components without passing them as props
export const AdminContext = createContext()
/*
This is a Context object created using createContext(). It will allow other components to access values shared by the AdminContextProvider.
*/

// will provide context values to its child components
const AdminContextProvider = (props) =>{
    // set aToken empty if localStorage does not contain aToken (user is not logged in )
    const [aToken, setAToken] = useState(localStorage.getItem('aToken')?localStorage.getItem('aToken'):'')
    // accessing url of backend 
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const value = {
        aToken,setAToken,backendUrl // these 3 will be passed when as a context to children component
    }
    return <AdminContext.Provider value = {value}>
        {props.children}
    </AdminContext.Provider>
}

export default AdminContextProvider