import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header-container">
      <div className="header">
        <div className="header-title">
          <h2>Flatiron Restaurant</h2>
        </div>
        <div className="list">
          <li className="li-child">
            <Link className="li-link" to="/">
              Home
            </Link>
          </li>
          <li className="li-child">
            <Link className="li-link" to="/menu">
              Menu
            </Link>
          </li>
          <li className="li-child">
            <Link className="li-link" to="/reviews">
              Reviews
            </Link>
          </li>
        </div>
      </div>
    </div>
  );
}

export default Header;
