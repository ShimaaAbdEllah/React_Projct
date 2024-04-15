import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import img from "../assets/Forgot password-rafiki.png";
import { IconButton } from "@mui/material";
import { Visibility } from "@mui/icons-material";
import { VisibilityOff } from "@mui/icons-material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function login() {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("userName") !== null;

    if (isLoggedIn) {
      navigate("/Home");
    }
  }, [navigate]);

  const [values, setValues] = React.useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const [userData, setUserData] = useState(null);

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!values.email) {
      toast.warning("Email is required.");
      return;
    }

    if (!values.password) {
      toast.warning("Password is required.");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:3000/users?email=${values.email}&password=${values.password}`
      );

      if (response.data.length > 0) {
        const user = response.data[0];
        setUserData(user);
        localStorage.setItem("userName", user.userName);
        localStorage.setItem("email", user.email);
        localStorage.setItem("userImage", user.userImage);
        toast.success("Login successfull!");
        navigate("/Home");
      } else {
        toast.error("Invalid email or password");
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Invalid Data");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="bg-blue-900 h-screen">
        <div className="w-1/2 h-4/5 top-16 relative rounded-3xl bg-white shadow m-auto justify-center items-center flex flex-row">
          <div className="m-auto grid gap-2 w-3/4">
            <div className="h-50 w-50 flex  bg-white  justify-center items-center mx-28">
              <div>
                <img className="m-auto w-9/12" src={img} alt="" />
              </div>
            </div>

            <form onSubmit={handleLogin}>
              <div className="grid gap-2 ">
                <label className="input input-bordered flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4 opacity-70"
                  >
                    <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                    <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                  </svg>
                  <input
                    type="text"
                    className="grow "
                    placeholder="Email"
                    value={values.email}
                    onChange={(e) => {
                      setValues({ ...values, email: e.target.value });
                    }}
                  />
                </label>

                <label className="input input-bordered flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4 opacity-70"
                  >
                    <path
                      fillRule="evenodd"
                      d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <input
                    type={values.showPassword ? "text" : "password"}
                    className="grow"
                    placeholder="Password"
                    value={values.password}
                    onChange={(e) => {
                      setValues({ ...values, password: e.target.value });
                    }}
                  />
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </label>

                <input
                  className="bg-blue-700 text-slate-50 h-10 rounded-3xl hover:bg-blue-950 hover:shadow"
                  type="submit"
                  value="Login"
                />
              </div>
            </form>

            <p className="text-center text-sm text-gray-500">
              Don't have account?{" "}
              <Link
                to="/signUp"
                className="font-semibold leading-6 text-blue-600 hover:text-blue-500"
              >
                Create new account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
