import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";
import SingleProductCard from "../components/SingleProductCard";
import { fetchHandler } from "../utils/handlers";
import { setLoading, setLoggedAdmin, setSingleCar } from "../slices/carSlice";
import CarBooking from "../components/CarBooking";
import { setLoggedUser } from "../slices/userSlice";

export default function SingleProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const {loading,singleCar} = useSelector(state=>state.cars)
  const { id } = useParams();
  const {loggedUser} = useSelector((state)=>state.user)
  const {loggedAdmin} = useSelector((state)=>state.cars)

  useEffect(() => {
    async function getSingleproduct() {
      dispatch(setLoading(true))
      const response = await fetchHandler(`/api/v1/user/cars/${id}`);      
  if(response.status === 401){
    localStorage.removeItem("user")
    dispatch(setLoggedAdmin(""))
    dispatch(setLoggedUser(""))
    navigate("/login")
  }
      
      
      dispatch(setSingleCar(response.data.result[0]))
      dispatch(setLoading(false))   
    }
      getSingleproduct();
  }, [id]);


  useEffect(()=>{
    let userData = JSON.parse(localStorage.getItem("user"));

    if (userData && userData.role == "admin") {
      return navigate("/admin");
    }

    if(!userData){
      return navigate("/login");

    }
  },[])

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
