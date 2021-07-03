import React, {useState,useEffect} from 'react';
import {useHistory} from "react-router-dom";
import {useDispatch,useSelector} from "react-redux";
import {signIn,logOut,modifyUserData} from "../../action";
import "./userpanel.css";

export default function UserPanel() {
    const user = useSelector(state => state.user);
    const [userName, setUserName] = useState("");
    const [userDetail, setUserDetail] = useState("");
    const [userAddress, setUserAddress] = useState("");
    const history = useHistory();
    const dispatch = useDispatch();
    const userID  = useSelector(state => state.userID);
    const userData = {
        name : userName,
        userDetail,
        userAddress
    };
    
    const handleLogin = (e)=>{
        e.preventDefault();
        dispatch(modifyUserData(userData));
        history.push("/");
    }
    
    useEffect(()=>{
        setUserName(user.name);
        setUserAddress(user.userAddress);
        setUserDetail(user.userDetail);
    },[user])
    return (
        <div className="user-panel">
            {!userID && <button onClick={()=>{dispatch(signIn())}}>Sign In with google</button>}
            {userID && <button onClick={()=>{dispatch(logOut())}}>Log out</button>}
            <form onSubmit={handleLogin}>
                <p>Enter your Name :</p>
                <input type="text" value={userName} required onChange={(e)=>{setUserName(e.target.value)}}/>
                <p>Enter your detail :</p>
                <input type="text" value={userDetail} required onChange={(e)=>{setUserDetail(e.target.value)}}/>
                <p>Enter your address :</p>
                <input type="text" value={userAddress} required onChange={(e)=>{setUserAddress(e.target.value)}}/>
                <div>
                    <button onClick={()=>{history.push("/")}}>Back</button>
                    <button type="submit">Update profile</button>
                </div>
            </form>
        </div>
    )
}
