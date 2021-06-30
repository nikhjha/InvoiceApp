import React, {useState} from 'react';
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {logIn} from "../../action";
import "./userpanel.css";

export default function UserPanel() {
    const [userName, setUserName] = useState("");
    const [userDetail, setUserDetail] = useState("");
    const [userAddress, setUserAddress] = useState("");
    const history = useHistory();
    const dispatch = useDispatch();
    const userData = {
        name : userName,
        userDetail,
        userAddress
    }
    return (
        <div className="user-panel">
            <p>Enter your Name :</p>
            <input type="text" value={userName} onChange={(e)=>{setUserName(e.target.value)}}/>
            <p>Enter your detail :</p>
            <input type="text" value={userDetail} onChange={(e)=>{setUserDetail(e.target.value)}}/>
            <p>Enter your address :</p>
            <input type="text" value={userAddress} onChange={(e)=>{setUserAddress(e.target.value)}}/>
            <div>
                <button onClick={()=>{history.push("/")}}>Back</button>
                <button onClick={()=>{dispatch(logIn(userData));history.push("/");}}>Log In</button>
            </div>
        </div>
    )
}
