import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HashLoader from "react-spinners/HashLoader";
import { useLoaderData } from "react-router-dom";
import FilterComponent from "../components/filterComponent";
import { setBrand, setCars, setModel } from "../slices/carSlice";
import Card from "../components/Card";
import HomePageHeader from "../components/HomePageHeader";
export default function Home() {
  const dispatch = useDispatch();
  const data = useLoaderData();

  const { model, carsData, brand } = useSelector((state) => state.cars);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (data) {
      setLoading(false);
    }
  }, [data]);

  useEffect(() => {
    dispatch(setCars(data.cars.data.result));
    dispatch(setModel(data.model.data.result));
    dispatch(setBrand(data.brand.data.result));
  }, []);

  if (loading) {
    return (
      <div className="  h-[100vh] flex justify-center items-center">
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
    <>
      <div className="relative">
        <HomePageHeader />
        <div className="absolute top-[30%] w-[30%] left-[10%] ">
          <h2 className="text-[#d2f540] text-7xl text-wrap uppercase text-center font-bold">Best Place <span> To get car</span> on rent</h2>
          <h3 className="text-4xl font-bold text-[#f5ffcc] text-center mb-3 mt-8">
            Filter Options
          </h3>
          <FilterComponent model={model} cars={carsData} brand={brand} />
        </div>
      </div>

      <h3 className="text-5xl font-bold bg-black text-[#d2f540] pt-[8rem] pb-[3rem] text-center ">
        Our Collection
      </h3>
      <div className=" font-serif ml-9 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-[10rem]">
        {carsData ? (
          carsData.map((item) => <Card item={item} key={item._id} />)
        ) : (
          <h2>Nothing to show write now</h2>
        )}
      </div>
    </>
  );
}
