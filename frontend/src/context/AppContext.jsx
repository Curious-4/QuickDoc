import { createContext, useEffect, useState } from "react";
import { toast } from 'react-toastify'
// import { doctors } from "../assets_frontend/assets";
export const AppContext = createContext()
import axios from "axios";

const AppContextProvider = (props) => {
<<<<<<< HEAD
    

    const value = {
        doctors
=======
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
        console.log(token)
        if (token) {
            loadUserProfileData();
        } else {
            setUserData(null)
        }
    }, [token])

    const value = {
        doctors,
        token, setToken,
        backendUrl,
        userData, setUserData,
        loadUserProfileData
>>>>>>> 18f5c951aa0dd6a4477f46a8bd4b9fb9c60e3926
    }
    

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider