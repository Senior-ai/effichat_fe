import { useEffect } from "react";
import { Sidebar } from "../components/sidebar/index.js";
import { useDispatch, useSelector } from "react-redux";
import { getConversations } from "../features/chatSlice.js";

export default function Home() {
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.user);

    //get conversations
    useEffect(() => {
       if (user?.token) {
        dispatch(getConversations(user.token));
       }
    }, [user])
    return (
        <div className="min-h-screen dark:bg-dark_bg_1 flex items-center justify-center py-[19px]">
            {/* Container */}
            <div className="container min-h-screen flex bg-slate-100">
            <Sidebar/>
            </div>
        </div>
    );
}