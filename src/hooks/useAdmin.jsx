import { useQuery } from "@tanstack/react-query";
import UseAuth from "./UseAuth";
import UseAxiosSecure from "./UseAxiosSecure";


const useAdmin = () => {
    const {User , loading} = UseAuth()
    const axiosSecure = UseAxiosSecure()
    const {data: isAdmin , isLoading: isAdminLoading
    } = useQuery({
        queryKey: [User?.email, 'isAdmin'],
        enabled: !loading,
        queryFn: async() =>{
        const res = await axiosSecure.get(`/users/admin/${User.email}`)
        console.log(res.data);
        return res.data?.admin
        }
    })
    return [isAdmin , isAdminLoading]
};

export default useAdmin;