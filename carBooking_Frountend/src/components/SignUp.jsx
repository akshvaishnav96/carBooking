import React from 'react';
import { Link } from "react-router-dom";


function Signup() {


  async function handleSubmit(e) {
    e.preventDefault();
   
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
              <label className="text-gray-800 text-sm mb-2 block">Name</label>
              <div className="relative flex items-center">
                {/* <input name="name" type="text" required value={name} onChange={(e) => dispatch(nameHandler(e.target.value))} className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500" placeholder="Enter name" /> */}
               
              </div>
            </div>

            <div>
              <label className="text-gray-800 text-sm mb-2 block">Email Id</label>
              <div className="relative flex items-center">
                {/* <input name="email" type="email" required value={email} onChange={(e) => dispatch(emailHandler(e.target.value))} className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500" placeholder="Enter email" /> */}
              
              </div>
            </div>

            <div>
              <label className="text-gray-800 text-sm mb-2 block">Password</label>
              <div className="relative flex items-center">
                {/* <input name="password" type="password" required value={password} onChange={(e) => dispatch(passHandler(e.target.value))} className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500" placeholder="Enter password" /> */}
               
              </div>
            </div>

          
          </div>

          <div className="!mt-12">
            {/* <button type="submit" onSubmit={handleSubmit} className="w-full py-3 px-4 tracking-wider text-sm rounded-md text-white bg-slate-700 hover:bg-gray-800 focus:outline-none">
              Create an account
            </button> */}
          </div>
          <p className="text-gray-800 text-sm mt-6 text-center">Already have an account? <Link to="/login" className="text-slate-600 font-semibold hover:underline ml-1">Login here</Link></p>
        </form>
      </div>
    </div>
    </>
  );
}

export default Signup;
