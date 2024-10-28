import React, { useEffect, useState } from "react";
import {  useLoaderData } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import HashLoader from "react-spinners/HashLoader";
import { clearInputs, setBrand, setCars, setModel, setMsgData } from "../slices/carSlice";
import Card from "../components/Card";

export default function Admin() {
  const dispatch = useDispatch();
  const cars = useLoaderData();
  
  
  const { carsData } = useSelector((state) => state.cars);

  useEffect(() => {
    dispatch(clearInputs())


    if(cars.status <400){
      dispatch(setCars(cars.data.result));
    }
    
  }, []);

 

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
     
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Our Collection
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
       
      </div>
      <div className=" ml-9 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {carsData?.length>0 && carsData?.map((item)=> <Card key={item._id} item={item}/>)}
      </div>
     
    </div>
  );
}
