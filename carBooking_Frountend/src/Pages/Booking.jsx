import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUserBookings } from '../slices/userSlice';
import { fetchHandler } from "../utils/handlers"
import MsgComponent from '../components/MsgComponent';
import UserMsgBox from "../components/UserMsgBox"

export default function Booking() {

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const { loggedUser, userBookings } = useSelector((state) => state.user)
    const [loading, setLoading] = useState(false)
    const { loggedAdmin } = useSelector((state) => state.cars)



    useEffect(() => {
        if (!loggedUser) {
            navigate("/login")
        }
        if (loggedAdmin?.role) {
            navigate("/admin")
        }
        async function getBookings() {
            const response = await fetchHandler(`/api/v1/user/booking`);
            dispatch(setUserBookings(response.data.result))
        }
        getBookings();
    }, [loggedUser,loggedAdmin]);



   

    return (
        <>
            {(userBookings && userBookings.length > 0) ?

                <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                    <div className=" ml-9 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                        {userBookings?.length > 0 && userBookings?.map((item) => <UserMsgBox key={item._id} item={item} type="user" />)}
                    </div>
                </div>
                :
                <h3 className='text-3xl italic my-5 mx-5'>No Bookings Available</h3>
            }

        </>

    )
}
