import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  toast } from 'react-toastify';
import {
  setSelectedBrand,
  setSelectedModel,
  setSearchQuery,
  setModel,
  setCars,
  setBrand,
} from "../slices/carSlice";
import { useLocation } from "react-router-dom";
import { fetchHandler } from "../utils/handlers";

const FilterComponent = ({ model, cars, brand }) => {
  const location = useLocation();
  const [resetButtonDisabled,setResetButtonDisbled] = useState(false)
  const { selectedModel, selectedBrand, searchQuery,carsData } = useSelector(
    (state) => state.cars
  );
  const dispatch = useDispatch();
  function handleSubmit(e) {
    e.preventDefault();
    let url = "";


    if (selectedBrand && selectedModel) {
      url = `?model=${selectedModel}&brand=${selectedBrand}`;
    } else if (selectedBrand) {
      url = `?brand=${selectedBrand}`;
    } else if (selectedModel) {
      url = `?model=${selectedModel}`;
    } else {
      url = "";
    }

    dispatch(setSearchQuery("/api/v1/admin/cars"+url))
    
  }

  useEffect(() => {
    async function fetchData() {
      let query = searchQuery ? searchQuery : "";
      const data = await fetchHandler(query,"get");
      
    

      if(data.data.result){
        toast.success("car filter successfully")

        dispatch(setCars(data.data.result))
        setResetButtonDisbled(false)

      }
    }
    fetchData();
    dispatch(setSearchQuery(""))
  }, [searchQuery]);


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

  async function resetHandler(){
    setResetButtonDisbled(true)
    try {
      const responseModel = await fetchHandler(
        `/api/v1/admin/cars/model`,
        "get"
      );
       const responseBrand = await fetchHandler(
        `/api/v1/admin/cars/brand`,
        "get"
      );
      const carsDataResponse = await fetchHandler(
        `/api/v1/admin/cars`,
        "get"
      );

  
      dispatch(setModel(responseModel.data.result));
      dispatch(setCars(carsDataResponse.data.result));
      dispatch(setBrand(responseBrand.data.result));
      toast.info("reset successfuly")
      dispatch(setSelectedBrand(""));
      dispatch(setSelectedModel(""));

      setTimeout(()=>{
        setResetButtonDisbled(false)
      },10000)
      
 
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <form className=" space-y-6" onSubmit={handleSubmit}>
        <div>
          <select
            value={selectedBrand}
            onChange={brandChangehandler}
            className="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          
          >
            <option value="">Car Brand's</option>
            {brand?.map((item) => (
              <option value={item._id}>{item.brand}</option>
            ))}
          </select>
        </div>
        <div>
          <select
            className="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
           
            onChange={(e) => dispatch(setSelectedModel(e.target.value))}
            value={selectedModel}
          >
            <option value="">Select Car Model</option>
            {model?.map((item) => (
              <option value={item._id}>{item.model}</option>
            ))}
          </select>
        </div>
        <button disabled={!selectedBrand && !selectedModel} className="btn bg-blue-500 px-4 py-2 rounded text-white">
          Submit
        </button>
        <button type="button" disabled={resetButtonDisabled} onClick={resetHandler} className="btn mx-5 bg-red-800 px-4 py-2 rounded text-white">
          reset
        </button>
      </form>
    </div>
  );
};

export default FilterComponent;
