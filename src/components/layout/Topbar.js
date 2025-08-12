import { LogIn, Menu, User, LogOut } from "lucide-react";
import { Button } from "../ui/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Topbar() {
  const navigate = useNavigate();
  const [logged, setLogged] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    const auth = localStorage.getItem("authentication");
    const user = localStorage.getItem("user");
    setLogged(Boolean(auth));
    try {
      if (user) {
        setName("Cuenta");
      }
    } catch {}
  }, []);

  const onMenu = (path) => navigate(path);

  const fakeLogin = () => {
    localStorage.setItem("authentication", "test-token");
    localStorage.setItem("user", "{}");
    setLogged(true);
    navigate("/web-app/facturacion");
  };

  const onLogout = () => {
    localStorage.clear();
    setLogged(false);
    navigate("/");
  };

  return (
    <div className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
      <div className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-emerald-600 grid place-items-center text-white font-bold">F</div>
          <span className="font-semibold">Facturate</span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm">
          {logged ? (
            <>
              <a className="hover:text-emerald-700 cursor-pointer" onClick={() => onMenu("web-app/facturacion")}>Facturas</a>
              <a className="hover:text-emerald-700 cursor-pointer" onClick={() => onMenu("settings")}>Ajustes</a>
            </>
          ) : (
            <>
              <a className="hover:text-emerald-700 cursor-pointer" onClick={() => onMenu("")}>Inicio</a>
              <a className="hover:text-emerald-700 cursor-pointer" onClick={() => onMenu("pricing")}>Planes</a>
            </>
          )}
        </div>

        <div className="flex items-center gap-3">
          {!logged ? (
            <Button size="sm" className="gap-2" onClick={fakeLogin}><LogIn className="h-4 w-4" />Ingresar</Button>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={() => onMenu("settings")}><User className="h-5 w-5"/></Button>
              <Button variant="ghost" size="icon" onClick={onLogout}><LogOut className="h-5 w-5"/></Button>
            </div>
          )}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => onMenu("pricing")}><Menu /></Button>
        </div>
      </div>
    </div>
  );
}