import {Outlet} from 'react-router-dom'
import {useState, useEffect} from 'react'
import useRefreshToken from '../../hooks/useRefreshToken'
import useAuth from '../../hooks/useAuth'
import {useSelector} from "react-redux";
import {selectCurrentToken} from "../../features/auth/authSlice";
import {useRefreshMutation} from "../../features/auth/authApiSlice";
import usePersist from "../../hooks/usePersist";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [refresh, {
        isUninitialized,

        isSuccess,
        isError,
        error
    }] = useRefreshMutation()
    const [persist] = usePersist()
    const token = useSelector(selectCurrentToken)

    useEffect(() => {
        let isMounted = true;
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (err) {
                console.error(err.message);
                console.log('Persist login error!')
            } finally {
                isMounted && setIsLoading(false);
            }
        }

        if (!token && persist) {
            verifyRefreshToken()
        }else{
            setIsLoading(false)
        }
        return () => isMounted = false;
    }, [refresh, token]);


    useEffect(() => {
        console.log(`isLoading: ${isLoading}`)
        console.log(`Redux Token: ${JSON.stringify(token)}`);
    }, [isLoading,token])

    return (
        <>
            {!persist
                ? <Outlet/>
                : isLoading
                    ? <p>Loading....</p>
                    : <Outlet/>

            }


        </>
    )
}

export default PersistLogin

// import {Outlet} from 'react-router-dom'
// import {useState, useEffect} from 'react'
// import useRefreshToken from '../../hooks/useRefreshToken'
// import useAuth from '../../hooks/useAuth'
// import {useSelector} from "react-redux";
// import {selectCurrentToken} from "../../features/auth/authSlice";
//
// const PersistLogin = () => {
//     const [isLoading, setIsLoading] = useState(true);
//     const refresh = useRefreshToken();
//     const {persist} = useAuth();
//     const token = useSelector(selectCurrentToken)
//
//     useEffect(() => {
//         let isMounted = true;
//         const verifyRefreshToken = async () => {
//             try {
//                 await refresh();
//             } catch (err) {
//                 console.error(err.message);
//                 console.log('Persist login error!')
//             } finally {
//                 isMounted && setIsLoading(false);
//             }
//         }
//
//         !token ? verifyRefreshToken() : setIsLoading(false);
//         return () => isMounted = false;
//     }, [refresh, token]);
//
//
//     useEffect(() => {
//         console.log(`isLoading: ${isLoading}`)
//         console.log(`Redux Token: ${JSON.stringify(token)}`);
//     }, [isLoading,token])
//
//     return (
//         <>
//             {!persist
//                 ? <Outlet/>
//                 : isLoading
//                     ? <p>Loading....</p>
//                     : <Outlet/>
//
//             }
//
//
//         </>
//     )
// }
//
// export default PersistLogin