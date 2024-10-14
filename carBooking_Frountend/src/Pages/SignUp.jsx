import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { clearInputs, inputHandler } from "../slices/userSlice"
import { fetchHandler } from "../utils/handlers"
import { useDispatch, useSelector } from "react-redux"


function Signup() {

  const [error, setError] = useState({});

  const { email, username, password, mobile } = useSelector(state => state.user)
  const dispatch = useDispatch()

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

    if (!email || !mobile || !password || !username) return

    const formData = {
      email, mobile, password, username
    }


    try {
      const response = await fetchHandler("/api/v1/user/register", "post", formData);

      dispatch(clearInputs())
    } catch (error) {
      console.log(error);

    }


  }

  return (
    <>
      {console.log(error)}
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
              <button type="submit" onSubmit={handleSubmit} className="w-full py-3 px-4 tracking-wider text-sm rounded-md text-white bg-slate-700 hover:bg-gray-800 focus:outline-none">
                Create an account
              </button>
            </div>
            <p className="text-gray-800 text-sm mt-6 text-center">Already have an account? <Link to="/login" className="text-slate-600 font-semibold hover:underline ml-1">Login here</Link></p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
