import { useForm } from "react-hook-form";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";

const AddItems = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  console.log(watch("example"));
  return (
    <>
      <div>
        <SectionTitle
          heading="add a item"
          subHeading="whats new"
        ></SectionTitle>
        
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
        defaultValue="item Name" {...register("example")}
  type="text"
  placeholder="Item Name"
  className="input input-bordered input-accent w-full max-w-xs" />

<select {...register("category")}
className="input input-bordered input-accent w-full max-w-xs"
>
<option disabled selected>Select category</option>
        <option value="salad">Salad</option>
        <option value="pizza">Pizza</option>
        <option value="soup">Soup</option>
        <option value="dessert">Dessert</option>
        <option value="drinks">Drinks</option>

      </select>

        {/* include validation with required or other standard HTML validation rules */}
        <input {...register("exampleRequired", { required: true })} />
        {/* errors will return when field validation fails  */}
        {errors.exampleRequired && <span>This field is required</span>}

        <input type="submit" />
      </form>
    </>
  );
};

export default AddItems;
