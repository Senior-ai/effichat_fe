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
import { Ringing } from "../components/Chat/call/Ringing.jsx";

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
  const [stream, setStream] = useState(null);
  const { receivingCall, callEnded, socketId } = call;
  const [isCalling, setIsCalling] = useState(false);
  const [show, setShow] = useState(false);
  const [callAccepted, setCallAccepted] = useState(false);
  const [totalSecInCall, setTotalSecInCall] = useState(0);
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  //get conversations & join user in socket
  useEffect(() => {
    socket.emit("join", user._id);
    socket.on("getOnlineUsers", (users) => {
      setOnlineUsers(users);
    });
    if (user?.token) {
      dispatch(getConversations(user.token));
    }
  }, []);
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
    socket.on("setupSocket", (id) => {
      setCall({ ...call, socketId: id });
    });
    socket.on("callUser", (data) => {
      setIsCalling(true);
      setCall({
        ...call,
        socketId: data.from,
        name: data.name,
        picture: data.picture,
        signal: data.signal,
        receivingCall: true,
      });
    });

    socket.on("endCall", () => {
      //setShow(false);
      setCall({ ...call, callEnded: true, receiveingCall: false });
      myVideo.current.srcObject = null;
      // if (callAccepted) {
      //   connectionRef?.current?.destroy();
      // }
    });
  }, []);

  const callUser = () => {
    enableMedia();
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
      setIsCalling(true);
    });

    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });

    socket.on("anserCall", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });
    connectionRef.current = peer;
  };

  const answerCall = () => {
    enableMedia();
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: call.socketId });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });
    peer.signal(call.signal);
    connectionRef.current = peer;
  };

  useEffect(() => {
    const setupMedia = () => {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((newStream) => {
          setStream(newStream);
          if (myVideo.current) {
            console.log("yeah");
            myVideo.current.srcObject = newStream;
          }
        });
    };
    // Call setupMedia function when receiving a call or when calling a user
    if (receivingCall || isCalling) {
      setupMedia();
    }
  }, [receivingCall, isCalling]);

  const enableMedia = () => {
    if (myVideo.current) {
      myVideo.current.srcObject = stream;
    }
    setShow(true);
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
      {isCalling && (
        <Call
          call={call}
          setIsCalling={setIsCalling}
          setCall={setCall}
          callAccepted={callAccepted}
          userVideo={userVideo}
          myVideo={myVideo}
          stream={stream}
          answerCall={answerCall}
        />
      )}
    </div>
  );
}

const HomeWithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <Home {...props} socket={socket} />}
  </SocketContext.Consumer>
);

export default HomeWithSocket;
