import { useForm } from "react-hook-form";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";

const AddItems = () => {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);
  return (
    <>
      <div>
        <SectionTitle
          heading="add a item"
          subHeading="whats new"
        ></SectionTitle>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Recipe name *</span>
          </div>
          <input
            {...register("recipeName", { required: true })}
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full"
          />
          {errors.recipeName && (
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
              {...register("category", { required: true })}
              className="select select-ghost w-full"
            >
              <option disabled selected>
                Category
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
            {...register("recipeDetails", { required: true })}
            className="textarea textarea-bordered h-24"
            placeholder="Recipe Details"
          ></textarea>
          {errors.recipeDetails && (
            <span className=" text-red-500">Recipe Details is required</span>
          )}
        </label>
        <div className="form-control my-6">
        <input
          type="file"
          className="file-input file-input-bordered file-input-info w-full max-w-xs"
        />
        </div>

        <input className="btn btn-primary" type="submit" />
      </form>
    </>
  );
};

export default AddItems;
