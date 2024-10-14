import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../components/Card';
import { Link, useLoaderData } from 'react-router-dom';
import { setMsgData } from '../slices/carSlice';
import MsgComponent from '../components/MsgComponent';

export default function Cart() {

  const msgs  = useLoaderData();
  const dispatch = useDispatch();

  
  
  const { msgData } = useSelector((state) => state.cars);


  useEffect(()=>{
    dispatch(setMsgData(msgs.result))
  },[msgData])


  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
     <div className=" ml-9 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {msgData?.length>0 && msgData?.map((item)=> <MsgComponent item={item}/>)}
      </div>
      </div>
          
  );
}
