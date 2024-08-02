import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import SignIn from "./component/signin.jsx";
import SignUp from "./component/signup.jsx";
import "./component/signup.css";
import Home from "./component/Home.jsx";
import { TokenProvider } from "./component/context.jsx";
import SignInUsre from "./component/signinuser.jsx";
import SignUpUser from "./component/signupuser.jsx";
import Homeprovider from "./component/homeprovider.jsx";
import Chatbot from "./component/chatbot.jsx";


function App() {
  
  const [isAuth, setAuth] = useState(false);
  const [tok, setTok] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuth(true);
    }
  }, []);
  return (
    <>
      <TokenProvider>
        <BrowserRouter>
          <Routes>
            {
              <Route
                path="/signin"
                element={<SignIn setAuth={setAuth} setTok={setTok} />}
              />
            }
            {
              <Route
                path="/signinuser"
                element={<SignInUsre setAuth={setAuth} setTok={setTok} />}
              />
            }
             {
              <Route
                path="/signupuser"
                element={<SignUpUser setAuth={setAuth} setTok={setTok} />}
              />
            }
            {<Route path="/Home" element={<Home tok={tok} isAuth={isAuth} />} />}
            {<Route path="/Homeprovider" element={<Homeprovider tok={tok} isAuth={isAuth} />} />}
            {
              <Route
                path="/signup"
                element={
                  <SignUp setAuth={setAuth} isAuth={isAuth} setTok={setTok} />
                }
              />
            }
               {
              <Route
                path="/Chatbot"
                element={<Chatbot/>}
              />
            }
          </Routes>
        </BrowserRouter>
      </TokenProvider>
    </>
  );
}

export default App;
