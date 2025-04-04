import { createContext, useEffect, useState } from "react";
import { toast } from 'react-toastify'
// import { doctors } from "../assets_frontend/assets";
export const AppContext = createContext()
import axios from "axios";

const AppContextProvider = (props) => {
    const [doctors, setDoctors] = useState([]);
    const [token, setToken] = useState('');

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    

    const getDoctorData = async () => {
        try {
            const response = await axios.get(backendUrl+ "/api/doctor/list");
            const { data } = response;
            if (data.success) {
                setDoctors(data.doctors)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        getDoctorData();
    },[])

    const value = {
        doctors,
        token, setToken,
        backendUrl
    }
    

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider