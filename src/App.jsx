import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Header from "./components/Header";
import Home from "./components/Home";
import Register from "./components/register";
import Profile from "./components/Profile";
import Search from "./components/Search";
import { useRecoilState } from "recoil";
import authService from "./services/auth.service";
import { UserState } from "./store/UserState";

function App() {
  const [currentUser, ] = useRecoilState(UserState);
  console.log(currentUser)

  return (
    <>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            Object.keys(currentUser).length !== 0? <Navigate replace to="/" /> : <Login />
          }
        />
        <Route path="/signup" element={  Object.keys(currentUser).length !== 0 ? <Navigate replace to="/" /> : <Register />} />
        <Route
          path="/profile"
          element={
            Object.keys(currentUser).length !== 0 ? (
              <Profile />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
        <Route
          path="/search"
          element={
            Object.keys(currentUser).length !== 0 ? (
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
