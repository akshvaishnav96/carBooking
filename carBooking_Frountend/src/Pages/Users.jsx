import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import swal from 'sweetalert';

export default function Users({ item }) {
  const data = useLoaderData();
  const users = data.data.result;


  function deleteUser(){
    swal("Are you sure you want to do this?", {
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this ",
      icon: "warning",
      buttons: true,
      dangerMode: true,
  })
    .then(willDelete => {
      if (willDelete) {

        // swal("Deleted!", "Your imaginary file has been deleted!", "success");
      }
    });
  }

  return (
    <div className="grid grid-cols-4 gap-5 p-5  ">
      {users.map((item) => (
        <>
          <div class=" px-6 py-6  text-center bg-gray-800 rounded-lg lg:mt-0 xl:px-10 relative">
            <div class="space-y-4 xl:space-y-6">
              <div class="space-y-2">
                <div class="flex justify-center items-center flex-col space-y-3 text-lg font-medium leading-6">
                  <h3 class="text-white">Name : {item.username}</h3>
                  <h5 class="text-white">Email : {item.email}</h5>
                  <h5 class="text-white">Mobile : {item.mobile}</h5>
                  <p class="text-indigo-300">Type : {item.role}</p>
                </div>
              </div>
            </div>
            <Link to={`/admin/users/${item._id}`}> <div className=" bg-blue-500 absolute rounded-[50%] p-2 right-[35px] top-[-10px] cursor-pointer hover:bg-blue-700">
              <FaEdit className="text-white flex items-center justify-center  " />
            </div></Link>
            <div onClick={()=>deleteUser(item._id)} className=" bg-red-500 absolute rounded-[50%] p-2 right-[-10px] top-[-10px] cursor-pointer hover:bg-red-700">
              <IoClose className="text-white flex items-center justify-center  " />
            </div>
          </div>
        </>
      ))}
    </div>
  );
}
