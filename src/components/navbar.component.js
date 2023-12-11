import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark  navbar-expand-lg px-4">
        <Link to="/" className="navbar-brand">
          <img src="/logo.png" className="img_logo" width="40" height="40" alt="Exercise Tracker" />
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <div className="nav-btn">
                <Link to="/" className="nav-link">
                  Exercises
                </Link>
              </div>
            </li>
            <li className="navbar-item">
              <div className="nav-btn">
                <Link to="/create" className="nav-link">
                  Create-Exercise-Log
                </Link>
              </div>
            </li>
            <li className="navbar-item">
              <div className="nav-btn">
                <Link to="/user" className="nav-link">
                  Create-User
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
