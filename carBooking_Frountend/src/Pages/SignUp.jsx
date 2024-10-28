import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { clearInputs, inputHandler, setLoggedUser } from "../slices/userSlice"
import { fetchHandler } from "../utils/handlers"
import { useDispatch, useSelector } from "react-redux"

import {toast} from "react-toastify"
import HashLoader from 'react-spinners/HashLoader';
import { setLoggedAdmin } from '../slices/carSlice';

function Signup() {

  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { email, username, password, mobile } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loggedUser } = useSelector(state => state.user)
  const { loggedAdmin } = useSelector(state => state.cars)


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


  async function handleSubmit(e) {
    e.preventDefault();
    if (!email) setError((prev) => {

      
      return { ...prev, email: "email is required" }
    })
    if (!username) setError((prev) => {
      return { ...prev, username: "username is required" }
    })
    if (!password) setError((prev) => {
      return { ...prev, password: "password is required" }
    })
    if (!mobile) setError((prev) => {
      return { ...prev, mobile: "mobile is required" }
    })

    if(email){
      const validEmailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
      const result = validEmailPattern.test(email)
      if(!result){
        setError((prev) => {
          return { ...prev, email: "please Enter Valid Email" }
        })
        return;
      }
      
    }

    if(mobile){
      if(mobile.length<10 || mobile.length>10){
        setError((prev) => {
          return { ...prev, mobile: "mobile is must be 10 digit" }
        })
        return
      }
    }

    if (username) {
      const validatename = /^[a-zA-Z0-9_]+$/;
      const result = validatename.test(username);
      if (!result) {
        setError((prev) => {
          return {
            ...prev,
            username: "Enter valid username only alphabet, number's and _ allowed ",
          };
        });
        return;
      }
    }

    if (!email || !mobile || !password || !username) return

    const formData = {
      email, mobile, password, username
    }

    setIsLoading(true)
      const response = await fetchHandler("/api/v1/user/register", "post", formData);
    setIsLoading(false)

      if(response.status < 400){
        toast.success(response.data.msg)
        dispatch(clearInputs())
        navigate("/login")
      }else{
        toast.error(response.response.data.msg)

      }



  }

  return (
    <>
      <div className="font-[sans-serif] bg-white max-w-4xl flex items-center mx-auto md:h-screen p-2">
        <div className="grid md:grid-cols-3 items-center shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-xl overflow-hidden">
          <div className="max-md:order-1 flex flex-col justify-center space-y-16 max-md:mt-16 min-h-full bg-gradient-to-r from-slate-500 to-slate-800 lg:px-8 px-4 py-4">
            <div>
              <h4 className="text-white text-lg font-semibold">Create Your Account</h4>
              <p className="text-[13px] text-gray-300 mt-3 leading-relaxed">Welcome to our registration page! Get started by creating your account.</p>
            </div>

          </div>

          <form onSubmit={handleSubmit} className="md:col-span-2 w-full py-6 px-6 sm:px-16">
            <div className="mb-6">
              <h3 className="text-gray-800 text-2xl font-bold">Create an account</h3>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Name <span className='text-red-500'>*</span></label>
                <div className="relative flex items-center">
                  <input name="username" type="text" value={username} onChange={(e) =>
                    dispatch(
                      inputHandler({ name: e.target.name, value: e.target.value })
                    )
                  } className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500" placeholder="Enter name" />
                </div>
                {error?.username && <p className='text-red-500'>{error.username}</p>}
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">Email Id <span className='text-red-500'>*</span></label>
                <div className="relative flex items-center">
                  <input name="email" type="email" value={email} onChange={(e) =>
                    dispatch(
                      inputHandler({ name: e.target.name, value: e.target.value })
                    )
                  } className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500" placeholder="Enter email" />

                </div>
                {error?.email && <p className='text-red-500'>{error.email}</p>}

              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Enter Mobile Number <span className='text-red-500'>*</span></label>
                <div className="relative flex items-center">
                  <input name="mobile" type="number"   value={mobile} onChange={(e) =>
                    dispatch(
                      inputHandler({ name: e.target.name, value: e.target.value })
                    )
                  } className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500" placeholder="Enter email" />

                </div>
                {error?.mobile && <p className='text-red-500'>{error.mobile}</p>}

              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">Password <span className='text-red-500'>*</span></label>
                <div className="relative flex items-center">
                  <input name="password" type="password" value={password} onChange={(e) =>
                    dispatch(
                      inputHandler({ name: e.target.name, value: e.target.value })
                    )
                  } className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500" placeholder="Enter password" />

                </div>
                {error?.password && <p className='text-red-500'>{error.password}</p>}

              </div>


            </div>

            <div className="!mt-12">
             {isLoading ? <HashLoader color="green"/> : <button type="submit" onSubmit={handleSubmit} className="w-full py-3 px-4 tracking-wider text-sm rounded-md text-white bg-slate-700 hover:bg-gray-800 focus:outline-none">
                Create an account
              </button>}
            </div>
            <p className="text-gray-800 text-sm mt-6 text-center">Already have an account? <Link to="/login" className="text-slate-600 font-semibold hover:underline ml-1">Login here</Link></p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
