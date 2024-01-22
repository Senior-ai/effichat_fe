import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./features/userSlice";
function App() {;
  const {user} = useSelector((state) => state.user);
  return (
    <div className="">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
