import React from "react";
import {Link} from "react-router-dom"

export default function MsgComponent({ item }) {
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  return (
    <>
      <div class=" border border-gray-200  bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between ">
        <div class="mb-8">
          <p class="text-sm text-gray-600 flex items-center">
            Brand : {item.brand}
          </p>
          <div class="text-gray-900 font-bold text-xl mb-2">
            Model : {item.model}
          </div>
        

          <p class="text-gray-700  text-2xl">{item.carnumber.toUpperCase()}</p>
        </div>
        <div class="flex items-center">
          <img
            class="w-25 h-25 rounded-full mr-4"
            src={`${item.image}`}
            alt="Avatar of Jonathan Reinink"
          />
        </div>
          <div class="text-sm my-3">
            <p class="text-blue-600 leading-none">
              Start Date : {new Date(item.startdate).toLocaleDateString()}
            </p>
            <p class="my-2 text-blue-700">
              End Date : {new Date(item.enddate).toLocaleDateString()}
            </p>
          </div>
        <div className="border border-green-200 p-5 uppercase">
            <p className="font-bold">Booking User details :</p>
            <p class=" my-2text-sm text-gray-700 flex items-center">
              User Name : {item.name}
            </p>
           <Link to={`mailto:${item.email}`}> <p class=" my-2text-sm text-gray-700 flex items-center">
              email : {item.email}
            </p></Link>
            <Link to={`tel:${item.mobile}`}> <p class=" my-2text-sm text-gray-700 flex items-center">
              mobile : {item.mobile}
            </p></Link>

            <p class=" my-2text-sm text-gray-700 flex items-center">
              Address : {item.address}
            </p>

          </div>
      </div>
    </>
  );
}
