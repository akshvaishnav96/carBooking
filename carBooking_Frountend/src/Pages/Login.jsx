import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link, redirect, useLocation, useNavigate } from "react-router-dom";
import { clearInputs, inputHandler, setLoggedUser } from "../slices/userSlice";
import { fetchHandler } from "../utils/handlers";
import {toast} from "react-toastify"
import { setLoggedAdmin } from "../slices/carSlice";


function Login() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {loggedUser } = useSelector(state => state.user)
  const { loggedAdmin } = useSelector(state => state.cars)
  useEffect(()=>{
  if(loggedAdmin?.username) return navigate("/admin")
    if(loggedUser?.username) return navigate("/")
  },[])


  const [error, setError] = useState({});


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
      const response = await fetchHandler("/api/v1/user/login", "post", formData);



      if(response.status){
       if( response?.result?.role === "user" ){
        dispatch(setLoggedUser(response.result))
        dispatch(clearInputs())
        toast.success("User login successfully ")
        return navigate("/")

      }else{
        dispatch(setLoggedAdmin(response.result))
        dispatch(clearInputs())
        toast.success("Admin login successfully ")
        return navigate("/admin")
       }
      }else{
      toast.error("something went wrong while login")

      }
    } catch (error) {
      console.log(error.message);
      
      toast.error("something went while while login")

    }


  }




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
              required
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
              required
              className=" p-2 block w-full rounded-md border-0 py-1.5 mb-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          {error?.password && <p className='text-red-500'>{error.passowrd}</p>}

        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-slate-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
          >
            Sign in
          </button>
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
