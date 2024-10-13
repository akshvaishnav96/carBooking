import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../actions/actions";
import HashLoader from "react-spinners/HashLoader";
import Card from "../components/Card";
import FilterComponent from "../components/FilterComponent";


export default function Product() {
  const dispatch = useDispatch();
  
  const { productsData, loading, error } = useSelector(
    (state) => state.products
  );



  if (loading)
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
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <FilterComponent />
      <h3 className="text-bold text-4xl font-bold text-center  py-5 uppercase">
        Products
      </h3>
      <div className="flex flex-wrap gap-4 justify-center   my-5">
        {productsData.map((item) => (
          <Card key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
}
