import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import UseAuth from "../hooks/UseAuth";


const AdminRoute = ({children}) => {
    const {   User,
        loading} = UseAuth();
        const [isAdmin , isAdminLoading] = useAdmin();
        const location = useLocation()


        if (loading && isAdminLoading) {
            return <progress className="progress w-56"></progress>
        }
        if (User && isAdmin) {
            return children
        }
        return <Navigate to="/Login" state={{from : location}} replace></Navigate>
        //this state will receive from login 
};

export default AdminRoute;
