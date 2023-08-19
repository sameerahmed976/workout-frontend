import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import useAuthContext from "../../Hooks/AuthContext";
import useLogout from "../../Hooks/useLogout";
import { toast } from "react-toastify";

const Layout = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
    toast.success("logout  is successfully", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  return (
    <>
      <header className="header">
        <nav className="navbar">
          <h1 className="logo">
            <img src="/logo.svg" alt="logo" className="logo__icon" />
            <Link to="/" className="logo__heading">
              WT
            </Link>
          </h1>
          <ul className="nav__links">
            {/* <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "active" : "link")}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) => (isActive ? "active " : "link")}
              >
                About
              </NavLink>
            </li> */}

            {user?.username && (
              <>
                <li>
                  <Link to="/aboutMe" className="username">
                    {/* {user.username} */}
                    ME
                  </Link>
                </li>

                <li className="logout">
                  <button className="btn btn--logout" onClick={handleLogout}>
                    Log Out
                  </button>
                </li>
              </>
            )}
            {!user && (
              <>
                <li>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive ? "active " : "link"
                    }
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/signup"
                    className={({ isActive }) =>
                      isActive ? "active " : "link"
                    }
                  >
                    Signup
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
      <Outlet />
    </>
  );
};

export default Layout;
