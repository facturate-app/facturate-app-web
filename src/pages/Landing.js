import { Button } from '../components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { motion } from "framer-motion";
import {
  FileText,
  TrendingUp,
} from "lucide-react";
import { useNavigate } from "react-router-dom";


export default function Landing() {
  const navigate = useNavigate()

  return (
    <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="py-14">
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-emerald-900">Facturá en segundos, sin dolores de cabeza</h1>
          <p className="mt-4 text-slate-600 max-w-xl">Emití comprobantes electrónicos con AFIP, enviá por WhatsApp o email. Panel con métricas, equipo con permisos y todo en la nube.</p>
          <div className="mt-6 flex flex-wrap gap-3">
                         <Button className="bg-emerald-600 hover:bg-emerald-700 gap-2" onClick={() => navigate('login')}>Probar gratis</Button>
             <Button variant="outline" onClick={() => navigate('pricing')}>Ver planes</Button>
          </div>
                      <div className="mt-6 flex items-center gap-4 text-slate-500 text-sm">
              <div className="flex items-center gap-1"><ShieldIcon/>Cumple normativas ARCA/AFIP</div>
            </div>
        </div>
        <HeroLaptop />
      </div>

      <div className="mt-16 grid md:grid-cols-3 gap-6">
        <Card className="shadow-sm">
          <CardHeader><CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5 text-emerald-600"/>Beneficios</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-600">
            <p>• Facturación C con QR y CAE</p>
            <p>• Envío automático por email/WhatsApp</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader><CardTitle className="flex items-center gap-2"><TrendingUp className="h-5 w-5 text-emerald-600"/>Métricas</CardTitle></CardHeader>
          <CardContent className="text-sm text-slate-600 space-y-3">
            <p>• Ventas del mes y tickets promedio</p>
            <p>• Facturas pendientes vs cobradas</p>
          </CardContent>
        </Card>
      </div>
    </motion.section>
  );
}

function HeroLaptop() {
  return (
    <div className="relative">
      <div className="rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-700 p-8 text-white shadow-2xl">
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold">Panel</div>
            <Badge variant="secondary" className="bg-white/10">DEMO</Badge>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              {t:"Ventas hoy", v:"$ 180.500"},
              {t:"Facturas mes", v:"42"},
              {t:"Pendientes", v:"$ 320.000"},
            ].map((c,ix)=> (
              <div key={ix} className="rounded-xl bg-white/10 p-4">
                <div className="text-sm/5 opacity-80">{c.t}</div>
                <div className="text-2xl font-bold">{c.v}</div>
              </div>
            ))}
          </div>
          <div className="rounded-xl bg-white/10 p-4">
            <div className="text-sm mb-2 opacity-80">Últimas facturas</div>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div>#0001-000012</div><div>La Espiga</div><div className="text-right">$ 95.000</div>
              <div>#0001-000013</div><div>Ríos</div><div className="text-right">$ 120.000</div>
              <div>#0001-000014</div><div>Celeste</div><div className="text-right">$ 45.000</div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute -inset-4 -z-10 blur-2xl bg-emerald-300/30 rounded-3xl"></div>
    </div>
  );
}

function ShieldIcon(){
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4"><path fill="currentColor" d="M12 2l7 3v6c0 5-3.4 9.4-7 10c-3.6-.6-7-5-7-10V5l7-3zm0 7l-4 4l1.4 1.4L12 11.8l2.6 2.6L16 13l-4-4z"/></svg>
  );
}