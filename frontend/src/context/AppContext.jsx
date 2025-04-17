import { createContext, useEffect, useState } from "react";
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom";
export const AppContext = createContext()
import axios from "axios";

const AppContextProvider = (props) => {
    const currencySymbol='$';
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false);
    const [userData, setUserData] = useState(null);

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

    const loadUserProfileData = async () => {
        try {
            const {data} = await axios.get(backendUrl + '/api/user/get-profile',{headers: {token}})

            if (data.success) {
                setUserData(data.user)
                navigate("/");
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

    useEffect(() => {
        if (token) {
            loadUserProfileData();
        } else {
            setUserData(null)
        }
    }, [token])

    const value = {
        currencySymbol,
        doctors, setDoctors,
        token, setToken,
        backendUrl,
        userData, setUserData,
        loadUserProfileData,
        getDoctorData

    }
    

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider