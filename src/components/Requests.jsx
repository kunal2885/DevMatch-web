import React, { useEffect } from 'react'
import axios from "axios";
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addRequests, removeRequest } from '../utils/requestsSlice';

const Requests = () => {
    const dispatch = useDispatch()
    const requests = useSelector((store)=> store.requests)
    const fetchRequests = async ()=>{
        try{
            const res = await axios.get(BASE_URL + "/user/connections/received",{withCredentials :true})
            dispatch(addRequests(res?.data?.data))
        }
        catch(err){
            console.log(err)
        }
    }
    const reviewRequest = async (status , id)=>{
        try{
            const res = await axios.patch(BASE_URL + "/request/review/" + status +"/"+ id,{},{withCredentials : true})
            dispatch(removeRequest(id))    
        }
        catch{
            console.log(err)
        }
    }

    useEffect(()=>{
        fetchRequests()
    },[])

    if(!requests) return;

    if(requests.length === 0) return <h1 className='flex justify-center my-10'>No requests received</h1>

   return (
  <div className="min-h-[calc(100vh-80px)] bg-base-200 px-4 py-10">
    <div className="mx-auto max-w-6xl">
      <h1 className="mb-10 text-center text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        Connection Requests 📩
      </h1>

      <div className="space-y-6">
        {requests.map((request) => {
          const { _id, firstname, lastname, photourl, age, gender, about } =
            request.fromUserId;
            console.log(photourl)

          return (
            <div
              key={_id}
              className="card bg-base-100 border border-base-300 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="card-body">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center">

                  {/* Profile */}
                  <div className="flex flex-col items-center sm:flex-row gap-5 flex-1">
                    <div className="avatar">
                      <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img
                          alt="photo"
                          className="object-cover"
                          src={photourl}
                        />
                      </div>
                    </div>

                    <div className="text-center sm:text-left">
                      <h2 className="text-2xl font-bold">
                        {firstname + " " + lastname}
                      </h2>

                      {age && gender && (
                        <div className="badge badge-primary badge-outline mt-2">
                          {age + ", " + gender}
                        </div>
                      )}

                      <p className="mt-3 text-base-content/70 leading-relaxed max-w-xl">
                        {about}
                      </p>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      className="btn btn-success text-white px-8 hover:scale-105 transition-all duration-300"
                      onClick={() => {
                        reviewRequest("accepted", request._id);
                      }}
                    >
                      ✓ Accept
                    </button>

                    <button
                      className="btn btn-error text-white px-8 hover:scale-105 transition-all duration-300"
                      onClick={() => {
                        reviewRequest("rejected", request._id);
                      }}
                    >
                      ✕ Reject
                    </button>
                  </div>

                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
);
  
}

export default Requests
