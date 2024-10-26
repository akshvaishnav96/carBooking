import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedUser } from "../slices/userSlice";
import { setLoggedAdmin } from "../slices/carSlice";
import { fetchHandler } from "../utils/handlers";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loggedUser } = useSelector((state) => state.user);
  const { loggedAdmin } = useSelector((state) => state.cars);

  useEffect(() => {
    async function logginCheckHandler() {
      try {
        const logged = await fetchHandler("/api/v1/logincheck");

        if (logged.status === 401) {
          dispatch(setLoggedUser(""));
          dispatch(setLoggedAdmin(""));
          localStorage.removeItem("user");
          return;
        }

        if (logged.status === 200) {
          if (logged.data.result.role === "user") {
            dispatch(setLoggedUser(logged.data.result));
          }

          if (logged.data.result.role === "admin") {
            dispatch(setLoggedAdmin(logged.data.result));
          }

          localStorage.setItem("user", JSON.stringify(logged.data.result));
        }
      } catch (error) {
        console.log(error.message);
      }
    }

    logginCheckHandler();
  }, []);



  async function handleLogout() {
    try {
      const logout = await fetchHandler("/api/v1/user/logout", "post");

      toast.success("successfully logout");
      localStorage.removeItem("user");
      dispatch(setLoggedAdmin(""));
      dispatch(setLoggedUser(""));
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <>
      <ToastContainer autoClose={1000} />

      <div className=" bg-black flex justify-between items-center h-[6rem] max-w-full mx-auto px-4 text-white">
        <h1 className="text-3xl font-bold font-serif ">
          <Link to="/">Car Hub</Link>
        </h1>

        <div className="flex items-center space-x-4 ml-auto">
          <ul className="flex items-center space-x-4">
            {loggedAdmin?.username && (
              <>
                <Link to="/admin">
                  <li className="p-2 hover:bg-white rounded-xl cursor-pointer duration-300 hover:text-black">
                    Admin
                  </li>
                </Link>
                <button onClick={handleLogout}>Logout</button>
              </>
            )}

            {loggedUser?.username && (
              <>
                <Link to="/booking">
                  <li className="p-2 hover:bg-white rounded-xl cursor-pointer duration-300 hover:text-black">
                    Bookings
                  </li>
                </Link>
                <button onClick={handleLogout}>Logout</button>
              </>
            )}

            {!loggedUser?.username && !loggedAdmin?.username && (
              <Link to="/login">
                <li className="p-2 hover:bg-white rounded-xl cursor-pointer duration-300 hover:text-black">
                  Login
                </li>
              </Link>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
