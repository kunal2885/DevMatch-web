import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      // Error logic maybe redirect to error page
      console.error(err);
    }
  };

 return (
  <div className="navbar bg-base-100 border-b border-base-300 shadow-md px-4 md:px-8 sticky top-0 z-50 backdrop-blur-lg bg-base-100/90">
    <div className="flex-1">
      <Link
        to="/"
        className="text-2xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hover:scale-105 transition-transform duration-300"
      >
        DevTinder
      </Link>
    </div>

    {user && (
      <div className="flex items-center gap-3 md:gap-5">
        <div className="hidden sm:flex items-center">
          <p className="text-sm md:text-base font-medium text-base-content">
            Welcome,
            <span className="text-primary font-bold ml-1">
              {user.firstname}
            </span>
          </p>
        </div>

        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar hover:scale-105 transition-all duration-300"
          >
            <div className="w-11 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img alt="user photo" src={user.photourl} />
            </div>
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-4 z-[100] w-60 rounded-2xl bg-base-100 shadow-2xl border border-base-300 p-2"
          >
            <li>
              <Link
                to="/profile"
                className="rounded-lg hover:bg-primary hover:text-primary-content transition-all duration-200"
              >
                👤 Profile
              </Link>
            </li>

            <li>
              <Link
                to="/connections"
                className="rounded-lg hover:bg-primary hover:text-primary-content transition-all duration-200"
              >
                🤝 Connections
              </Link>
            </li>

            <li>
              <Link
                to="/requests"
                className="rounded-lg hover:bg-primary hover:text-primary-content transition-all duration-200"
              >
                📩 Requests
              </Link>
            </li>

            <div className="divider my-1"></div>

            <li>
              <a
                onClick={handleLogout}
                className="rounded-lg text-error hover:bg-error hover:text-error-content transition-all duration-200"
              >
                🚪 Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    )}
  </div>
);
};
export default NavBar;