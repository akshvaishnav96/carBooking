import { createBrowserRouter } from "react-router-dom";
import Home from "./Pages/Home"
import Wrapper from "./components/Wrapper";
import SingleProduct from "./Pages/SingleProduct";
import NotFound from "./Pages/NotFound";


import SignUp from "./components/SignUp";
import Login from "./components/Login";
import { fetchHandler } from "./utils/handlers";
import Admin from "./Pages/Admin";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Wrapper />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: async()=> {
      
           const  brand =  await fetchHandler("/api/v1/admin/cars/brand")
          const model =  await fetchHandler("/api/v1/admin/cars/model")
          const cars =   await fetchHandler("/api/v1/admin/cars")
  
          return {brand,model,cars}
        
        }
      },
      {
        path: "/cars/:id",
        element: <SingleProduct />,
      },
      {
        path: "/admin",
        element: (
            <Admin />
        ),
        loader:async()=>{
          const  brand =  await fetchHandler("/api/v1/admin/cars/brand")
          const model =  await fetchHandler("/api/v1/admin/cars/model")
          const cars =   await fetchHandler("/api/v1/admin/cars")
          const msgs=   await fetchHandler("/api/v1/admin/msg")
          
          return {brand,model,cars,msgs}
        }
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
