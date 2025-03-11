import { Link, useNavigate } from "react-router-dom";
import bg from "../../assets/others/bg.png";
import img from "../../assets/others/authentication2.png";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import UseAuth from "../../hooks/UseAuth";
import Swal from "sweetalert2";
import useAxiousPublic from "../../hooks/useAxiousPublic";
import SocialLogin from "../../Components/socialLogin/SocialLogin";

const SignUp = () => {
  const { createUser, updateUserProfile } = UseAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiousPublic();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {

    createUser(data.email, data.password).then((result) => {
      const loggedUser = result.user;
   
      updateUserProfile(data.name, data.photoURL)
        .then(() => {
          console.log("user profile info updated");
          //post user data in database
          const userInfo = {
            email: data.email,
            name: data.name,
          };
          axiosPublic.post("/user", userInfo).then((res) => {
            if (res.data.insertedId) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "User created successfully.",
                showConfirmButton: false,
                timer: 1500,
              });
              navigate("/");
            }
          });
        })
        .catch((error) => console.log(error));
    });
  };
  return (
    <>
      <Helmet>
        <title>Bistro Boss || Sign Up</title>
      </Helmet>
      <div
        className="login"
        style={{
          backgroundImage: `url(${bg})`,
        }}
      >
        <div className="hero  min-h-screen">
          <div className="hero-content flex-col lg:flex-row">
            <div className="text-center lg:text-left">
              <img src={img} alt="" />
            </div>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
              <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="name"
                    name="name"
                    className="input input-bordered"
                    {...register("name", { required: true })}
                  />
                  {errors.name && (
                    <span className=" text-red-800">Name is required</span>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Photo Url</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Photo Url"
                    name="photo"
                    className="input input-bordered"
                    {...register("photoURL", { required: true })}
                  />
                  {errors.name && (
                    <span className=" text-red-800">photo is required</span>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="email"
                    name="email"
                    className="input input-bordered"
                    {...register("email", { required: true })}
                  />
                  {errors.email && (
                    <span className=" text-red-800">Email is required</span>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="password"
                    className="input input-bordered"
                    name="password"
                    {...register("password", {
                      pattern:
                        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
                      maxLength: 16,
                      minLength: 8,
                    })}
                  />
                  {/* Pa$$w0rd! */}
                  {errors.password && (
                    <span className=" text-red-800">
                      must contain one digit 1 to 9, 1 lowercase
                      letter,uppercase letter, special character, must be 8-16
                      characters long.
                    </span>
                  )}
                </div>

                <div className="form-control mt-6">
                  <input
                    className="btn btn-primary"
                    type="submit"
                    value="Sign Up"
                  />
                </div>
              </form>
              <p className=" text-xl text-center py-7 text-yellow-400">
                Already Account ?&nbsp;
                <span className=" text-yellow-600">
                  <Link to="/SignUp">Login Here</Link>
                </span>
              </p>
              <SocialLogin />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
