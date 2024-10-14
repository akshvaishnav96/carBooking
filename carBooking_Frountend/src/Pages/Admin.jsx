import React, { useEffect, useState } from "react";
import UplodeBrand from "../components/UplodeBrand";
import { useLoaderData } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import HashLoader from "react-spinners/HashLoader";
import { setBrand, setCars, setModel, setMsgData } from "../slices/carSlice";
import Card from "../components/Card";
import UplodeCar from "../components/UplodeCar";
import UplodeModel from "../components/UplodeModel";
import MsgComponent from "../components/MsgComponent"
export default function Admin() {
  const dispatch = useDispatch();
  const data = useLoaderData();
  
  const { model, carsData, brand,msgData } = useSelector((state) => state.cars);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (data) {
      setLoading(false);
    }
  }, [data]);

  useEffect(() => {
    dispatch(setCars(data.cars.result));
    dispatch(setModel(data.model.result));
    dispatch(setBrand(data.brand.result));
    dispatch(setMsgData(data.msgs.result));
  }, [dispatch]);

  if (loading) {
    return (
      <div className="h-[100vh] flex justify-center items-center">
        {" "}
        <HashLoader
          color="green"
          loading={loading}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Add new Car
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <UplodeCar />
        <UplodeBrand />
        <UplodeModel />
      </div>
      <div className=" ml-9 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {carsData?.length>0 && carsData?.map((item)=> <Card item={item}/>)}
      </div>
      <div className=" ml-9 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {msgData?.length>0 && msgData?.map((item)=> <MsgComponent item={item}/>)}
      </div>
    </div>
  );
}
