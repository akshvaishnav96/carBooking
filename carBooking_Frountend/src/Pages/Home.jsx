import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HashLoader from "react-spinners/HashLoader";
import { useLoaderData } from "react-router-dom";
import FilterComponent from "../components/filterComponent";
import { setBrand, setCars, setModel } from "../slices/carSlice";
import Card from "../components/Card";
export default function Home() {
  const dispatch = useDispatch();
  const data = useLoaderData();
  const {model,carsData,brand} = useSelector((state)=>state.cars)

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if(data){
      setLoading(false);
    }
  }, [data]);


  useEffect(()=>{
      
      dispatch(setCars(data.cars.result))
      dispatch(setModel(data.model.result))
      dispatch(setBrand(data.brand.result))
  },[])

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
      <h3 className="text-4xl font-bold text-cyan-700 text-center mb-3 mt-8">
        Featured Components
      </h3>
      <FilterComponent model={model} cars={carsData} brand={brand} />
    
  
      <div className=" font-serif ml-9 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {carsData.map((item)=> <Card item={item}/>)}

      </div>
    </>
  );
}
