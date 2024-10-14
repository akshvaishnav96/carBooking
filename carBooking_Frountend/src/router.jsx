import { createBrowserRouter } from "react-router-dom";
import Home from "./Pages/Home"
import Wrapper from "./components/Wrapper";
import SingleProduct from "./Pages/SingleProduct";
import NotFound from "./Pages/NotFound";


import SignUp from "./components/SignUp";
import Login from "./components/Login";
import { fetchHandler } from "./utils/handlers";
import Admin from "./Pages/Admin";
import Msgs from "./Pages/Msgs"
import AdminHeaderWrapper from "./components/AdminHeaderWrapper";
import UplodeBrand from "./components/UplodeBrand";
import UplodeModel from "./components/UplodeModel";
import UplodeCar from "./components/UplodeCar";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Wrapper />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: async () => {

          const brand = await fetchHandler("/api/v1/admin/cars/brand")
          const model = await fetchHandler("/api/v1/admin/cars/model")
          const cars = await fetchHandler("/api/v1/admin/cars")

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
          <AdminHeaderWrapper />
        ),
        children: [
          {
            index: true,
            element: <Admin />,
            loader: async () => {
              const brand = await fetchHandler("/api/v1/admin/cars/brand")
              const model = await fetchHandler("/api/v1/admin/cars/model")
              const cars = await fetchHandler("/api/v1/admin/cars")
              const msgs = await fetchHandler("/api/v1/admin/msg")

              return { brand, model, cars, msgs }
            }
          },

          {
            path: "msgs",
            element: <Msgs />,
            loader: async () => {
              try {
                const msgs = await fetchHandler("/api/v1/admin/msg", "get")
                return msgs
              } catch (error) {
                console.log(error.message);

              }
            }
          },

          {
            path: "brand",
            element: <UplodeBrand />,
            loader: async () => {
              try {
                const msgs = await fetchHandler("/api/v1/admin/msg", "get")
                return msgs
              } catch (error) {
                console.log(error.message);

              }
            }
          },
          {
            path: "model",
            element: <UplodeModel />,
            loader: async () => {
              try {
                const msgs = await fetchHandler("/api/v1/admin/msg", "get")
                return msgs
              } catch (error) {
                console.log(error.message);

              }
            }
          },
          {
            path: "addcar",
            element: <UplodeCar />,
            loader: async () => {
              try {
                const msgs = await fetchHandler("/api/v1/admin/msg", "get")
                return msgs
              } catch (error) {
                console.log(error.message);

              }
            }
          },


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


    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
