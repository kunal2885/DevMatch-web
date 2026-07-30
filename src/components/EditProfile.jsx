import React, { useEffect, useState } from 'react'
import UserCard from './UserCard'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'



const EditProfile = ({user}) => {
    const dispatch = useDispatch()
    const [firstname , setFirstname] = useState(user.firstname)
    const [lastname, setLastname] = useState(user.lastname)
    const [age, setAge] = useState(user.age || "")
    const [gender , setGender] = useState(user.gender || "")
    const [photourl , setPhotourl] = useState(user.photourl || "")
    const [about,setAbout] = useState(user.about || "")
    const [error, setError] = useState("")
    const [toast , setToast] = useState(false)

    const saveProfile = async ()=>{
        setError("")
        try{
        
        const res = await axios.patch(BASE_URL + "/profile/edit",{firstname,
        lastname,
        age,
        gender,
        photourl,
        about},{withCredentials : true})
        
        

        dispatch(addUser(res.data.updatedprofile));
        setToast(true)
        setTimeout(()=>{
          setToast(false)
        },4000)


        
    }
    catch(err){
       setError(err?.response?.data)


    }
}

    

  return (
    <> 
        <div className="flex justify-center items-start gap-10 my-10 flex-wrap">
  {/* Edit Profile Card */}
  <div className="card bg-base-300 w-full max-w-md shadow-xl mb-8">
    <div className="card-body">
      <h2 className="card-title justify-center text-2xl font-bold mb-4">
        Edit Profile
      </h2>

      <div className="space-y-3">
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text font-medium">First Name</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text font-medium">Last Name</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text font-medium">Age</span>
          </div>
          <input
            type="number"
            className="input input-bordered w-full"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text font-medium">Gender</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text font-medium">Photo URL</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full"
            value={photourl}
            onChange={(e) => setPhotourl(e.target.value)}
          />
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text font-medium">About</span>
          </div>
          <textarea
            className="textarea textarea-bordered h-28 w-full resize-none"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />
        </label>
      </div>

      <p className="text-red-500 text-center mt-2"> {error}</p>

      <div className="card-actions justify-center mt-5">
        <button className="btn btn-primary w-full " onClick={saveProfile}>
          Save Profile
        </button>
      </div>
    </div>
  </div>

  {/* Preview Card */}
  <div className="w-full max-w-sm">
    <UserCard user={{
    ...user,
    firstname,
    lastname,
    age,
    gender,
    photourl,
    about,
  }} />
  </div>
</div>

{toast && <div className="toast toast-top toast-center">
  
  <div className="alert alert-success">
    <span>Profile updated successfully</span>
  </div>
</div>}

</>
  )
}

export default EditProfile
