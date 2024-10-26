import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { fetchHandler } from "../utils/handlers";
import HashLoader from "react-spinners/HashLoader";

import {
  clearInputs,
  inputHandler,
  setBrand,
  setCarDescriptionVal,
  setCarNumberVal,
  setCars,
  setModel,
  setSelectedBrand,
  setSelectedModel,
} from "../slices/carSlice";
import { toast } from "react-toastify";

export default function EditCar() {
  const {carData,modelData,brandData} = useLoaderData();
  const [imageInputToggler,setimagerInputToggler] = useState(false);
  const car = carData.data.result[0];


  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [error, setError] = useState({});
  const [loading, setloading] = useState(false);

  const {
    cars,
    model,
    brand,
    selectedBrand,
    selectedModel,
    carDescriptionVal,
    carNumberVal,
  } = useSelector((state) => state.cars);

  


useEffect(()=>{
dispatch(setBrand(brandData.data.result));

async function updateModel(){
  const response = await fetchHandler(
    `/api/v1/admin/cars/model?brand=${car.brand._id}`,
    "get"
  );
  
  dispatch(setModel(response.data.result));
}

updateModel()

dispatch(setSelectedBrand(car.brand._id))
dispatch(setSelectedModel(car.model._id))
dispatch(setCarNumberVal(car.carnumber));
dispatch(setCarDescriptionVal(car.description));
},[])



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



    if (
      !selectedBrand ||
      !selectedModel ||
      !carNumberVal ||
      !carDescriptionVal 
    )
      return;

    const formData = new FormData();
    formData.append("brand", selectedBrand);
    formData.append("model", selectedModel);
    formData.append("description", carDescriptionVal);
    formData.append("carId", car._id);
    if(e.target.carImageVal){
      const images = e.target.carImageVal.files;

      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }
    }
    
    

    try {
      setloading(true);
      const data = await fetchHandler(
        `/api/v1/admin/cars/${car._id}`,
        "patch",
        formData
      );
      setloading(false);
      if (data.status < 400) {
        dispatch(setCars(data.data.result));
        dispatch(clearInputs());
        toast.success(`car ${carNumberVal} updated`);
        navigate("/admin")
        setError("");
      } else {
        toast.error(data.response.data.msg);
      setloading(false);

      }
    } catch (error) {
      setloading(false);
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
    <div className="w-[100%] m-auto mt-10 flex justify-evenly">
      <form className=" space-y-6 w-[40%]" onSubmit={handleSubmit} >
        <div>
          <select
            value={selectedBrand}
           onChange={brandChangehandler}
            className="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Car Brand</option>
            {brand?.map((item) => (
              <option value={item._id} key={item._id}>
                {item.brand}
              </option>
            ))}
          </select>
          {error?.brand && <p className="text-red-500">{error.brand}</p>}
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
                <option value={item._id} key={item._id}>
                  {item.model}
                </option>
              ))}
            </select>
            {error?.model && <p className="text-red-500">{error.model}</p>}
          </div>
        )}
    
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
          {error?.description && (
            <p className="text-red-500">{error.description}</p>
          )}
        </div>
       {imageInputToggler && <div>
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
          {error?.image && <p className="text-red-500">{error.image}</p>}
        </div>}
        <button
          className={`btn ${
            loading ? "" : "bg-blue-500"
          } px-4 py-2 rounded text-white`}
          disabled={loading}
        >
          {loading ? <HashLoader color="green" /> : "Update"}
        </button>
      </form>
      <div className="text-center">
      <img src={car.images[0]}  alt="" srcset="" className="w-[40rem] h-[20rem]" />
      <h4 className=" uppercase text-gray-500 ">
        Car Number : {car.carnumber}
      </h4>
          <h5 className="text-red-400 "  >If Want to change the image uplode the new one <span onClick={()=>setimagerInputToggler(prev=>!prev)} className={`${imageInputToggler ? "text-red-800" : "text-blue-500"} cursor-pointer hover:underline`}  >{imageInputToggler ? "Cancel" : "click here."}</span> </h5>


      <p className="text-red-800 underline-offset-2 underline ">Note : Car Number is Not Changable</p>
      </div>
    </div>
  );
}
