import React, { useEffect } from "react";
import { Link, Outlet, redirect, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setLoggedAdmin, setMsgData } from "../slices/carSlice";
import { fetchHandler } from "../utils/handlers";
import { setLoggedUser } from "../slices/userSlice";

export default function AdminHeaderWrapper() {
  let navigate = useNavigate();

  let dispatch = useDispatch();

  let location = useLocation()

  useEffect(() => {
    const isAuthenticated = async () => {
      try {
        let userData = JSON.parse(localStorage.getItem("user"));
        
        if (userData && userData.role == "user") {
          return navigate("/");
        }

        const msgs = await fetchHandler("/api/v1/admin/cars/msg");

        if (msgs.status === 401 || !userData) {
          dispatch(setLoggedAdmin(""));
          dispatch(setLoggedUser(""));
          localStorage.removeItem("user")
          return navigate("/login");
        }

        dispatch(setMsgData(msgs.result));
      } catch (error) {
        toast(error.message);
      }
    };
    isAuthenticated();
  }, []);

  const navItems = [
    { id: 1, text: "brand", nav: "/admin/brand" ,active:location.pathname==="/admin/brand" },
    { id: 2, text: "model", nav: "/admin/model" ,active:location.pathname==="/admin/model" },
    { id: 3, text: "add car", nav: "/admin/addcar" ,active:location.pathname==="/admin/addcar" },
    { id: 4, text: "cars", nav: "/admin" ,active:location.pathname==="/admin" },
    { id: 5, text: "msgs", nav: "/admin/msgs" ,active:location.pathname==="/admin/msgs" },
  ];
  return (
    <>
      <nav className="bg-gray-200 p-7  flex justify-end">
        {navItems.map((item) => (
          <Link to={item.nav} key={item._id} className="transition duration-300 ease-in-out hover:scale-110">
            <span className={`${item.active?"bg-green-500 text-white " : "text-black bg-gray-300"} shadow-md uppercase  p-2  px-6 py-4 m-3  rounded-xl cursor-pointer duration-300 hover:text-white  hover:bg-green-500 `}>
              {item.text}
            </span>
          </Link>
        ))}
      </nav>
      <Outlet />
    </>
  );
}

