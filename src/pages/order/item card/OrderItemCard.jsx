import UseAuth from "../../../hooks/UseAuth";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import UseAxiosSecure from "../../../hooks/UseAxiosSecure";
import UseCart from "../../../hooks/UseCart";

// eslint-disable-next-line react/prop-types
const OrderItemCard = ({ item }) => {
  // eslint-disable-next-line react/prop-types
  const { image, name, recipe, price , _id} = item;
  // eslint-disable-next-line react/prop-types
  const trimmedString = recipe.substring(0, 80);
  const navigate = useNavigate()
  const location = useLocation()
  const axiosSecure = UseAxiosSecure()
  const [, refetch] = UseCart()

  const { User } = UseAuth();
  const handleAddToCard = () => {
    if (User && User.email) {
      const cartItem = {
        menuId: _id ,
        email : User.email,
        name,
        image,
        price
      }
      console.log(cartItem);
      axiosSecure.post('/cart', cartItem)
      .then(function (response) {
        console.log(response);
        if (response.data.insertedId) {
          Swal.fire({
            position: "top-start",
            icon: "success",
            title: `${name} saved in cart`,
            showConfirmButton: false,
            timer: 1500
          });
          //Update user ui after add a item in a cart
          refetch()
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    } else {
      //-----------sweet alert start from here
      Swal.fire({
        title: "You are not Logged in",
        text: "To add product in cart, please logIn",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "LogIn",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", {state:{from : location}});
        }
      });
      //-----------sweet alert end from here
    }
  };
  return (
    <div>
      <div className="card bg-base-100 w-96 shadow-xl">
        <figure className="px-10 pt-10">
          <img src={image} alt="Shoes" className="rounded-xl" />
        </figure>
        <p className=" text-2xl absolute top-5 right-3 bg-slate-900 text-white p-2 rounded-md ">
          ${price}
        </p>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{name}</h2>
          <p>{trimmedString}</p>
          <div className="card-actions">
            <button
              onClick={handleAddToCard}
              className="btn btn-wide px-8 py-5 border-0 border-b-4 border-yellow-500 text-yellow-600 mt-4 uppercase"
            >
              add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItemCard;
