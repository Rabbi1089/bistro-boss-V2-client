import axios from "axios";
import { useNavigate } from "react-router-dom";
import UseAuth from "./UseAuth";

//create a new instance of axios
const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000'
})

const UseAxiosSecure = () => {
  const navigate = useNavigate();
  const {logOut} = UseAuth()
// Add a request interceptor
axiosSecure.interceptors.request.use(function (config) {
    const token = localStorage.getItem('access-token')
    //console.log('req from inter interceptor' , token);
    config.headers.authorization = `Bearer ${token}`;
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });


  // Response interceptor
  axiosSecure.interceptors.response.use(function (response) {
  return response;
}, async (error) => {
  const status = error.response.status; 
  console.log('status error' , status);
  if (status === 401 || status === 403 ) {
    console.log("logout now");
    await logOut()
    navigate('/login')
    
  }
  return Promise.reject(error);
});

return axiosSecure
};



export default UseAxiosSecure;