import useAuth from './useAuth'
import {useDispatch} from "react-redux";
import {logOut} from "../features/auth/authSlice";
import {useLogoutUserQuery} from "../features/auth/authApiSlice";

 const useLogout =()=> {
    const {setAuth} = useAuth();
    const dispatch=useDispatch();
    const {data, isSuccess, error} = useLogoutUserQuery()
    const logout = async ()=>{
        setAuth({status:"logout"});

        try{
            if(isSuccess){
                dispatch(logOut());

                console.log(data?.message)
            }


        }catch(err){
            console.log(err)
            console.log(error)
        }
    }


    return logout
    
}

export default useLogout