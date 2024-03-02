import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SocketContext from "../context/SocketContext.js";
import { getConversations, updateMessages } from "../features/chatSlice.js";
import {
  getConversationId,
  getRelevantName,
  getRelevantPic,
} from "../utils/chat.js";
import { ChatContainer, EffichatHome } from "./../components/Chat/index.js";
import { Sidebar } from "../components/sidebar/index.js";
import { Call } from "../components/Chat/call/Call.jsx";
import Peer from "simple-peer";

const callData = {
  socketId: "",
  receivingCall: false,
  callEnded: false,
  name: "",
  picture: "",
  signal: "",
};

function Home({ socket }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { activeConversation } = useSelector((state) => state.chat);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typing, setTyping] = useState(false);
  //call
  const [call, setCall] = useState(callData);
  const [stream, setStream] = useState();
  const { receivingCall, callEnded, socketId } = call;
  const [callAccepted, setCallAccepted] = useState(false);
  const [totalSecInCall, setTotalSecInCall] = useState(0);
  const myVideo = useRef();
  const userVideo = useRef();
  //get conversations & join user in socket
  useEffect(() => {
    socket.emit("join", user._id);
    socket.on("getOnlineUsers", (users) => {
      setOnlineUsers(users);
    });
    if (user?.token) {
      dispatch(getConversations(user.token));
    }
  }, [user]);

  //listening to received messages & Typing
  useEffect(() => {
    socket.on("message received", (message) => {
      dispatch(updateMessages(message));
    });
    socket.on("typing", (conversation) => setTyping(conversation));
    socket.on("stop typing", () => setTyping(false));
  }, []);
  //Call
  useEffect(() => {
    setupMedia();
    socket.on("setupSocket", (id) => {
      setCall({ ...call, socketId: id });
    });
    socket.on("callUser", (data) => {
      setCall({
        ...call,
        socketId: data.from,
        name: data.name,
        picture: data.picture,
        signal: data.signal,
        receivingCall: true,
      });
    });
  }, []);

  const callUser = () => {
    myVideo.current.srcObject = stream;
    setCall({
      ...call,
      name: getRelevantName(user, activeConversation.users),
      picture: getRelevantPic(user, activeConversation.users),
    });
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: getConversationId(user, activeConversation.users),
        signal: data,
        from: socketId,
        name: user.name,
        picture: user.picture,
      });
    });
  };

  const setupMedia = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        myVideo.current.srcObject = stream;
      });
  };

  return (
    <div className=" h-screen dark:bg-dark_bg_1 flex items-center justify-center py-[2px] w-full">
      {/* Container */}
      <div className="container h-screen flex bg-slate-100">
        <Sidebar onlineUsers={onlineUsers} typing={typing} />
        {activeConversation._id ? (
          <ChatContainer
            onlineUsers={onlineUsers}
            typing={typing}
            callUser={callUser}
          />
        ) : (
          <EffichatHome />
        )}
      </div>
      <div className={(call.signal) && !call.callEnded ? "" : "hidden"}>
      <Call
        call={call}
        setCall={setCall}
        callAccepted={callAccepted}
        userVideo={userVideo}
        myVideo={myVideo}
        stream={stream}
      />
      </div>
    </div>
  );
}

const HomeWithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <Home {...props} socket={socket} />}
  </SocketContext.Consumer>
);
export default HomeWithSocket;
