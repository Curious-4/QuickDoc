import { createContext } from "react";
import {useState} from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

// basic Syntax of creating context api functions

// create a Context object to share the values across components without passing them as props
export const AdminContext = createContext()
/*
This is a Context object created using createContext(). It will allow other components to access values shared by the AdminContextProvider.
*/

// will provide context values to its child components
const AdminContextProvider = (props) =>{
    // set aToken empty if localStorage does not contain aToken (user is not logged in )
    const [doctors, setDoctors] = useState([]) // state to hold all doctors

    const [aToken, setAToken] = useState(localStorage.getItem('aToken')?localStorage.getItem('aToken'):'')
    // accessing url of backend 
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    //Get all Doctors
    const getAllDoctors = async () => {
        try {
            const response = await axios.post(backendUrl + '/api/admin/all-doctors', {}, {headers : {aToken}});

            const { data } = response;
            if (data.success) {
                setDoctors(data.doctors)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    // Function to change Doctor's availability
    const changeAvailability = async (docId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/admin/change-availability', {docId}, {headers : {aToken}});

            if(data.success) {
                toast.success(data.message);
                getAllDoctors();
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(error.message)
        }
    }


    const value = {
        aToken,setAToken,backendUrl, doctors, getAllDoctors, changeAvailability // these 3 will be passed when as a context to children component
    }
    return <AdminContext.Provider value = {value}>
        {props.children}
    </AdminContext.Provider>
}

export default AdminContextProvider