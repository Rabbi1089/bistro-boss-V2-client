import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import { FaRecycle, FaTrash, FaUser } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import Swal from "sweetalert2";

const AllUser = () => {
  const axiosSecure = UseAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axiosSecure.get("/user");
      return res.data;
    },
  });

  const handleMakeAdmin = (user) => {
    console.log(user);
    axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
     // console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch()
        Swal.fire({
          title: `${user.name} now admin`,
          icon: "success",
          draggable: true,
        });
      }
    });
  };

  const handleDelete = (id) => {
    console.log(id);
    //sweet alert
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(id);
        axiosSecure.delete(`/user/${id}`).then((res) => {
          //console.log(res.data);
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });

        /*
  
          */
      }
    });
  };

  return (
    <div className="">
      <div className=" flex justify-evenly m-4">
        <h1 className="text-3xl">All User {users.length}</h1>
        <h1 className="text-3xl">Current User</h1>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, id) => (
              <tr key={user._id}>
                <th>{id+1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {" "}
                  {user.role === 'admin' ? (
                    <p>Admin</p>
                  ) : (
                    <button
                      onClick={() => {
                        handleMakeAdmin(user);
                      }}
                      className="btn btn-lg"
                    >
                      <FaUser className=" bg-orange-400 text-white text-2xl "></FaUser>
                    </button>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => {
                      handleDelete(user._id);
                    }}
                    className="btn btn-lg"
                  >
                    <FaTrash className=" text-red-400 text-2xl "></FaTrash>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUser;
