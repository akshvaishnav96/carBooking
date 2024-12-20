import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link, redirect, useLocation, useNavigate } from "react-router-dom";
import { clearInputs, inputHandler, setLoggedUser } from "../slices/userSlice";
import { fetchHandler } from "../utils/handlers";
import { toast } from "react-toastify"
import { setLoggedAdmin } from "../slices/carSlice";
import HashLoader from 'react-spinners/HashLoader';
import Cookies from 'js-cookie';



function Login() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loggedUser } = useSelector(state => state.user)
  const { loggedAdmin } = useSelector(state => state.cars)



  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { email, password } = useSelector(state => state.user)

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email) setError((prev) => {
      return { ...prev, email: "email is required" }
    })

    if (!password) setError((prev) => {
      return { ...prev, password: "password is required" }
    })

    if (!email || !password) return

    const formData = {
      email, password
    }




    try {
      setIsLoading(true)
      const response = await fetchHandler("/api/v1/user/login", "post", formData);
      setIsLoading(false)


      // if (response.status === 302) {
      //   localStorage.setItem("user", JSON.stringify(response?.response.data.result))
      //   if (response?.response.data.result.role === "user") {
      //     dispatch(setLoggedUser(response?.response.data.result))
      //     return navigate("/")
      //   } else {
      //     dispatch(setLoggedAdmin(response?.response.data.result))
      //     return navigate("/admin")
      //   }
      // }

      if (response.status<400) {
        if (response.data.result?.role === "user") {

          localStorage.setItem("user", JSON.stringify(response.data.result))

          dispatch(setLoggedUser(response.data.result))
          dispatch(clearInputs())
          toast.success("User login successfully ")
          return navigate("/")

        } else {
          localStorage.setItem("user", JSON.stringify(response.data.result))

          dispatch(setLoggedAdmin(response.data.result))

          dispatch(clearInputs())
          toast.success("Admin login successfully ")
          return navigate("/admin")
        }
      } else {
        toast.error(response.response.data.msg)
      }
    } catch (error) {

      toast.error("something went while while login")

    }


  }

  useEffect(()=>{

  dispatch(clearInputs())
    let loggedData = JSON.parse(localStorage.getItem("user"));
  
    if(loggedData){
      
        if(loggedData.role === "admin"){
          navigate("/admin")
        }

        if(loggedData.role === "user"){
          navigate("/")
        }
    }
  
   
  
   },[loggedUser,loggedAdmin])


  useEffect(() => {
      async function logginCheckHandler() {
        try {
          const logged = await fetchHandler("/api/v1/logincheck");
  
          if (logged.status === 401) {
            dispatch(setLoggedUser(""));
            dispatch(setLoggedAdmin(""));
            localStorage.removeItem("user");
            return;
          }
  
          if (logged.status === 200) {
            if (logged.data.result.role === "user") {
              dispatch(setLoggedUser(logged.data.result));
            }
  
            if (logged.data.result.role === "admin") {
              dispatch(setLoggedAdmin(logged.data.result));
            }
  
            localStorage.setItem("user", JSON.stringify(logged.data.result));
          }
        } catch (error) {
          console.log(error.message);
        }
      }
  
      logginCheckHandler();
    }, []);
  return (

    <form
      onSubmit={handleSubmit}
      className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8"
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Log in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              onChange={(e) =>
                dispatch(
                  inputHandler({ name: e.target.name, value: e.target.value })
                )
              }
              value={email}
              
              className=" p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          {error?.email && <p className='text-red-500'>{error.email}</p>}

        </div>

        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>
          </div>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              onChange={(e) =>
                dispatch(
                  inputHandler({ name: e.target.name, value: e.target.value })
                )
              }
              value={password}
              
              className=" p-2 block w-full rounded-md border-0 py-1.5 mb-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          {error?.password && <p className='text-red-500'>{error.password}</p>}

        </div>

        <div>
          {isLoading ? <HashLoader color="green"/> :<button
            type="submit"
            className="flex w-full justify-center rounded-md bg-slate-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
          >
            Sign in
          </button>}
        </div>

        <p className="mt-10 text-center text-md text-gray-500 mr-4">
          Access to user
          <Link
            to="/signUp"
            className="font-semibold leading-6 text-slate-600 hover:text-cyan-500 ml-2"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </form>

  );
}

export default Login;
