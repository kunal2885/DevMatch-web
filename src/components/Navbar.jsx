//import Link from 'daisyui/components/link'
import React from 'react'
import { useSelector} from 'react-redux'
import { Link } from 'react-router-dom'



const Navbar = () => {
  const user = useSelector((state ) => state.user)
  
  return (
    
      <div className="navbar bg-base-300 shadow-sm">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">DevTinder</Link>
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
          <Link to="/profile" className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li>
          <Link>Settings</Link>
        </li>
        <li>
          <Link>Logout</Link>
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
