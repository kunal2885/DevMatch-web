import React from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { removeUserFromFeed } from '../utils/feedSlice'
import axios from 'axios'

const UserCard = ({user}) => {
    const dispatch = useDispatch()

  const sendRequest = async (status,id)=>{
        const res = await axios.post(BASE_URL + "/request/send/" + status + "/" + id,{},{withCredentials : true})
        dispatch(removeUserFromFeed(id))

  }
    
  return (
  <div className="card w-full max-w-sm bg-base-100 border border-base-300 shadow-2xl overflow-hidden mx-auto my-10 hover:shadow-primary/20 hover:-translate-y-2 transition-all duration-300">
    
    <figure className="relative h-[420px] overflow-hidden">
      <img
        src={user.photourl}
        alt="user photo"
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

      {/* Name on Image */}
      <div className="absolute bottom-5 left-5 text-white">
        <h2 className="text-3xl font-bold">
          {user.firstname + " " + user.lastname}
        </h2>

        {user.age && user.gender && (
          <div className="badge badge-primary badge-lg mt-2">
            {user.age + " • " + user.gender}
          </div>
        )}
      </div>
    </figure>

    <div className="card-body px-6 py-5">

      <p className="text-center text-base-content/70 leading-relaxed min-h-[70px]">
        {user.about}
      </p>

      <div className="divider my-1"></div>

      <div className="card-actions justify-center gap-4 mt-2">
        <button
          className="btn btn-outline btn-error flex-1 hover:scale-105 transition-all duration-300"
          onClick={() => sendRequest("ignored", user._id)}
        >
          ❌ Ignore
        </button>

        <button
          className="btn btn-primary flex-1 hover:scale-105 transition-all duration-300"
          onClick={() => sendRequest("interested", user._id)}
        >
          ❤️ Interested
        </button>
      </div>
    </div>
  </div>
);
}

export default UserCard
