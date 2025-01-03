import axios from "axios";

//create a new instance of axios
export const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000'
})

const UseAxiosSecure = () => {
return axiosSecure
};

export default UseAxiosSecure;