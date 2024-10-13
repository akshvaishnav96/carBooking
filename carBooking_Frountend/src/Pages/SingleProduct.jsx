import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoaderData, useParams } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";
import SingleProductCard from "../components/SingleProductCard";
import { fetchHandler } from "../utils/handlers";
import { setLoading, setSingleCar } from "../slices/carSlice";
import CarBooking from "../components/CarBooking";

export default function SingleProduct() {
  const dispatch = useDispatch();
  const {loading,singleCar} = useSelector(state=>state.cars)
  const { id } = useParams();

  useEffect(() => {
    async function getSingleproduct() {
      dispatch(setLoading(true))
      const response = await fetchHandler(`/api/v1/admin/cars/${id}`);      
      dispatch(setSingleCar(response.result))
      dispatch(setLoading(false))   
    }
      getSingleproduct();
  }, [id]);

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

  return <>{singleCar && <SingleProductCard item={singleCar} />
  }
 
  
  </>;
}
