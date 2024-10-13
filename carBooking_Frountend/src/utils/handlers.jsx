import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL

async function fetchHandler(url,method="get",data=""){
try {
    
    const response = await axios[method](`${BASE_URL}${url}`,data,)
    if(!response.data.status){
        throw new Error(response.data.msg)
    }
    return response.data
} catch (error) {
    return error.message
}
}

export {fetchHandler}