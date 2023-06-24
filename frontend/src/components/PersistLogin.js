import { Outlet } from 'react-router-dom'
import { useState,useEffect } from 'react'
import useRefreshToken from '../hooks/useRefreshToken'
import useAuth from '../hooks/useAuth'

const PersistLogin = () =>{
    const [isLoading,setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const {auth,persist} = useAuth();
    
    useEffect(()=>{
        let isMounted = true;
        const verifyRefreshToken = async ()=>{
            try{
                await refresh();
            }catch(err){
                console.error(err);

            }
            finally {
                isMounted && setIsLoading(false);
            }
        }

        !auth?.token ? verifyRefreshToken() : setIsLoading(false);
        return ()=> isMounted=false;
    },[refresh,auth])

    useEffect(()=>{
        console.log(`isLoading: ${isLoading}`)
        console.log(`Token: ${JSON.stringify(auth?.token)}`);

    },[isLoading,auth?.token])

  return (
    <>
        {!persist
            ? <Outlet /> 
            : isLoading
                ? <p>Loading....</p>
                : <Outlet/>

        }
    
    
    </>
  )
}

export default PersistLogin