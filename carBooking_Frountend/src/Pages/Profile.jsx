import React from "react";
import Cookies from "js-cookie";
import { TbLogout2 } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const data = Cookies.get("token");
  if (!data) {
    navigate("/login");
    return null;
  }
  let userInfo;
  try {
    userInfo = JSON.parse(data);
  } catch (error) {
    navigate("/login");
    return null;
  }
  const { name = "Guest", email = "No email available", profilePic } = userInfo;
  function handleLogout() {
    Cookies.remove("token");
    navigate("/login");
  }
  return (
    <div className="h-screen bg-gray-200 dark:bg-gray-800 flex flex-wrap items-center justify-center">
      <div className="container lg:w-2/6 xl:w-2/7 sm:w-full md:w-2/3 bg-white shadow-lg transform duration-200 ease-in-out">
        <div className="h-32 overflow-hidden">
          <img
            className="w-full"
            src="https://images.unsplash.com/photo-1605379399642-870262d3d051?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
            alt="Background"
          />
        </div>
        <div className="flex justify-center px-5 -mt-12">
          <img
            className="h-32 w-32 bg-white p-2 rounded-full"
            src={
              profilePic ||
              "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
            }
            alt="Profile"
          />
        </div>
        <div>
          <div className="text-center px-14">
            <h2 className="text-gray-800 text-3xl font-bold">{name}</h2>
            <a
              className="text-gray-400 mt-2 hover:text-blue-500"
              href={`mailto:${email}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {email}
            </a>
          </div>

          <hr className="mt-6" />
          <div className="flex bg-gray-50">
            <div className="text-center w-full p-4 hover:bg-gray-100 flex justify-evenly">
              <Link to="/changepassword">
                <button
                  type="button"
                  className="ml-9 bg-cyan-400 p-4 cursor-pointer"
                >
                  Change Password
                </button>
              </Link>
              <TbLogout2
                onClick={handleLogout}
                className="h-11 w-11 cursor-pointer mt-2 text-red-400 hover:text-red-800"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
