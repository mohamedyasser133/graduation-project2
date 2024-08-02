import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useToken } from "./context";
const SignUpUser = ({ setAuth , setTok }) => {
   
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const {accessToken, setAccessToken } = useToken();
  const navigate = useNavigate(); 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:3000/auth/signUP",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({userName ,email, password}),
        }
      );
      if (response.ok) {
        const data = await response.json();
     
        console.log("ddddd");
        navigate("/Home");
        console.log(data);
 await setAccessToken( {token:data.savedUser.token, id :data.savedUser._id});
 console.log(accessToken)
      } else {
        console.error("Failed to send data");
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <div className="container">
      <div className="wrapper">
        <div className="head-form">
          <header>
            <h1 className="login">Sign Up Form</h1>
          </header>
        </div>
        <form className="inputs" onSubmit={handleSubmit}>
          <div className="input">
            <i className="bx bxs-user"></i>
            <input
              type="text"
              placeholder="Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div className="input">
            <i className="bx bxs-envelope"></i>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input">
            <i className="bx bxs-lock-alt"></i>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <div className="input btn">
            <input type="submit" value="Sign Up" />
          </div>
          <div className="sign-up">
            <p>Already a member?</p>
            <Link to="/signin">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpUser;
