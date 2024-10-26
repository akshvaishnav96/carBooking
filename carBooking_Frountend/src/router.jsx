import { createBrowserRouter } from "react-router-dom";
import Home from "./Pages/Home"
import Wrapper from "./components/Wrapper";
import SingleProduct from "./Pages/SingleProduct";
import NotFound from "./Pages/NotFound";

import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import { fetchHandler } from "./utils/handlers";
import Admin from "./Pages/Admin";
import Msgs from "./Pages/Msgs"
import AdminHeaderWrapper from "./components/AdminHeaderWrapper";
import UplodeBrand from "./Pages/UplodeBrand"
import UplodeModel from "./Pages/UplodeModel";
import UplodeCar from "./Pages/UplodeCar";
import Booking from "./Pages/Booking";
import EditCar from "./Pages/EditCar";




const router = createBrowserRouter([
  {
    path: "/",
    element: <Wrapper />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: async () => {

          const brand = await fetchHandler("/api/v1/cars/brand")
          const model = await fetchHandler("/api/v1/cars/model")
          const cars = await fetchHandler("/api/v1/cars")

          return { brand, model, cars }

        }
      },
      {
        path: "/cars/:id",
        element: <SingleProduct />,
      },

      {
        path: "/admin",
        element: (
          <AdminHeaderWrapper  /> 
        ),
        children: [
          {
            index: true,
            element:<Admin/>,
           
            loader: async () => await fetchHandler("/api/v1/admin/cars")

          },

          {
            path: "msgs",
            element: <Msgs />,
            loader:async ()=> {
              const msgs = await fetchHandler("/api/v1/admin/cars/msg")
              return msgs
            }
           
          },

          {
            path: "brand",
            element: <UplodeBrand />,
            loader:async ()=> await fetchHandler("/api/v1/admin/cars/brand")
          
          
          },
          {
            path: "model",
            element: <UplodeModel />,
            loader:async ()=> {
              const model = await fetchHandler("/api/v1/admin/cars/model")
              const brand =  await fetchHandler("/api/v1/admin/cars/brand");
              return {model,brand}
            }
           
           
          },
          {
            path: "addcar",
            element: <UplodeCar />,
            loader: async () => {
              const brand = await fetchHandler("/api/v1/admin/cars/brand")
              const model = await fetchHandler("/api/v1/admin/cars/model")
              return { brand, model }

            }
          },
          {
            path: "editcar/:id",
            element: <EditCar />,
            loader: async (elem)=>{
              const brandData =  await fetchHandler("/api/v1/admin/cars/brand");
              const carData = await fetchHandler(`/api/v1/admin/cars/${elem.params.id}`)
              
              return {carData,brandData}
            }
            
          }


        ]

      },


      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/booking",
        element: <Booking />,
        loader:async (elem)=>{
          return await fetchHandler(`/api/v1/user/booking`)
        }
      },


    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
