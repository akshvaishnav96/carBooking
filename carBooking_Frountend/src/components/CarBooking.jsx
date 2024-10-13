import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearInputs, inputHandler, setCars } from "../slices/carSlice";
import { fetchHandler } from "../utils/handlers";

export default function CarBooking({ item }) {
  const dispatch = useDispatch();
  const today = new Date().toISOString().split("T")[0];
  const { startdate, enddate } = useSelector((state) => state.cars);

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const formData = {
        startdate,
        enddate,
      };
      const response = await fetchHandler(
        `/api/v1/admin/cars/${item._id}`,
        "patch",
        formData
      );
      dispatch(setCars(response.result.newData));
      dispatch(setMsgs(response.result.msgData));
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <form className=" space-y-6 w-[40%]  my-6" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="startdate"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Select Booking Start Date <span className="text-red-500">*</span>
          </label>
          <div className="mt-2">
            <input
              id="startdate"
              name="startdate"
              type="date"
              required
              min={today}
              onChange={(e) =>
                dispatch(
                  inputHandler({ name: e.target.name, value: e.target.value })
                )
              }
              value={startdate}
              className=" p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="enddate"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Select Booking end Date <span className="text-red-500">*</span>
          </label>
          <div className="mt-2">
            <input
              id="enddate"
              name="enddate"
              type="date"
              required
              min={today}
              onChange={(e) =>
                dispatch(
                  inputHandler({ name: e.target.name, value: e.target.value })
                )
              }
              value={enddate}
              className=" p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <button className="btn bg-blue-500 px-4 py-2 rounded text-white">
          Book Now
        </button>
      </form>
    </>
  );
}
