import axios from '../fetch/api/axios'
import useAuth from './useAuth'
import {useDispatch} from "react-redux";
import {logOut} from "../features/auth/authSlice";

 const useLogout =()=> {
    const {setAuth} = useAuth();

    const dispatch=useDispatch();
    const logout = async ()=>{
        setAuth({status:"logout"});

        try{
            const response = await axios('/logout',{
                withCredentials:true
            });
            dispatch(logOut())
            // console.log(response.message)
        }catch(err){
            console.log(err)
        }
    }


    return logout
    
}

export default useLogout