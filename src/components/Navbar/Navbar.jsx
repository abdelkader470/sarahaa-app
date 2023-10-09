import React from "react";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import logo from "../../images/logo300.png";
function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container ">
          <Link className="navbar-brand" to={""}>
            <img src={logo} className="w-25" alt="" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span />
            <span />
            <span />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link text-white font" to={"register"}>
                  Register
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white font" to={"/login"}>
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white font" to={"/profile"}>
                  Profile
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
