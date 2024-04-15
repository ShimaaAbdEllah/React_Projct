import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import img from "../assets/Sign up-rafiki.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBlog, faImage } from "@fortawesome/free-solid-svg-icons";
import { IconButton } from "@mui/material";
import { Opacity, Visibility } from "@mui/icons-material";
import { VisibilityOff } from "@mui/icons-material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function register() {
  const navigate = useNavigate();

  const [userNameValues, setUserNameValues] = useState({
    userName: "",
  });

  const handleUserNameChange = (event) => {
    setUserNameValues({
      ...userNameValues,
      userName: event.target.value,
    });
  };

  const [userImageValues, setUserImageValues] = useState({
    userImage: "",
  });

  const handleUserImageeChange = (event) => {
    setUserImageValues({
      ...userImageValues,
      userImage: event.target.value,
    });
  };

  const [passwordValues, setPasswordValues] = useState({
    password: "",
    showPassword: false,
  });

  const [confirmPasswordValues, setConfirmPasswordValues] = useState({
    confirmPassword: "",
    showConfirmPassword: false,
  });

  const [emailValues, setEmailValues] = useState({
    email: "",
  });

  const [emailValidation, setEmailValidation] = useState({
    isValid: true,
    message: "",
  });

  const handleShowToast = (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
    });
  };

  const handleClickShowPassword = (type) => {
    if (type === "password") {
      setPasswordValues({
        ...passwordValues,
        showPassword: !passwordValues.showPassword,
      });
    } else if (type === "confirmPassword") {
      setConfirmPasswordValues({
        ...confirmPasswordValues,
        showConfirmPassword: !confirmPasswordValues.showConfirmPassword,
      });
    }
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handlePasswordChange = (event) => {
    setPasswordValues({
      ...passwordValues,
      password: event.target.value,
    });
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPasswordValues({
      ...confirmPasswordValues,
      confirmPassword: event.target.value,
    });
  };

  const handleEmailChange = (event) => {
    const enteredEmail = event.target.value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(enteredEmail)) {
      setEmailValidation({ isValid: true, message: "" });
    } else {
      setEmailValidation({ isValid: false, message: "Invalid email address" });
    }

    setEmailValues({
      ...emailValues,
      email: enteredEmail,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailValues.email)) {
      handleShowToast("Invalid email address");
      return;
    }

    if (passwordValues.password.length < 6) {
      handleShowToast("Password must be at least 6 characters long");
      return;
    }

    if (passwordValues.password !== confirmPasswordValues.confirmPassword) {
      handleShowToast("Passwords do not match");
      return;
    }

    const checkEmailResponse = await axios.get(
      `http://localhost:3000/users?email=${emailValues.email}`
    );

    if (checkEmailResponse.data.length > 0) {
      handleShowToast("User with this email already has an account");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/users", {
        userName: userNameValues.userName,
        userImage: userImageValues.userImage,
        email: emailValues.email,
        password: passwordValues.password,
      });

      console.log(response);
      toast.success("Registeration successfull");
      navigate("/login");
    } catch (error) {
      console.log(error);
      handleShowToast("Registration failed. Please try again.");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="bg-blue-900 h-screen">
        <div className="w-1/2 h-max top-16 relative rounded-3xl bg-white shadow m-auto justify-center items-center flex flex-row pt-0">
          <div className="m-auto grid gap-2 w-3/4">
            <div className="h-50 w-50 flex  bg-white  justify-center items-center mx-28">
              <div>
                <img className="m-auto w-9/12" src={img} alt="" />
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid gap-2">
                <label className="input input-bordered flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4 opacity-70"
                  >
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                  </svg>
                  <input
                    type="text"
                    className="grow"
                    placeholder="Username"
                    required
                    value={userNameValues.userName}
                    onChange={handleUserNameChange}
                  />
                </label>

                <label className="input input-bordered flex items-center gap-2">
                  <FontAwesomeIcon icon={faImage} />
                  <input
                    type="text"
                    className="grow"
                    placeholder="Your image URL"
                    required
                    value={userImageValues.userImage}
                    onChange={handleUserImageeChange}
                  />
                </label>

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
                    className="grow"
                    placeholder="Email"
                    required
                    onChange={handleEmailChange}
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
                    type={passwordValues.showPassword ? "text" : "password"}
                    className="grow"
                    placeholder="Password"
                    value={passwordValues.password}
                    required
                    onChange={handlePasswordChange}
                  />
                  <IconButton
                    onClick={() => handleClickShowPassword("password")}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {passwordValues.showPassword ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
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
                    type={
                      confirmPasswordValues.showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    className="grow"
                    placeholder="Confirm password"
                    required
                    value={confirmPasswordValues.confirmPassword}
                    onChange={handleConfirmPasswordChange}
                  />
                  <IconButton
                    onClick={() => handleClickShowPassword("confirmPassword")}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {confirmPasswordValues.showConfirmPassword ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                </label>

                <input
                  className="bg-blue-700 text-slate-50 h-10 rounded-3xl hover:bg-blue-950 hover:shadow"
                  type="submit"
                  value="Sign Up"
                />
              </div>
            </form>
            <p className="text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold leading-6 text-blue-600 hover:text-blue-500"
              >
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
