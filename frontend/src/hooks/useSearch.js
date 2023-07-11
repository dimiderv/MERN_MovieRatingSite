import { useContext, useDebugValue } from "react";
import SearchContext from "../context/SearchProvider";


const useSearch =()=>{
    const { search } = useContext(SearchContext);
    
    return useContext(SearchContext);
}

export default useSearch