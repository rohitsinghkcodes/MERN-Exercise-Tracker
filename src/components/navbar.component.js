import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark navbar-expand-lg px-4">
        <Link to="/" className="navbar-brand">
          <img src="/logo.png" className="img_logo" width="40" height="40" alt="Exercise Tracker" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link nav-btn">
                Exercises
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/create" className="nav-link nav-btn">
                Create Exercise Log
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/user" className="nav-link nav-btn">
                Create User
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
