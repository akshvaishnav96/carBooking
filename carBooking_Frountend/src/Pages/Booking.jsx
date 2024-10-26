import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { redirect, useLoaderData, useNavigate } from "react-router-dom";
import { setLoggedUser, setUserBookings } from "../slices/userSlice";
import { fetchHandler } from "../utils/handlers";
import MsgComponent from "../components/MsgComponent";
import UserMsgBox from "../components/UserMsgBox";
import { setLoggedAdmin } from "../slices/carSlice";
import { toast } from "react-toastify";

export default function Booking() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bookigData = useLoaderData();

  const { loggedUser, userBookings } = useSelector((state) => state.user);
  const { loggedAdmin } = useSelector((state) => state.cars);

  useEffect(() => {
    let loggedData = JSON.parse(localStorage.getItem("user"));

    if (loggedData) {
      if (loggedData.role === "admin") {
        navigate("/admin");
      }
    }

    if (!loggedData) {
      navigate("/login");
    }
  }, [loggedUser, loggedAdmin]);

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

  useEffect(() => {
    if (bookigData.status < 400) {
      dispatch(setUserBookings(bookigData.data.result));
    }
  }, []);

  async function updateBooking(id) {
    try {
      let url = `/api/v1/user/booking/${id}`;
      const response = await fetchHandler(url, "patch");
      dispatch(setUserBookings(response.data.result[0].userBookings));
      toast.success("successfully cancelled");
    } catch (error) {
      toast.success("Something went wrong while Ypdating");
    }
  }

  async function deleteBooking(id) {
    try {
      let url = `/api/v1/user/booking/${id}`;
      const response = await fetchHandler(url, "delete");
      dispatch(setUserBookings(response.data.result[0].userBookings));
      toast.success("successfully deleted");
    } catch (error) {
      toast.success("Something went wrong while Ypdating");
    }
  }

  return (
    <>
      {userBookings && userBookings.length > 0 ? (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
          <div className=" ml-9 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {userBookings?.length > 0 &&
              userBookings?.map((item) => (
                <UserMsgBox
                  key={item._id}
                  item={item}
                  updateBooking={updateBooking}
                  deleteBooking={deleteBooking}
                />
              ))}
          </div>
        </div>
      ) : (
        <h3 className="text-3xl italic my-5 mx-5">No Bookings Available</h3>
      )}
    </>
  );
}
