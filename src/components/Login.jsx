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
  <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-10 bg-base-200">
    <div className="card w-full max-w-md bg-base-100 shadow-2xl border border-base-300">
      <div className="card-body p-8">
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
          {isLoginForm ? "Welcome Back 👋" : "Create Account 🚀"}
        </h2>

        <div className="space-y-4">
          {!isLoginForm && (
            <>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-medium">First Name</span>
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
                  <span className="label-text font-medium">Last Name</span>
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full focus:input-primary"
                  placeholder="Enter your last name"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />
              </label>
            </>
          )}

          <label className="form-control w-full">
            <div className="label">
              <span className="label-text font-medium">Email Address</span>
            </div>
            <input
              type="text"
              className="input input-bordered w-full focus:input-primary"
              placeholder="Enter your email"
              value={emailid}
              onChange={(e) => setEmailId(e.target.value)}
            />
          </label>

          <label className="form-control w-full">
            <div className="label">
              <span className="label-text font-medium">Password</span>
            </div>
            <input
              type="password"
              className="input input-bordered w-full focus:input-primary"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>

        {err && (
          <p className="text-error text-sm text-center font-medium mt-4">
            {err}
          </p>
        )}

        <div className="card-actions mt-6">
          <button
            className="btn btn-primary w-full text-base font-semibold hover:scale-[1.02] transition-all duration-300"
            onClick={isLoginForm ? handleLogin : handleSignUp}
          >
            {isLoginForm ? "Login" : "Sign Up"}
          </button>
        </div>

        <div className="divider text-sm text-base-content/60">OR</div>

        <p
          className="text-center text-sm cursor-pointer hover:text-primary transition-colors duration-300"
          onClick={() => setIsLoginForm((value) => !value)}
        >
          {isLoginForm
            ? "New here? Create an account"
            : "Already have an account? Login"}
        </p>
      </div>
    </div>
  </div>
);
}

export default Login
