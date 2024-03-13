import React from 'react';
import {useGetFavoritesQuery} from "../features/auth/authApiSlice";

const Welcome = () => {
    const { data, error, isLoading } = useGetFavoritesQuery()
    console.log(data)
    return (
        <div style={{display:'flex',flexDirection:'column',fontSize:'3rem',color:'white',justifyContent:'center'}}>
            <p>Welcome to MovieDB</p>
            <p>This is the welcome page for the MovieDB database.</p>

        </div>
    );
};

export default Welcome;