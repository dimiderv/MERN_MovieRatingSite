import { useLocation,Navigate, Outlet } from "react-router-dom"
import useAuth from "../../hooks/useAuth"


const RequireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();
    // console.log(auth)
    // email doesnt persist
    console.log(auth?.token)
    const currentDate = new Date();

// Get the current time
    const currentTime = currentDate.getTime();
    console.log(currentTime)
    
    return (
        auth?.token
            ? <Outlet />
            : auth.status ==='logout' // it never goes to link page
                ? <Navigate to="/" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;