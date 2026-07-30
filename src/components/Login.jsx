import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import {addUser} from "../utils/userSlice"
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constants'

const Login = () => {
  const [emailid , setEmailId] = useState("")
  const [password , setPassword] = useState("")
  const [firstname, setFirstname] = useState("")
  const [lastname , setLastname] = useState("")
  const [err,setErr] = useState("")
  const [isLoginForm , setIsLoginForm] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
 
    const handleLogin = async ()=>
      { 
         try{
        const res = await axios.post(BASE_URL + "/login",{ emailid, password },{withCredentials : true})
         dispatch(addUser(res.data))
         return navigate("/")
         }
    catch(err){
        setErr(err?.response?.data)

}
      }

    const handleSignUp = async ()=>{

      try{
        const res = await axios.post(BASE_URL + "/signup",{firstname,lastname,emailid,password},{withCredentials : true})

        dispatch(addUser(res?.data?.data))
        return navigate("/profile")

      }
      catch(err){
        setErr(err?.response?.data)
      }
    }
  return (
    <div className="flex justify-center my-10">
  <div className="card bg-base-300 w-96 shadow-xl">
    <div className="card-body">
      <h2 className="card-title justify-center">
        {isLoginForm ? "Login" : "Sign Up"}
      </h2>

      <div>
        {!isLoginForm && <><label className="form-control w-full max-w-xs my-2">
          <div className="label">
            <span className="label-text">First Name</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs"
            value={firstname}
            onChange={(e)=> setFirstname(e.target.value)}
          />
        </label>
        <label className="form-control w-full max-w-xs my-2">
          <div className="label">
            <span className="label-text">Last Name</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs"
            value={lastname}
            onChange={(e)=> setLastname(e.target.value)}
          />
        </label> </>}
        <label className="form-control w-full max-w-xs my-2">
          <div className="label">
            <span className="label-text">Email ID:</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs"
            value={emailid}
            onChange={(e)=> setEmailId(e.target.value)}
          />
        </label>

        <label className="form-control w-full max-w-xs my-2">
          <div className="label">
            <span className="label-text">Password</span>
          </div>
          <input
            type="password"
            className="input input-bordered w-full max-w-xs"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
          />
        </label>
      </div>
      <p className='text-red-500'>{err}</p>

      <div className="card-actions justify-center m-2">
        <button className="btn btn-primary" onClick={isLoginForm ? handleLogin : handleSignUp }>
          {isLoginForm ? "Login" : "Sign Up"}
        </button>
      </div>
      <p className='m-auto my-2 cursor-pointer' onClick={()=> setIsLoginForm((value)=> !value)}>{isLoginForm ? "New User ? Sign Up here" : "Existing user ? Login here"}</p>

      
    </div>
  </div>
</div>
  )
}

export default Login
