import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
//pages
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import ForgotPass from "./pages/forgotpass";
import SocketContext from "./context/SocketContext";

const socket = io(process.env.REACT_APP_CLEAN_API_ENDPOINT);
//In case Server endpoint changes in dev/prod enviornments - we shouldn't split the api endpoint
function App() {
  const { user } = useSelector((state) => state.user);
  const token = user.token;
  console.log()
  return (
    <SocketContext.Provider value={socket}>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        {/* //TODO - Make sure to implement a way to register the user to db */}
        <div className="">
          <Router>
            <Routes>
              <Route
                exact
                path="/"
                element={
                  token ? <Home socket={socket} /> : <Navigate to="/login" />
                }
              />
              <Route
                exact
                path="/login"
                element={!token ? <Login /> : <Navigate to="/" />}
              />
              <Route
                exact
                path="/register"
                element={!token ? <Register /> : <Navigate to="/" />}
              />
              <Route exact path="/forgotPass" element={<ForgotPass />} />
            </Routes>
          </Router>
        </div>
      </GoogleOAuthProvider>
    </SocketContext.Provider>
  );
}

export default App;
