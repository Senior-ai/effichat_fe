import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./features/userSlice";


function App() {
  const { user } = useSelector((state) => state.user);
  return (
    <GoogleOAuthProvider clientId='519818168820-ur4sjskhrpkv7kkdhidlipgpdvcdeh93.apps.googleusercontent.com'>
      <div className="">
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
          </Routes>
        </Router>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
