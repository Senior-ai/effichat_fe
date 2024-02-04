import { useEffect, useState } from "react";
import { Sidebar } from "../components/sidebar/index.js";
import { useDispatch, useSelector } from "react-redux";
import { getConversations, updateMessages } from "../features/chatSlice.js";
import {ChatContainer, EffichatHome} from './../components/Chat/index.js';
import SocketContext from "../context/SocketContext.js";

function Home({socket}) {
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.user);
    const {activeConversation} = useSelector((state) => state.chat);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [typing, setTyping] = useState(false);
    //get conversations & join user in socket
    useEffect(() => {
        socket.emit('join', user._id);
        socket.on('getOnlineUsers', (users) => {
            setOnlineUsers(users);
        })
       if (user?.token) {
        dispatch(getConversations(user.token));
       }
    }, [user]);

    //listening to received messages & Typing
    useEffect(() => {
        socket.on('message received', message => {
                dispatch(updateMessages(message))
        });
        socket.on('typing', () => setTyping(true));
        socket.on('stop typing', () => setTyping(false));
    }, [])

    return (
        <div className=" h-screen dark:bg-dark_bg_1 flex items-center justify-center py-[2px] w-full">
            {/* Container */}
            <div className="container h-screen flex bg-slate-100">
            <Sidebar onlineUsers={onlineUsers} typing={typing}/>
            {
                activeConversation._id ? <ChatContainer onlineUsers={onlineUsers} typing={typing}/> : 
                <EffichatHome/>
            }
            </div>
        </div>
    );
}

const HomeWithSocket = (props) => (
    <SocketContext.Consumer>
        {(socket) => <Home {...props} socket={socket} />}
    </SocketContext.Consumer>
)
export default HomeWithSocket