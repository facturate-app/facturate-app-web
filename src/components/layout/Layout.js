import Footer from "./Footer";
import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-emerald-50 to-white text-slate-800">
            <Topbar/>
            <main className="flex-1 mx-auto w-full max-w-7xl px-4 pb-6 overflow-y-auto">
                <Outlet/>
            </main>
            <Footer />
        </div>
    )
}