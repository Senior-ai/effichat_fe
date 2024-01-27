import React from "react";
import { Sidebar } from "../components/sidebar/index.js";

export default function Home() {
    return (
        <div className="min-h-screen dark:bg-dark_bg_1 flex items-center justify-center py-[19px]">
            {/* Container */}
            <div className="container min-h-screen flex">
            <Sidebar/>
            </div>
        </div>
    );
}