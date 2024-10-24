import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchHandler } from "../utils/handlers";
import HashLoader from "react-spinners/HashLoader";

import Card from "../components/Card";
import {
  clearInputs,
  inputHandler,
  setCars,
  setModel,
  setSelectedBrand,
  setSelectedModel,
} from "../slices/carSlice";
import { toast } from "react-toastify";

export default function UplodeCar() {
  const {
    cars,
    model,
    brand,
    selectedBrand,
    selectedModel,
    carDescriptionVal,
    carNumberVal,
  } = useSelector((state) => state.cars);

  const location = useLocation();
  const dispatch = useDispatch();

  const [error, setError] = useState({});
  const [loading, setloading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!selectedBrand)
      setError((prev) => {
        return { ...prev, brand: "brand field is required" };
      });

    if (!selectedModel)
      setError((prev) => {
        return { ...prev, model: "model field is required" };
      });

    if (!carNumberVal)
      setError((prev) => {
        return { ...prev, number: "Car Number is required" };
      });

    if (!carDescriptionVal)
      setError((prev) => {
        return { ...prev, description: "Car Description is required" };
      });

    if (!e.target.carImageVal.files)
      setError((prev) => {
        return { ...prev, image: "image is required" };
      });

    if (
      !selectedBrand ||
      !selectedModel ||
      !carNumberVal ||
      !carDescriptionVal ||
      !e.target.carImageVal.files
    )
      return;

    const formData = new FormData();
    formData.append("brand", selectedBrand);
    formData.append("model", selectedModel);
    formData.append("carnumber", carNumberVal);
    formData.append("description", carDescriptionVal);
    const images = e.target.carImageVal.files;
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    try {
      setloading(true)
      const data = await fetchHandler("/api/v1/admin/cars", "post", formData);
setloading(false);
      if (data.status < 400) {
        dispatch(setCars(data.data.result));
        dispatch(clearInputs());
        toast.success(
          `car ${carNumberVal} added`
        );
    setError("");

      } else {
        toast.error(data.response.data.msg);
      }


   








    } catch (error) {
      toast.error(error.message);
    }
  }

  async function brandChangehandler(e) {
    try {
      dispatch(setSelectedBrand(e.target.value));
      const response = await fetchHandler(
        `/api/v1/admin/cars/model?brand=${e.target.value}`,
        "get"
      );

      dispatch(setModel(response.data.result));
      
      
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="w-[40%] m-auto mt-10">
      <form className=" space-y-6" onSubmit={handleSubmit}>
        <div>
          <select
            value={selectedBrand}
            onChange={brandChangehandler}
            className="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            
          >
            <option value="">Select Car Brand</option>
            {brand?.map((item) => (
              <option value={item._id} key={item._id}>{item.brand}</option>
            ))}
          </select>
         {error?.brand && <p className='text-red-500'>{error.brand}</p>}

        </div>
        {selectedBrand && (
          <div>
            <select
              className="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              
              onChange={(e) => dispatch(setSelectedModel(e.target.value))}
              value={selectedModel}
            >
              <option value="">Select Car Model</option>
              {model?.map((item) => (
                <option value={item._id} key={item._id}>{item.model}</option>
              ))}
            </select>
         {error?.model && <p className='text-red-500'>{error.model}</p>}

          </div>
        )}
        <div>
          <label
            htmlFor="number"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Enter Car Number <span className="text-red-500">*</span>
          </label>
          <div className="mt-2">
            <input
              id="number"
              name="carNumberVal"
              type="text"
              
              onChange={(e) =>
                dispatch(
                  inputHandler({ name: e.target.name, value: e.target.value })
                )
              }
              value={carNumberVal}
              className=" p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
         {error?.number && <p className='text-red-500'>{error.number}</p>}

        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Enter Car Description <span className="text-red-500">*</span>
          </label>
          <textarea
          id="description"
            placeholder="Enter Car Detail's"
            name="carDescriptionVal"
            value={carDescriptionVal}
            onChange={(e) =>
              dispatch(
                inputHandler({ name: e.target.name, value: e.target.value })
              )
            }
            className=" p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          ></textarea>
         {error?.description && <p className='text-red-500'>{error.description}</p>}

        </div>
        <div>
          <label
            htmlFor="carImage"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Uplode Images
          </label>
          <div className="mt-2">
            <input
              id="carImage"
              name="carImageVal"
              type="file"
              
              multiple
              accept="image/*"
              className=" p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
         {error?.image && <p className='text-red-500'>{error.image}</p>}

        </div>
        <button className={`btn ${loading ?"" :"bg-blue-500"} px-4 py-2 rounded text-white`} disabled={loading}>
         {loading ? <HashLoader color="green"/> :  "Add"}
        </button>
      </form>
    </div>
  );
}
