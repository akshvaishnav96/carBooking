import axios from "./axiosConfig"

const BASE_URL = import.meta.env.VITE_BASE_URL

async function fetchHandler(url,method="get",data=""){
try {
    
    const response = await axios[method](`${BASE_URL}${url}`,data)
 
    return response
} catch (error) {
    return error
}
}

export {fetchHandler}