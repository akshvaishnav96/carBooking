import axios from 'axios'

const instence = axios.create({
    withCredentials:true,
})

export default instence;