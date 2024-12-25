import img from "../../assets/others/authentication2.png";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";

import "./login.css";
import bg from "../../assets/others/bg.png";
import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const { loginUser } = useContext(AuthContext);

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const capchaRef = useRef(null);
  const handleValidateCapcha = () => {
    const user_captcha_value = capchaRef.current.value;
    console.log(user_captcha_value);
    if (validateCaptcha(user_captcha_value) == true) {
      alert("Captcha Matched");
    } else {
      alert("Captcha Does Not Match");
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    loginUser(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };
  return (
    <>
      <Helmet>
        <title>Bistro Boss || Sign IN</title>
      </Helmet>
      <div />
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
              <form onSubmit={handleLogin} className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="email"
                    name="email"
                    className="input input-bordered"
                    required
                  />
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
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <LoadCanvasTemplate />
                  </label>
                  <input
                    ref={capchaRef}
                    type="text"
                    placeholder="Type above word"
                    className="input input-bordered"
                    id="user_captcha_input"
                    required
                    onBlur={handleValidateCapcha}
                  />
                  <label className="label">
                    <a href="#" className="label-text-alt text-xl">
                      Type above word
                    </a>
                  </label>
                </div>
                <div className="form-control mt-6">
                  <input
                    className="btn btn-primary"
                    type="submit"
                    value="Login"
                  />
                </div>
              </form>
              <p className=" text-xl text-center py-7 text-yellow-400">
                New Here ?&nbsp;
                <span className=" text-yellow-600">
                  <Link to="/SignUp">Create an account</Link>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
