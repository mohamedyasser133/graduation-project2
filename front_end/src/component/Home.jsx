import { useState } from "react";
import Cards from "./card";
import NavBar from "./navbar";
import Profile from "./profile";
import Myorder from "./myorder";
import "./Home.css";
import { useNavigate, Link } from "react-router-dom";
import Footer from "./Footer";

export default function Home({ tok, isAuth }) {
  const [state, setState] = useState("home");

  // Calculate height dynamically
  const homeContainerStyle = {
    minHeight: `calc(100vh - 64px - 56px)` // Adjust based on your Navbar and Footer height
  };

  return (
    <>
      {isAuth && (
        <div className="home-container1">
          <NavBar setState={setState} />
          <div className="home-container" style={homeContainerStyle}>
            {state === "home" && <Cards tok={tok} />} {/* Cards component to expand height */}
            {state === "profile" && <Profile setState={setState} />}
            {state === "myorder" && <Myorder />}
          </div>
          <div className="chatbutton">
            <Chatbotbutton />
          </div>
          <Footer />
        </div>
      )}
    </>
  );
}

function Chatbotbutton() {
  const navigate = useNavigate();
  function handelclick() {
    navigate("/Chatbot");
  }
  return (
    <>
      <button type="button" class="btn btn-light " onClick={handelclick}>
        <i class="bi bi-robot fs-1"></i>
      </button>
    </>
  );
}
