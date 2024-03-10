import { useLocation,Navigate, Outlet } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import {useSelector} from "react-redux";
import {selectCurrentToken} from "../../features/auth/authSlice";


const RequireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();
    const token = useSelector(selectCurrentToken)
    console.log(token)
    return (
        token
            ? <Outlet />
            : auth?.status ==='logout' // it never goes to link page
                ? <Navigate to="/" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;