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

const socket = io(process.env.REACT_APP_API_ENDPOINT.split("/apiv1")[0]);
//In case Server endpoint changes in dev/prod enviornments - we shouldn't split the api endpoint
function App() {
  const { user } = useSelector((state) => state.user);
  const token = user.token;

  return (
    <GoogleOAuthProvider clientId="519818168820-ur4sjskhrpkv7kkdhidlipgpdvcdeh93.apps.googleusercontent.com">
      {/* //TODO - Make sure to change it to process.env,var and implement a way to register the user to db */}
      <div className="">
        <SocketContext.Provider value={socket}>
          <Router>
            <Routes>
              <Route
                exact
                path="/"
                element={token ? <Home socket={socket}/> : <Navigate to="/login" />}
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
        </SocketContext.Provider>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
