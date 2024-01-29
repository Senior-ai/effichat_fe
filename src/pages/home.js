import { useEffect } from "react";
import { Sidebar } from "../components/sidebar/index.js";
import { useDispatch, useSelector } from "react-redux";
import { getConversations } from "../features/chatSlice.js";
import {EffichatHome} from './../components/Chat/Welcome/index.js';

export default function Home() {
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.user);
    const {activeConversation} = useSelector((state) => state.chat);
    //get conversations
    useEffect(() => {
       if (user?.token) {
        dispatch(getConversations(user.token));
       }
    }, [user])
    return (
        <div className="h-screen dark:bg-dark_bg_1 flex items-center justify-center py-[2px]">
            {/* Container */}
            <div className="container h-screen w-11/12 flex bg-slate-100">
            <Sidebar/>
            {
                activeConversation._id ? 'home' : 
                <EffichatHome/>
            }
            </div>
        </div>
    );
}