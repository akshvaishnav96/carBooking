import {useDispatch, useSelector } from 'react-redux';

import MsgComponent from '../components/MsgComponent';
import { useLoaderData } from 'react-router-dom';
import { useEffect } from 'react';
import { setMsgData } from '../slices/carSlice';
import { fetchHandler } from '../utils/handlers';
import { toast } from 'react-toastify';

export default function Cart() {

  const msgs = useLoaderData();
  const dispatch = useDispatch()
  const {msgData} = useSelector(state=>state.cars)


useEffect(()=>{
  if(msgs.status<400){
    dispatch(setMsgData(msgs.data.result))
  }
},[])

async function updateBooking(id) {

  try {

    let url =`/api/v1/admin/cars/msg/${id}`
    const response = await fetchHandler(url, "delete");
    dispatch(setMsgData(response.data.result));
    toast.success("successfully deleted")
  } catch (error) {
    console.log(error.message);
    toast.success("Something went wrong while Deleting")

  }
}

  return (
    <>
    
   {msgData && msgData.length > 0?
   
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
     <div className=" ml-9 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {msgData?.map((item)=> <MsgComponent item={item} key={item._id} updateBooking={updateBooking} />)}
      </div>
      </div>
      :
      <h3 className='text-3xl italic my-5 mx-5'>No messages Available</h3>
    }
          
    </>
  );
}
