import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Header from "./components/Header";
import Home from "./components/Home";
import Register from "./components/register";
import Profile from "./components/Profile";
import Search from "./components/Search";
import { useRecoilState } from "recoil";
import { UserState } from "./store/UserState";
import authService from "./services/auth.service";

function App() {
  const currentUser = authService.getCurrentUser();
  console.log(currentUser);

  return (
    <>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            currentUser !== null? <Navigate replace to="/" /> : <Login />
          }
        />
        <Route path="/signup" element={  currentUser? <Navigate replace to="/" /> : <Register />} />
        <Route
          path="/profile"
          element={
            currentUser ? (
              <Profile />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
        <Route
          path="/search"
          element={
            currentUser? (
              <Search />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
      </Routes>
    </>
  );
}

export default App;
