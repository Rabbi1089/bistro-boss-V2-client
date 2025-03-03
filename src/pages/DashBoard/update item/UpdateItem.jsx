import { useLoaderData } from "react-router-dom";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import useAxiousPublic from "../../../hooks/useAxiousPublic";
import UseAxiosSecure from "../../../hooks/UseAxiosSecure";
import Swal from "sweetalert2";
import { FaUtensils } from "react-icons/fa";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateItem = () => {
  const item = useLoaderData();
 
  const { name, recipe, category, price, _id } = item;
 

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const axiosPublic = useAxiousPublic();
  const axiosSecure = UseAxiosSecure();

  const onSubmit = async (data) => {
    console.log(data);

    //image upload to imgbb then get url
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      //now send the menu item data to the server with the image url
      const menuItem = {
        name: data.name,
        recipe: data.recipe,
        image: res.data.data.display_url,
        category: data.category,
        price: data.price,
      };
   
      //Now send this data
      const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem);
     
      if (menuRes.data.modifiedCount > 0 ) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${menuItem.name}has been updated `,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  
  };
  return (
    <>
      <div>
        <SectionTitle
          heading="update an item"
          subHeading="refresh info"
        ></SectionTitle>
      </div>
      <div className="">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Recipe name *</span>
            </div>
            <input
              {...register("name", { required: true })}
              type="text"
              defaultValue={name}
              placeholder="Type here"
              className="input input-bordered w-full"
            />
            {errors.name && (
              <span className=" text-red-500">This field is required</span>
            )}
            <div className="label"></div>
          </label>
          <div className=" flex gap-6">
            {/* category */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">category * </span>
              </div>
              <select
                defaultValue={category}
                {...register("category", { required: true })}
                className="select select-ghost w-full"
              >
                <option disabled value="default">
                  Select
                </option>
                <option value="salad">Salad</option>
                <option value="pizza">Pizza</option>
                <option value="soup">Soup</option>
                <option value="dessert">Dessert</option>
                <option value="drinks">Drinks</option>
              </select>
              {errors.category && (
                <span className=" text-red-500">This field is required</span>
              )}
              <div className="label"></div>
            </label>
            {/* Price */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Price *</span>
              </div>
              <input
                {...register("price", { required: true })}
                type="number"
                defaultValue={price}
                placeholder="Price"
                className="input input-bordered w-full"
              />
              {errors.price && (
                <span className=" text-red-500">This field is required</span>
              )}
              <div className="label"></div>
            </label>
          </div>
          {/* recipe Details */}
          <label className="form-control my-6">
            <div className="label">
              <span className="label-text"> Recipe Details</span>
            </div>
            <textarea
              {...register("recipe", { required: true })}
              className="textarea textarea-bordered h-24"
              placeholder="Recipe Details"
              defaultValue={recipe}
            ></textarea>
            {errors.recipe && (
              <span className=" text-red-500">Recipe Details is required</span>
            )}
          </label>
          <div className="form-control my-6">
            <input
              type="file"
              {...register("image")}
              className="file-input file-input-bordered file-input-info w-full max-w-xs"
            />
          </div>

          <button
            className="btn btn-primary bg-orange-400 text-white border-orange-300 hover:bg-orange-500 hover:border-orange-200"
            type="submit"
          >
            Update Item <FaUtensils />
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateItem;
