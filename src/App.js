import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./features/userSlice";

function App() {
  const { user } = useSelector((state) => state.user);
  const {token} = user;
  return (
    <GoogleOAuthProvider clientId='519818168820-ur4sjskhrpkv7kkdhidlipgpdvcdeh93.apps.googleusercontent.com'> 
    //TODO - Make sure to change it to process.env,var and implement a way to register the user to db
      <div className="">
        <Router>
          <Routes>
            <Route exact path="/" element={token? <Home /> : <Navigate to='/login'/>} />
            <Route exact path="/login" element={!token? <Login /> : <Navigate to='/'/>} />
            <Route exact path="/register" element={!token? <Register /> : <Navigate to='/'/>} />
          </Routes>
        </Router>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
