import { LogIn, Menu } from "lucide-react";
import { Button } from "../Button";
import { useNavigate } from "react-router-dom";

export default function Topbar() {

    const navigate = useNavigate()

    const onMenu = (path) => {
        navigate(path)
    }

    return (
        <div className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
            <div className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-emerald-600 grid place-items-center text-white font-bold">F</div>
                    <span className="font-semibold">Facturate</span>
                </div>
                <div className="hidden md:flex items-center gap-6 text-sm">
                    <a className="hover:text-emerald-700 cursor-pointer" onClick={() => onMenu("")}>Inicio</a>
                    <a className="hover:text-emerald-700 cursor-pointer" onClick={() => onMenu("pricing")}>Planes</a>
                    <a className="hover:text-emerald-700 cursor-pointer" onClick={() => onMenu("team")}>Equipo</a>
                    <a className="hover:text-emerald-700 cursor-pointer" onClick={() => onMenu("support")}>Soporte</a>
                    <a className="hover:text-emerald-700 cursor-pointer" onClick={() => onMenu("settings")}>Ajustes</a>
                </div>

                <div className="flex items-center gap-3">
                    {
                        /*auth ? (
                          <>
                            <div className="hidden sm:block text-sm text-slate-600">Hola, <span className="font-medium">{auth.name}</span></div>
                            <Button variant="outline" className="gap-2" onClick={onLogout}><LogOut className="h-4 w-4"/>Salir</Button>
                          </>
                        ) : (
                         */
                        <Button className="gap-2 bg-emerald-600 hover:bg-emerald-700" onClick={() => navigate('/login')}><LogIn className="h-4 w-4" />Ingresar</Button>
                    }

                    <Button variant="ghost" size="icon" className="md:hidden" onClick={() => onMenu("pricing")}><Menu /></Button>
                </div>
            </div>
        </div>
    );
}