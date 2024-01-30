import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Header from "./components/Header";
import Home from "./components/Home";
import Register from "./components/register";
import Profile from "./components/Profile";
import Search from "./components/Search";
import {
  RecoilRoot
} from 'recoil';
import authService from "./services/auth.service";


function App() {

  const loggedIn = authService.getCurrentUser();

  return (
    <RecoilRoot>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={loggedIn ? <Navigate replace to="/" /> : <Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/profile" element={loggedIn ? <Profile /> : <Navigate replace to="/login" />} />
        <Route path="/search" element={loggedIn ? <Search /> : <Navigate replace to="/login" /> } />
      </Routes>
    </RecoilRoot>
  );
}

export default App;
