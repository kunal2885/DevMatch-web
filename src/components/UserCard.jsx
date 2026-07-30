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
    <div className="card w-96 bg-base-300 shadow-sm mx-auto overflow-hidden my-10">
  <figure className="w-full h-80">
    <img
      src={user.photourl}
      alt="user photo"
      className="w-full h-full object-cover"
    />
  </figure>

  <div className="card-body p-5 space-y-3">
    <h2 className="card-title text-center justify-center">
      {user.firstname + " " + user.lastname}
    </h2>

    {user.age && user.gender && (
      <p className="text-center">
        {user.age + " " + user.gender}
      </p>
    )}

    <p className="text-center">{user.about}</p>

    <div className="card-actions justify-center gap-4 mt-4">
      <button className="btn btn-primary px-6" onClick={()=> sendRequest("ignored",user._id)}>
        Ignore
      </button>
      <button className="btn btn-secondary px-6"  onClick={()=> sendRequest("interested",user._id)}>
        Interested
      </button>
    </div>
  </div>
</div>
  )
}

export default UserCard
