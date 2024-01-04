import axios from '../api/axios'
import useAuth from './useAuth'

 const useLogout =()=> {
    const {setAuth} = useAuth();
    
    const logout = async ()=>{
        setAuth({status:"logout"});
        try{
            const response = await axios('/logout',{
                withCredentials:true
            });
            console.log(response.message)
        }catch(err){
            console.log(err)
        }
    }


    return logout
    
}

export default useLogout