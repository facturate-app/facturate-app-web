import Footer from "./Footer";
import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";

export default function Layout(props) {

    return (
        <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white text-slate-800">
            <Topbar/>

            <main className="mx-auto max-w-7xl px-4 pb-24">
                <Outlet/>
            </main>

            <Footer />
        </div>
    )
}