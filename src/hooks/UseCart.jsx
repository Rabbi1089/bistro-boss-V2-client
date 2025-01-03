import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "./UseAxiosSecure";
import UseAuth from "./UseAuth";


const UseCart = () => {
    const axiosSecure = UseAxiosSecure();
    const {User} = UseAuth()
    const {refetch, data : cart =[]} = useQuery({
        //tanstack return data , here data is stored in cart which is array type and return it
        queryKey: ['cart' , 'User?.email'],
        queryFn: async () => {
          const res = await axiosSecure.get(`/cart?email=${User?.email}`)
          //send email in backend as query
          return res.data
          //this res.data stored in ^^ data
        },
        
      })

    return [cart , refetch]
};

export default UseCart;