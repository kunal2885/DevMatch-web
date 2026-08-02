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
    const [age, setAge] = useState(user.age?.age)
    const [gender , setGender] = useState(user.gender?.gender)
    const [photourl , setPhotourl] = useState(user.photourl)
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
    <div className="min-h-[calc(100vh-80px)] bg-base-200 px-4 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-center gap-10 lg:flex-row lg:items-start">
        
        {/* Edit Profile Card */}
        <div className="card w-full max-w-xl bg-base-100 shadow-2xl border border-base-300">
          <div className="card-body p-8">
            <h2 className="text-center text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6">
              Edit Profile ✨
            </h2>

            <div className="space-y-5">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-semibold">
                    First Name
                  </span>
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full focus:input-primary"
                  placeholder="Enter your first name"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </label>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-semibold">
                    Last Name
                  </span>
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full focus:input-primary"
                  placeholder="Enter your last name"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />
              </label>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text font-semibold">Age</span>
                  </div>
                  <input
                    type="number"
                    className="input input-bordered w-full focus:input-primary"
                    placeholder="Age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </label>

                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text font-semibold">Gender</span>
                  </div>
                  <input
                    type="text"
                    className="input input-bordered w-full focus:input-primary"
                    placeholder="Gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  />
                </label>
              </div>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-semibold">
                    Photo URL
                  </span>
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full focus:input-primary"
                  placeholder="Paste image URL"
                  value={photourl}
                  onChange={(e) => setPhotourl(e.target.value)}
                />
              </label>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-semibold">About</span>
                </div>
                <textarea
                  className="textarea textarea-bordered h-32 w-full resize-none focus:textarea-primary"
                  placeholder="Tell others something about yourself..."
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
              </label>
            </div>

            {error && (
              <p className="mt-4 text-center text-sm font-medium text-error">
                {error}
              </p>
            )}

            <div className="card-actions mt-8">
              <button
                className="btn btn-primary w-full text-base font-semibold hover:scale-[1.02] transition-all duration-300"
                onClick={saveProfile}
              >
                Save Profile
              </button>
            </div>
          </div>
        </div>

        {/* Preview Card */}
        <div className="w-full max-w-sm lg:sticky lg:top-24">
          <UserCard
            user={{
              ...user,
              firstname,
              lastname,
              age,
              gender,
              photourl,
              about,
            }}
          />
        </div>
      </div>
    </div>

    {toast && (
      <div className="toast toast-top toast-center z-[100]">
        <div className="alert alert-success shadow-xl">
          <span>🎉 Profile updated successfully</span>
        </div>
      </div>
    )}
  </>
);
}

export default EditProfile
