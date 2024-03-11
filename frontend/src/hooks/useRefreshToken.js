import axios from '../fetch/api/axios';
import {useDispatch} from "react-redux";
import {setCredentials} from "../features/auth/authSlice";

const useRefreshToken = () => {
    const dispatch= useDispatch()

    const refresh = async () => {
        const response = await axios.get('/refresh', {
            withCredentials: true
        });
        dispatch(setCredentials({token:response?.data?.token}))
        return response.data.token;
    }

    return refresh;
};

export default useRefreshToken;
