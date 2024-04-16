import React from "react";
import { useNavigate } from "react-router-dom";

export default function navBar() {
  const navigate = useNavigate();

  const userImage = localStorage.getItem("userImage");

  const handleSignOut = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <>
      <div className="navbar fixed z-10 p-3 bg-blue-950 border-b-2 border-b-slate-50">
        <div className="flex-1 ml-5">
          <a className="btn btn-ghost text-2xl text-white"> MY BLOG</a>
        </div>
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar "
            >
              <div className=" w-20 rounded-full">
                <img alt="Tailwind CSS Navbar component" src={userImage} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a onClick={handleSignOut}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
