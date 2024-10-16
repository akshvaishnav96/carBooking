import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { fetchHandler } from "../utils/handlers";
import { setCars } from "../slices/carSlice";
import { toast } from "react-toastify";

const Card = ({ item }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  async function deleteCar(id) {
    try {
      const response = await fetchHandler(`/api/v1/admin/cars/${id}`, "delete");
      dispatch(setCars(response.data.result));
      toast.success("successfully deleted")
    } catch (error) {
      console.log(error.message);
      toast.success("Something went wrong while Deleting")

    }
  }

  return (
    <div className="w-96 ml-2 flex flex-col items-center bg-white shadow-md rounded-xl transition-transform duration-500 hover:scale-105 hover:shadow-xl">
      <img
        src={`${item.images}`}
        alt="Product"
        className="h-48 w-96 rounded-t-xl"
      />{" "}
      <div className="px-4 py-3 w-full">
        <span className="text-gray-700 mr-3 uppercase text-xs">
          {item.brand}
        </span>
        <p className="text-lg font-bold text-black text-[2rem] truncate block capitalize">
         {item.brand}-{item.model}
        </p>
        {location.pathname.startsWith("/admin") && <p className="text-lg font-semibold text-black">{item.carnumber.toUpperCase()}</p>}

        {item.booked && (
          <div className="py-3">
            <p className=" text-gray-700 mr-3 uppercase text-xs">
              Booked From : {new Date(item.startdate).toLocaleDateString()}
            </p>
            <p className=" text-gray-700 mr-3 uppercase text-xs">
              to : {new Date(item.enddate).toLocaleDateString()}
            </p>
          </div>
        )}

        {item.booked && !location.pathname.startsWith("/admin") ? (
          <Link to={`/cars/${item._id}`}>
            {" "}
            <button className="px-6 py-2 text-white bg-red-900 rounded">
              Already Booked
            </button>
          </Link>
        ) : (
          <div className="flex items-center my-5">
            {location.pathname.startsWith("/admin") ? (
              <div className="flex items-center gap-5">
             
              <MdDelete
                onClick={() => deleteCar(item._id)}
                className="text-2xl text-red-700 cursor-pointer"
              />

              </div>
            ) : (
              <Link to={`/cars/${item._id}`} className="w-full">
                <button className="px-6 py-2 text-white bg-slate-700 rounded hover:bg-slate-900">
                  Book now
                </button>
              </Link>
            )}
          </div>
        )}
        <div className="flex items-center">
          <p className="text-lg font-semibold text-black cursor-auto my-3"></p>
          <del>
            <p className="text-sm text-gray-600 cursor-auto ml-2"></p>
          </del>
        </div>
      </div>
    </div>
  );
};

export default Card;
