import React from 'react';
import { useSelector } from 'react-redux';
import Card from '../components/Card';
import { Link } from 'react-router-dom';

export default function Cart() {

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="flex justify-between">
          <h2 className="text-5xl font-bold mb-4">Cart</h2>
        </div>

        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="flex flex-col md:flex-row">
            <div className="flex-1">
              <div className="flex flex-wrap md:flex-row">
                {cartItems.map((item,index) => (
                 
                    <Card key={index} item={item} />
                
                ))}
              </div>
            </div>
            <div className="md:w-1/3 md:ml-4 mt-4 md:mt-0">
              <div className="bg-gray-100 p-4 text-black rounded-lg shadow">
                <h3 className="text-xl font-bold mb-4">Product Summary</h3>
               
                <div className="border-t mt-4 pt-2">

                  <h3 className="text-xl font-bold">Total: {(total*currentCurrencyPrice).toFixed(2)} <span className='text-red-500'>( {currentCurrencyName} )</span></h3>
                 
                </div>
              
              </div>
              <Link to="/cart/checkout"><button className='my-5 bg-yellow-200 p-4 text-black border border-gray-200 rounded-lg shadow w-full hover:bg-yellow-500'>Checkout</button></Link>
            </div>
          </div>
        )}
      </div>
          
    </>
  );
}
