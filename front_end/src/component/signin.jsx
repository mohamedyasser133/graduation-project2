import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";
import { useToken } from "./context";
const SignIn = ({ setAuth, isAuth, setTok }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setAccessToken } = useToken();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:3000/auth/login_provider",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      console.log(response);
      if (response.ok) {
        const data = await response.json();
  
        if (data.message === "Login done") {
          
          localStorage.setItem("token", data.userUpdated.token);
          console.log(data);
          console.log( { token: data.userUpdated.token,id: data.userUpdated.id});

          // Store the token in localStorage
          await setAccessToken( { token: data.userUpdated.token,id: data.userUpdated.id});
          setAuth(true);
          console.log("ddddd");
          navigate("/Homeprovider"); // Navigate to /home on successful login
          console.log("Login successful");
        
        } else {
          setError(data.message);
          console.log("Login failed");
        }
      } else {
        setError("حدث خطأ أثناء محاولة تسجيل الدخول.");
        console.log("Login error:", await response.text());
      }
    } catch (error) {
      setError("حدث خطأ أثناء محاولة تسجيل الدخول.");
      console.log("Login error:", error);
    }
  };
  // useEffect(() => {
   
  //   isAuth && navigate("/Home");
  // }, [isAuth, navigate]);

  return (
    <div className="container">
      <div className="wrapper">
        <div className="head-form">
          <header>
            <h1 className="login">Login Form</h1>
          </header>
        </div>
        <form className="inputs" onSubmit={handleSubmit}>
          <div className="input">
            <i className="bx bxs-user"></i>
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
            <div className="forget">
              <a href="#" rel="">
                Forgot Password?
              </a>
            </div>
            <input type="submit" value="Login" />
          </div>
          <div className="sign-up">
            <p>Not a member?</p>
            <Link to="/signup">Sign-up now</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
