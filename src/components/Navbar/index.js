import React from "react";
import { useHistory } from "react-router-dom";
import {useSelector } from "react-redux";
import "./navbar.css";

export default function Navbar() {
  const history = useHistory();
  const user = useSelector(state => state.user);
  return (
    <div className="navbar">
      <div
        className="user"
        onClick={() => {
          history.push("/user");
        }}
      >
        <div className=" user-pic">
          <span className="material-icons">account_circle</span>
        </div>

        <p>{user.name}</p>
      </div>
    </div>
  );
}
