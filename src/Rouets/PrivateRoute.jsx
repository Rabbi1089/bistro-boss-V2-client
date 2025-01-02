import { Navigate, useLocation } from "react-router-dom";
import UseAuth from "../hooks/UseAuth";


const PrivateRoute = ({children}) => {
    const {User , loading} = UseAuth();
    const location = useLocation()


    if (loading) {
        return <progress className="progress w-56"></progress>
    }
    if (User) {
        return children
    }
    return <Navigate to="/Login" state={{from : location}}></Navigate>
    //this state will receive from login 
};

export default PrivateRoute;