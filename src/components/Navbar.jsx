import React from 'react'
import { useSelector } from 'react-redux'


const Navbar = () => {
  const user = useSelector((state ) => state.user)
  
  return (
    
      <div className="navbar bg-base-300 shadow-sm">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">DevTinder</a>
        </div>
        <div className="flex gap-2">
          
          {
  user && (
    <div className="dropdown dropdown-end mx-5">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost flex items-center gap-3 px-2"
      >
        <p className="font-medium whitespace-nowrap">
          Welcome, {user.firstname}
        </p>

        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={user.photourl}
            alt="Profile"
          />
        </div>
      </div>

      <ul
        tabIndex={-1}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
      >
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li>
          <a>Settings</a>
        </li>
        <li>
          <a>Logout</a>
        </li>
      </ul>
    </div>
  )
}
        </div>
      </div>
    
  )
}

export default Navbar
