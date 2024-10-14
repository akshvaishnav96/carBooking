import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchHandler } from "../utils/handlers";
import Card from "../components/Card"
import {
  clearInputs,
  inputHandler,
  setCars,
  setModel,
  setSelectedBrand,
  setSelectedModel,
} from "../slices/carSlice";

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

  async function handleSubmit(e) {
    e.preventDefault();

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
      const data = await fetchHandler("/api/v1/admin/cars", "post", formData);
      dispatch(setCars(data.result));
      dispatch(clearInputs());
    } catch (error) {
      console.log(error.message);
    }
  }

  async  function brandChangehandler(e){
    try {
      dispatch(setSelectedBrand(e.target.value))
        const response = await fetchHandler(`/api/v1/admin/cars/model?brand=${e.target.value}`,"get")
     dispatch(setModel(response.result))   

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
            required
          >
            <option value="">Select Car Brand</option>
            {brand?.map((item) => (
              <option value={item.brand}>{item.brand}</option>
            ))}
          </select>
        </div>
    { selectedBrand &&   <div>
          <select
            className="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            onChange={(e) => dispatch(setSelectedModel(e.target.value))}
            value={selectedModel}
          >
            <option value="">Select Car Model</option>
            {model?.map((item) => (
              <option value={item.model}>{item.model}</option>
            ))}
          </select>
        </div>}
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
              required
              onChange={(e) =>
                dispatch(
                  inputHandler({ name: e.target.name, value: e.target.value })
                )
              }
              value={carNumberVal}
              className=" p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="carImage"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Enter Car Description <span className="text-red-500">*</span>
          </label>
          <textarea
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
              required
              multiple
              accept="image/*"
              className=" p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <button className="btn bg-blue-500 px-4 py-2 rounded text-white">
          Add
        </button>
      </form>
     
    </div>
  );
}
