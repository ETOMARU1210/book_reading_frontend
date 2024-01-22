import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Header from "./components/Header";
import Home from "./components/Home";
import Register from "./components/register";
import Profile from "./components/Profile";
import Footer from "./components/Footer";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import { Link as Scroll } from "react-scroll";
import Search from "./components/Search";


function App() {
  const [isButtonActive, setIsButtonActive] = useState(false);

  const returnTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollWindow);
    return () => {
      window.removeEventListener("scroll", scrollWindow);
    };
  }, []);

  const scrollWindow = () => {
    const top = 200;
    let scroll = 0;
    scroll = window.scrollY;
    if (top <= scroll) {
      setIsButtonActive(true);
    } else {
      setIsButtonActive(false);
    }
  };

  const normalStyle = {
    opacity: 0,
    transition: "0.5s",
    pointerEvents: "none",
    position: "fixed",
    right: "4rem",
    bottom: "2.5rem",
    fontSize: 100,
  };
  const activeStyle = {
    opacity: 1,
    transition: "0.5s",
    position: "fixed",
    right: "4rem",
    bottom: "2.5rem",
    fontSize: 100,
  };

  const style = isButtonActive ? activeStyle : normalStyle;

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/search" element={<Search />} />
      </Routes>
      <ArrowCircleUpIcon style={style} onClick={returnTop}>
        <Scroll to="Home" smooth={true} duration={500}></Scroll>
      </ArrowCircleUpIcon>
      <Footer />
    </>
  );
}

export default App;
