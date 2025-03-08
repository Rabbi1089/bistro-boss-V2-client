import { useQuery } from "@tanstack/react-query";
import UseAuth from "../../../hooks/UseAuth";
import UseAxiosSecure from "../../../hooks/UseAxiosSecure";

const PaymentHistory = () => {
  const { User } = UseAuth();
  const axiosSecure = UseAxiosSecure();
  console.log(User.email);

  const { data: payments = [] } = useQuery({
    queryKey: ["payments", User.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${User.email}`);
      console.log(res.data);
      return res.data;
    },
  });

  return (
    <div>
      <h1 className=" text-2xl uppercase">
        Total payment history : {payments.length}
      </h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Price</th>
              <th>Transactions Id</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((items, id) => (
              <tr key={items._id} className="bg-base-200">
                <th>{id+1}</th>
                <td>{items.price}</td>
                <td>{items.transactionID}</td>
                <td>{items.status}</td>
       
              </tr>
            ))}

            {/* row 2 */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
