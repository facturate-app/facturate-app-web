import React, { useMemo, useState } from "react";
import '../tailwind.css';
import { Button } from '../components/Button'
import { Badge } from '../components/Badge'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/Card'
import { Checkbox } from '../components/Checkbox'
import { Input } from '../components/Input'
import { Label } from '../components/Label'
import { Separator } from '../components/Separator'
import { Switch } from '../components/Switch'
import { Textarea } from '../components/Textarea'
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  ChevronRight,
  CreditCard,
  Download,
  FileText,
  LogIn,
  LogOut,
  Mail,
  Menu,
  MessageSquare,
  Phone,
  Plus,
  Send,
  Settings,
  Star,
  TrendingUp,
  Upload,
  Users,
  X,
  QrCode,
} from "lucide-react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

// ---------------------------------------------------------
// FACTURATE – Prototipo HD (Landing + Flujos completos)
// Personalización + datos ficticios para gráficos, clientes y KPIs
// ---------------------------------------------------------

// Datos de ejemplo (falsos) para dashboard
const MONTHLY_SALES = [
  { mes: "Ene", ventas: 430000, facturas: 62 },
  { mes: "Feb", ventas: 520000, facturas: 71 },
  { mes: "Mar", ventas: 610000, facturas: 85 },
  { mes: "Abr", ventas: 480000, facturas: 69 },
  { mes: "May", ventas: 730000, facturas: 102 },
  { mes: "Jun", ventas: 820000, facturas: 118 },
  { mes: "Jul", ventas: 910000, facturas: 126 },
  { mes: "Ago", ventas: 870000, facturas: 120 },
  { mes: "Sep", ventas: 940000, facturas: 131 },
  { mes: "Oct", ventas: 990000, facturas: 138 },
  { mes: "Nov", ventas: 1100000, facturas: 152 },
  { mes: "Dic", ventas: 1500000, facturas: 201 },
];

const RECURRING_CLIENTS = [
  { id: "r1", name: "Panadería La Espiga", facturas: 27, total: 540000 },
  { id: "r2", name: "Ferretería López", facturas: 19, total: 380000 },
  { id: "r3", name: "Estudio Contable Ríos", facturas: 15, total: 600000 },
  { id: "r4", name: "Tienda Nube Celeste", facturas: 13, total: 260000 },
  { id: "r5", name: "Kiosco 24/7", facturas: 11, total: 120000 },
];

const SAMPLE_CLIENTS = [
  { id: "c1", name: "Panadería La Espiga", taxId: "30-71234567-8", email: "compras@laespiga.com", address: "Av. Rivadavia 1234" },
  { id: "c2", name: "Estudio Contable Ríos", taxId: "20-20999888-7", email: "administracion@rios.com", address: "Reconquista 789" },
  { id: "c3", name: "Tienda Nube Celeste", taxId: "27-27456789-0", email: "ventas@celeste.com", address: "Córdoba 556" },
];

const SAMPLE_ITEMS = [
  { id: "p1", sku: "SVC-UX", name: "Servicio profesional", price: 120000 },
  { id: "p2", sku: "PRD-001", name: "Producto estándar", price: 45000 },
  { id: "p3", sku: "SUS-PRO", name: "Suscripción PRO (mensual)", price: 34990 },
];

// Utils
const currency = (n) => n.toLocaleString("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 });

function useStepper(steps) {
  const [i, setI] = useState(0);
  return {
    index: i,
    step: steps[i],
    isFirst: i === 0,
    isLast: i === steps.length - 1,
    next: () => setI((v) => Math.min(v + 1, steps.length - 1)),
    prev: () => setI((v) => Math.max(v - 1, 0)),
    goto: (k) => setI(k),
  };
}

// Pequeño "test suite" para lógicas de totales (se ve en consola)
function runCalcTests() {
  const items = [
    { price: 100, qty: 2 },
    { price: 50, qty: 3 },
  ];
  const subtotal = items.reduce((a, i) => a + i.price * i.qty, 0);
  const iva = Math.round(subtotal * 0.21);
  const total = subtotal + iva;

  console.assert(subtotal === 350, "Subtotal debe ser 350");
  console.assert(iva === 74, "IVA (21%) de 350 debe ser 74");
  console.assert(total === 424, "Total debe ser 424");
}
runCalcTests();

export default function App() {
  const [route, setRoute] = useState("landing");  
  const [cartPlan, setCartPlan] = useState(null);

  // Estado global simple de la empresa
  const [company, setCompany] = useState({
    name: "Facturate Demo SA",
    cuit: "30-12345678-9",
    iva: "Responsable Inscripto",
    pos: "0001",
    email: "admin@facturate.app",
    address: "Av. Demo 100",
    mpEnabled: true,
    waEnabled: true,
  });

  const [invoices, setInvoices] = useState([]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white text-slate-800">
      <Topbar onMenu={(r) => setRoute(r)}/>

      <main className="mx-auto max-w-7xl px-4 pb-24">
        <AnimatePresence mode="wait">
          {route === "landing" && <Landing key="landing" onPricing={() => setRoute("pricing")} />}
          {route === "onboarding" && (
            <Onboarding key="onb" company={company} setCompany={setCompany} onFinish={() => setRoute("dashboard")} />
          )}
          {route === "dashboard" && (
            <Dashboard key="dash" invoices={invoices} onCreate={() => setRoute("invoice:new")} goto={(r) => setRoute(r)} />
          )}
          {route === "invoice:new" && (
            <InvoiceBuilder key="invb" company={company} onCancel={() => setRoute("dashboard")} onSave={(inv) => { setInvoices([inv, ...invoices]); setRoute("invoice:list"); }} />
          )}
          {route === "invoice:list" && (
            <InvoiceList key="invl" invoices={invoices} onNew={() => setRoute("invoice:new")} onBack={() => setRoute("dashboard")} />
          )}
          {route === "pricing" && (
            <Pricing key="pricing" onSelect={(plan) => { setCartPlan(plan); setRoute("checkout"); }} />
          )}
          {route === "checkout" && (
            <Checkout key="checkout" plan={cartPlan} onBack={() => setRoute("pricing")} onDone={() => setRoute("dashboard")} />
          )}
          {route === "team" && (
            <Team key="team" />
          )}
          {route === "settings" && (
            <SettingsPage key="settings" company={company} setCompany={setCompany} />
          )}
          {route === "support" && <Support key="support" />}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

function Topbar({ onMenu }) {

  const navigate = useNavigate()

  return (
    <div className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
      <div className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-emerald-600 grid place-items-center text-white font-bold">F</div>
          <span className="font-semibold">Facturate</span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm">
          <a className="hover:text-emerald-700" onClick={() => onMenu("landing")}>Inicio</a>
          <a className="hover:text-emerald-700" onClick={() => onMenu("pricing")}>Planes</a>
          <a className="hover:text-emerald-700" onClick={() => onMenu("team")}>Equipo</a>
          <a className="hover:text-emerald-700" onClick={() => onMenu("support")}>Soporte</a>
          <a className="hover:text-emerald-700" onClick={() => onMenu("settings")}>Ajustes</a>
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
            <Button className="gap-2 bg-emerald-600 hover:bg-emerald-700" onClick={() => navigate('/login')}><LogIn className="h-4 w-4"/>Ingresar</Button>
          }

          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => onMenu("pricing")}><Menu/></Button>
        </div>
      </div>
    </div>
  );
}

function Landing({ onStart, onPricing }) {
  return (
    <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="py-14">
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-emerald-900">Facturá en segundos, sin dolores de cabeza</h1>
          <p className="mt-4 text-slate-600 max-w-xl">Emití comprobantes electrónicos con AFIP, enviá por WhatsApp o email y cobrá con un link de pago. Panel con métricas, equipo con permisos y todo en la nube.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button className="bg-emerald-600 hover:bg-emerald-700 gap-2" onClick={onStart}>Probar gratis</Button>
            <Button variant="outline" onClick={onPricing}>Ver planes</Button>
          </div>
          <div className="mt-6 flex items-center gap-4 text-slate-500 text-sm">
            <div className="flex items-center gap-1"><Star className="h-4 w-4 text-amber-500"/>4.8/5</div>
            <div className="flex items-center gap-1"><Users className="h-4 w-4"/>+10.000 usuarios</div>
            <div className="flex items-center gap-1"><ShieldIcon/>Cumple AFIP</div>
          </div>
        </div>
        <HeroLaptop />
      </div>

      <div className="mt-16 grid md:grid-cols-3 gap-6">
        <Card className="shadow-sm">
          <CardHeader><CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5 text-emerald-600"/>Beneficios</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-600">
            <p>• Facturación A/B/C/M/E con QR y CAE</p>
            <p>• Envío automático por email/WhatsApp</p>
            <p>• Links de pago y conciliación</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader><CardTitle className="flex items-center gap-2"><TrendingUp className="h-5 w-5 text-emerald-600"/>Métricas</CardTitle></CardHeader>
          <CardContent className="text-sm text-slate-600 space-y-3">
            <p>• Ventas del mes y tickets promedio</p>
            <p>• Facturas pendientes vs cobradas</p>
            <p>• Top clientes/productos</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader><CardTitle className="flex items-center gap-2"><Users className="h-5 w-5 text-emerald-600"/>Clientes</CardTitle></CardHeader>
          <CardContent className="text-sm text-slate-600 space-y-3">
            <p>• Clientes recurrentes con historial</p>
            <p>• Notas y etiquetas</p>
            <p>• Recordatorios de cobro</p>
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

function Onboarding({ company, setCompany, onFinish }) {
  const steps = ["Empresa", "Impuestos", "Integraciones"];
  const stepper = useStepper(steps);
  const firstName =  "Ignacio";
  return (
    <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="py-10">
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>¡Bienvenido a Facturate, {firstName}! 🎉</CardTitle>
            <CardDescription>Configuremos tu cuenta en 3 pasos para empezar a facturar.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Stepper steps={steps} index={stepper.index} />
            {stepper.index === 0 && (
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label>Nombre legal</Label>
                  <Input value={company.name} onChange={(e)=>setCompany({...company, name:e.target.value})}/>
                </div>
                <div>
                  <Label>CUIT</Label>
                  <Input value={company.cuit} onChange={(e)=>setCompany({...company, cuit:e.target.value})}/>
                </div>
                <div>
                  <Label>Dirección</Label>
                  <Input value={company.address} onChange={(e)=>setCompany({...company, address:e.target.value})}/>
                </div>
                <div>
                  <Label>Email de facturación</Label>
                  <Input type="email" value={company.email} onChange={(e)=>setCompany({...company, email:e.target.value})}/>
                </div>
                <div>
                  <Label>Punto de venta</Label>
                  <Input value={company.pos} onChange={(e)=>setCompany({...company, pos:e.target.value})}/>
                </div>
              </div>
            )}
            {stepper.index === 1 && (
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label>Condición frente al IVA</Label>
                  <select className="w-full h-10 rounded-md border px-3" value={company.iva} onChange={(e)=>setCompany({...company, iva:e.target.value})}>
                    <option>Responsable Inscripto</option>
                    <option>Monotributista</option>
                    <option>Exento</option>
                  </select>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div>
                    <div className="font-medium">Incluir QR y CAE en PDF</div>
                    <div className="text-sm text-slate-500">Obligatorio AFIP</div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            )}
            {stepper.index === 2 && (
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div>
                    <div className="font-medium">Mercado Pago</div>
                    <div className="text-sm text-slate-500">Agregá link de cobro a la factura</div>
                  </div>
                  <Switch checked={company.mpEnabled} onCheckedChange={(v)=>setCompany({...company, mpEnabled:v})} />
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div>
                    <div className="font-medium">WhatsApp</div>
                    <div className="text-sm text-slate-500">Enviá PDF/Link por WA</div>
                  </div>
                  <Switch checked={company.waEnabled} onCheckedChange={(v)=>setCompany({...company, waEnabled:v})} />
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="justify-between">
            <Button variant="ghost" onClick={stepper.prev} disabled={stepper.isFirst}>Atrás</Button>
            {stepper.isLast ? (
              <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={onFinish}>Finalizar</Button>
            ) : (
              <Button onClick={stepper.next} className="bg-emerald-600 hover:bg-emerald-700">Continuar <ChevronRight className="ml-2 h-4 w-4"/></Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </motion.section>
  );
}

function Stepper({ steps, index }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      {steps.map((s, idx) => (
        <React.Fragment key={s}>
          <div className={`flex items-center gap-2 ${idx === index ? "text-emerald-700" : "text-slate-500"}`}>
            <div className={`h-6 w-6 grid place-items-center rounded-full border ${idx <= index ? "bg-emerald-600 text-white border-emerald-600" : "border-slate-300"}`}>{idx+1}</div>
            <span className="hidden sm:block">{s}</span>
          </div>
          {idx < steps.length-1 && <div className="flex-1 border-t"/>}
        </React.Fragment>
      ))}
    </div>
  );
}

function Dashboard({ invoices, onCreate, goto }) {
  const totalMonth = invoices.filter(i=>i.status!=="ANULADA").reduce((acc,i)=>acc+i.total,0);
  const name = "Ignacio";
  return (
    <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="py-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Hola {name} 👋</h2>
          <p className="text-slate-500 text-sm">Aquí está tu resumen de hoy</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={()=>goto("invoice:list")}>Ver facturas</Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700 gap-2" onClick={onCreate}><Plus className="h-4 w-4"/>Nueva factura</Button>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        <Kpi title="Ventas del mes" value={currency(totalMonth || 942000)} />
        <Kpi title="Emitidas" value={String(invoices.length || 126)} />
        <Kpi title="Pendientes de cobro" value={currency(invoices.filter(i=>i.status==="PENDIENTE").reduce((a,b)=>a+b.total,0) || 320000)} />
        <Kpi title="Promedio ticket" value={currency(invoices.length? Math.round(totalMonth/invoices.length): 7300)} />
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-8">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Evolución mensual</CardTitle>
            <CardDescription>Ventas y cantidad de facturas por mes</CardDescription>
          </CardHeader>
          <CardContent style={{ width: "100%", height: 280 }}>
            <ResponsiveContainer>
              <LineChart data={MONTHLY_SALES} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip formatter={(v, name) => name === "ventas" ? currency(v) : v} />
                <Legend />
                <Line type="monotone" dataKey="ventas" name="Ventas" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="facturas" name="Facturas" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Clientes recurrentes</CardTitle>
            <CardDescription>Top 5 por cantidad de facturas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {RECURRING_CLIENTS.map((c) => (
              <div key={c.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-emerald-100 grid place-items-center text-emerald-700 text-xs font-semibold">{c.name[0]}</div>
                  <div>
                    <div className="font-medium">{c.name}</div>
                    <div className="text-slate-500 text-xs">{c.facturas} facturas</div>
                  </div>
                </div>
                <div className="font-semibold">{currency(c.total)}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader><CardTitle>Actividad reciente</CardTitle></CardHeader>
        <CardContent>
          {invoices.length===0 ? (
            <div className="text-sm text-slate-500">Aún no emitiste facturas. Empezá creando la primera.</div>
          ) : (
            <div className="grid grid-cols-5 gap-2 text-sm">
              <div className="font-medium">Comprobante</div>
              <div className="font-medium">Cliente</div>
              <div className="font-medium text-right">Total</div>
              <div className="font-medium">Estado</div>
              <div className="font-medium text-right">Fecha</div>
              {invoices.slice(0,6).map((i)=> (
                <React.Fragment key={i.id}>
                  <div>{i.number || "#0001-0000XX"}</div>
                  <div>{i.client.name}</div>
                  <div className="text-right">{currency(i.total)}</div>
                  <div><Badge className={i.status==="COBRADA"?"bg-emerald-600":"bg-amber-500"}>{i.status}</Badge></div>
                  <div className="text-right">{new Date(i.date).toLocaleDateString()}</div>
                </React.Fragment>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.section>
  );
}

function Kpi({title, value}) {
  return (
    <Card>
      <CardHeader className="pb-2"><CardDescription>{title}</CardDescription></CardHeader>
      <CardContent><div className="text-2xl font-bold">{value}</div></CardContent>
    </Card>
  );
}

function InvoiceBuilder({ company, onCancel, onSave }) {
  const [clientQuery, setClientQuery] = useState("");
  const [client, setClient] = useState(null);
  const [items, setItems] = useState([]);
  const [notes, setNotes] = useState("");
  const [includeLink, setIncludeLink] = useState(true);

  const filteredClients = useMemo(()=> SAMPLE_CLIENTS.filter(c => c.name.toLowerCase().includes(clientQuery.toLowerCase())), [clientQuery]);

  const subtotal = items.reduce((a,i)=> a + i.qty * i.price, 0);
  const iva = Math.round(subtotal * 0.21);
  const total = subtotal + iva;

  const addItem = (p) => setItems([...items, { sku: p.sku, name: p.name, price: p.price, qty: 1 }]);
  const updateQty = (idx, qty) => setItems(items.map((it,i)=> i===idx? {...it, qty: Math.max(1, qty)}: it));
  const removeItem = (idx) => setItems(items.filter((_,i)=> i!==idx));

  const canSave = client && items.length>0;

  return (
    <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="py-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Nueva factura</h2>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onCancel}>Cancelar</Button>
            <Button disabled={!canSave} className="bg-emerald-600 hover:bg-emerald-700 gap-2" onClick={() => onSave({
              id: crypto.randomUUID(),
              number: "#0001-000015",
              client,
              items,
              notes,
              includeLink,
              iva,
              subtotal,
              total,
              status: "PENDIENTE",
              date: new Date().toISOString(),
            })}><FileText className="h-4 w-4"/>Emitir</Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader><CardTitle>Detalles</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Cliente</Label>
                <div className="relative mt-2">
                  <Input placeholder="Buscar o crear cliente" value={clientQuery} onChange={(e)=>setClientQuery(e.target.value)} />
                  {clientQuery && (
                    <div className="absolute z-10 bg-white border rounded-lg w-full mt-1 shadow">
                      {filteredClients.map(c => (
                        <div key={c.id} className="px-3 py-2 hover:bg-slate-50 cursor-pointer" onClick={()=>{setClient(c); setClientQuery(c.name);}}>
                          <div className="font-medium">{c.name}</div>
                          <div className="text-xs text-slate-500">{c.taxId} • {c.email}</div>
                        </div>
                      ))}
                      <div className="px-3 py-2 text-sm text-emerald-700 hover:bg-emerald-50 cursor-pointer" onClick={()=>{
                        const c = { id: crypto.randomUUID(), name: clientQuery, email: "cliente@correo.com", taxId: "20-00000000-0" };
                        setClient(c);
                      }}>+ Crear "{clientQuery}"</div>
                    </div>
                  )}
                </div>
                {client && (
                  <div className="mt-2 text-sm text-slate-600">CUIT: {client.taxId} • Email: {client.email}</div>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label>Ítems</Label>
                  <div className="flex gap-2 flex-wrap">
                    {SAMPLE_ITEMS.map(p => (
                      <Button key={p.id} variant="outline" size="sm" onClick={()=>addItem(p)}>+ {p.name}</Button>
                    ))}
                  </div>
                </div>
                <div className="rounded-lg border overflow-hidden">
                  <div className="grid grid-cols-6 bg-slate-50 px-3 py-2 text-sm font-medium">
                    <div className="col-span-3">Descripción</div>
                    <div>Cant.</div>
                    <div className="text-right">Precio</div>
                    <div className="text-right">Total</div>
                  </div>
                  {items.length===0 ? (
                    <div className="px-3 py-6 text-sm text-slate-500">Agregá productos o servicios</div>
                  ) : items.map((it, idx) => (
                    <div key={idx} className="grid grid-cols-6 px-3 py-3 border-t text-sm items-center">
                      <div className="col-span-3">{it.name}</div>
                      <div>
                        <Input type="number" min={1} value={it.qty} onChange={(e)=>updateQty(idx, parseInt(e.target.value||"1", 10))} className="h-9 w-20"/>
                      </div>
                      <div className="text-right">{currency(it.price)}</div>
                      <div className="text-right font-medium">{currency(it.price*it.qty)}</div>
                      <div className="col-span-6 text-right mt-2"><Button variant="ghost" size="sm" onClick={()=>removeItem(idx)}>Quitar</Button></div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>Notas internas</Label>
                <Textarea placeholder="Observaciones, condiciones, etc." value={notes} onChange={(e)=>setNotes(e.target.value)} />
              </div>

              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <div className="font-medium">Incluir link de pago</div>
                  <div className="text-sm text-slate-500">Se agregará al PDF y al email</div>
                </div>
                <Switch checked={includeLink} onCheckedChange={setIncludeLink} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Resumen</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between"><span>Subtotal</span><span>{currency(subtotal)}</span></div>
              <div className="flex justify-between"><span>IVA (21%)</span><span>{currency(iva)}</span></div>
              <Separator/>
              <div className="flex justify-between text-base font-semibold"><span>Total</span><span>{currency(total)}</span></div>
              <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-3 mt-3 text-emerald-800 text-xs flex items-center gap-2"><QrCode className="h-4 w-4"/> El PDF incluirá QR + CAE conforme AFIP.</div>
              <PreviewInvoice company={company} client={client} items={items} subtotal={subtotal} iva={iva} total={total} includeLink={includeLink} />
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.section>
  );
}

function PreviewInvoice({ company, client, items, subtotal, iva, total, includeLink }){
  return (
    <div className="mt-4 border rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="font-semibold">Vista previa PDF</div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2"><Download className="h-4 w-4"/>Descargar</Button>
          <Button variant="outline" size="sm" className="gap-2"><Send className="h-4 w-4"/>Enviar</Button>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-2 text-xs">
        <div>
          <div className="font-medium">{company.name}</div>
          <div>CUIT {company.cuit} • PV {company.pos}</div>
          <div>{company.address}</div>
        </div>
        <div className="text-right">
          <div className="font-medium">{client? client.name: "Cliente"}</div>
          <div>{client? client.taxId: "CUIT"}</div>
          <div>{client? client.email: "email@cliente.com"}</div>
        </div>
      </div>
      <div className="mt-3">
        <div className="grid grid-cols-6 bg-slate-50 px-2 py-1 font-medium">
          <div className="col-span-4">Descripción</div>
          <div className="text-right">Cant.</div>
          <div className="text-right">Total</div>
        </div>
        {items.map((it, idx)=> (
          <div key={idx} className="grid grid-cols-6 px-2 py-1">
            <div className="col-span-4">{it.name}</div>
            <div className="text-right">{it.qty}</div>
            <div className="text-right">{currency(it.price*it.qty)}</div>
          </div>
        ))}
        <Separator className="my-2"/>
        <div className="grid grid-cols-2 text-sm">
          <div/>
          <div>
            <div className="flex justify-between"><span>Subtotal</span><span>{currency(subtotal)}</span></div>
            <div className="flex justify-between"><span>IVA 21%</span><span>{currency(iva)}</span></div>
            <div className="flex justify-between font-semibold"><span>Total</span><span>{currency(total)}</span></div>
          </div>
        </div>
      </div>
      {includeLink && (
        <div className="mt-2 text-xs text-emerald-700">Link de pago: https://mpago.la/abc-123 (demo)</div>
      )}
    </div>
  );
}

function InvoiceList({ invoices, onNew, onBack }) {
  const [q, setQ] = useState("");
  const filtered = invoices.filter(i => i.client.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold">Facturas</h2>
          <p className="text-sm text-slate-500">Buscá, filtrá y exportá</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onBack}>Volver</Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={onNew}>Nueva</Button>
        </div>
      </div>
      <div className="flex items-center gap-3 mb-3">
        <Input placeholder="Buscar por cliente" value={q} onChange={(e)=>setQ(e.target.value)} className="max-w-xs"/>
        <Button variant="outline" className="gap-2"><Upload className="h-4 w-4"/>Exportar CSV</Button>
      </div>
      <Card>
        <CardContent className="pt-6">
          {filtered.length===0? (
            <div className="text-sm text-slate-500">Sin resultados</div>
          ):(
            <div className="grid grid-cols-6 gap-2 text-sm">
              <div className="font-medium">N°</div>
              <div className="font-medium">Cliente</div>
              <div className="font-medium">Estado</div>
              <div className="font-medium text-right">Total</div>
              <div className="font-medium">Fecha</div>
              <div className="font-medium text-right">Acciones</div>
              {filtered.map(i=> (
                <React.Fragment key={i.id}>
                  <div>{i.number}</div>
                  <div>{i.client.name}</div>
                  <div><Badge className={i.status==="COBRADA"?"bg-emerald-600":"bg-amber-500"}>{i.status}</Badge></div>
                  <div className="text-right">{currency(i.total)}</div>
                  <div>{new Date(i.date).toLocaleDateString()}</div>
                  <div className="text-right space-x-2">
                    <Button variant="outline" size="sm">PDF</Button>
                    <Button variant="outline" size="sm">Enviar</Button>
                  </div>
                </React.Fragment>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}

function Pricing({ onSelect }) {
  const plans = [
    {id:"basic", name:"Básico", price:"$7.990", desc:"Para empezar", bullets:["100 comprobantes/mes","1 usuario","Soporte por email"]},
    {id:"pro", name:"Pro", price:"$19.990", desc:"Para PyMEs", bullets:["500 comprobantes/mes","3 usuarios","WhatsApp + MP"]},
    {id:"empresa", name:"Empresa", price:"$49.990", desc:"Alto volumen", bullets:["Ilimitado","Usuarios ilimitados","API + SLA"]},
  ];
  return (
    <section className="py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold">Planes y precios</h2>
        <p className="text-slate-500">Elegí el plan que mejor se adapta a tu negocio</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {plans.map(p => (
          <Card key={p.id} className="relative">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">{p.name}<Badge variant="secondary">AFIP Ready</Badge></CardTitle>
              <CardDescription>{p.desc}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold">{p.price}<span className="text-base font-normal text-slate-500">/mes</span></div>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {p.bullets.map((b,i)=> <li key={i} className="flex gap-2"><Check className="h-4 w-4 text-emerald-600"/>{b}</li>)}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700" onClick={()=>onSelect(p)}>Elegir plan</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}

function Checkout({ plan, onBack, onDone }) {
  return (
    <section className="py-10">
      <div className="max-w-xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Suscripción</CardTitle>
            <CardDescription>Plan seleccionado: <span className="font-medium">{plan?.name}</span></CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3">
              <div>
                <Label>Titular</Label>
                <Input placeholder="Nombre y Apellido"/>
              </div>
              <div>
                <Label>Número de tarjeta</Label>
                <Input placeholder="XXXX XXXX XXXX XXXX"/>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Vencimiento</Label>
                  <Input placeholder="MM/AA"/>
                </div>
                <div>
                  <Label>CVV</Label>
                  <Input placeholder="000"/>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm"><Checkbox id="a" defaultChecked/><Label htmlFor="a">Acepto Términos y Condiciones</Label></div>
            </div>
          </CardContent>
          <CardFooter className="justify-between">
            <Button variant="outline" onClick={onBack}>Volver</Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700 gap-2" onClick={onDone}><CreditCard className="h-4 w-4"/>Pagar</Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}

function Team(){
  return (
    <section className="py-10">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold">Equipo</h2>
        <p className="text-slate-500">Personas reales ayudándote a facturar sin drama</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {["Thiago","Dafne","Camila"].map((n,i)=> (
          <Card key={i} className="text-center">
            <CardHeader>
              <div className="mx-auto h-16 w-16 rounded-full bg-emerald-100 grid place-items-center text-emerald-800 font-semibold">{n[0]}</div>
              <CardTitle>{n}</CardTitle>
              <CardDescription>Atención al cliente</CardDescription>
            </CardHeader>
            <CardFooter className="justify-center gap-2">
              <Button variant="outline" size="sm" className="gap-2"><Mail className="h-4 w-4"/>Email</Button>
              <Button variant="outline" size="sm" className="gap-2"><Phone className="h-4 w-4"/>Llamar</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}

function SettingsPage({ company, setCompany }){
  return (
    <section className="py-10">
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Ajustes</CardTitle>
            <CardDescription>Datos fiscales y preferencias</CardDescription>
          </CardHeader>
          <CardContent className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label>Razón social</Label>
              <Input value={company.name} onChange={(e)=>setCompany({...company, name:e.target.value})}/>
            </div>
            <div>
              <Label>CUIT</Label>
              <Input value={company.cuit} onChange={(e)=>setCompany({...company, cuit:e.target.value})}/>
            </div>
            <div>
              <Label>Dirección</Label>
              <Input value={company.address} onChange={(e)=>setCompany({...company, address:e.target.value})}/>
            </div>
            <div>
              <Label>Punto de venta</Label>
              <Input value={company.pos} onChange={(e)=>setCompany({...company, pos:e.target.value})}/>
            </div>
            <div className="sm:col-span-2">
              <Label>Email</Label>
              <Input value={company.email} onChange={(e)=>setCompany({...company, email:e.target.value})}/>
            </div>
            <div className="sm:col-span-2 flex items-center justify-between p-4 border rounded-lg">
              <div>
                <div className="font-medium">Mercado Pago</div>
                <div className="text-sm text-slate-500">Cobrá con link en tus facturas</div>
              </div>
              <Switch checked={company.mpEnabled} onCheckedChange={(v)=>setCompany({...company, mpEnabled:v})} />
            </div>
            <div className="sm:col-span-2 flex items-center justify-between p-4 border rounded-lg">
              <div>
                <div className="font-medium">WhatsApp</div>
                <div className="text-sm text-slate-500">Enviá comprobantes por WA</div>
              </div>
              <Switch checked={company.waEnabled} onCheckedChange={(v)=>setCompany({...company, waEnabled:v})} />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="bg-emerald-600 hover:bg-emerald-700">Guardar cambios</Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}

function Support(){
  return (
    <section className="py-10">
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Soporte</CardTitle>
            <CardDescription>¿Necesitás una mano? Escribinos</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center gap-3"><MessageSquare className="h-5 w-5"/> Chat en vivo de 9 a 18h</div>
            <div className="flex items-center gap-3"><Mail className="h-5 w-5"/> soporte@facturate.app</div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function AuthDialog({ open, onOpenChange, onAuthed }){
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  return (
    <DialogLike open={open} onOpenChange={onOpenChange}>
      <div className="sm:max-w-md w-full bg-white rounded-2xl shadow-xl p-6">
        <div className="mb-4">
          <div className="text-lg font-semibold">Ingresá o creá tu cuenta</div>
          <div className="text-sm text-slate-500">Probá Facturate gratis. Sin tarjeta.</div>
        </div>
        <div className="grid gap-3">
          <div>
            <Label>Nombre</Label>
            <Input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Tu nombre"/>
          </div>
          <div>
            <Label>Email</Label>
            <Input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="tu@mail.com"/>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="outline" onClick={()=>onOpenChange(false)}>Cancelar</Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700 gap-2" onClick={()=> onAuthed({ email, name })}><LogIn className="h-4 w-4"/>Continuar</Button>
        </div>
      </div>
    </DialogLike>
  );
}

// Un mini Dialog compatible con el entorno del canvas (sin dependencias extra)
function DialogLike({ open, onOpenChange, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4" onClick={()=>onOpenChange(false)}>
      <div className="w-full max-w-lg" onClick={(e)=>e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

function Footer(){
  return (
    <footer className="border-t py-8 text-sm text-slate-500">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2"><div className="h-8 w-8 rounded-lg bg-emerald-600 text-white grid place-items-center">F</div> © {new Date().getFullYear()} Facturate</div>
        <div className="flex items-center gap-4"><a>Privacidad</a><a>Términos</a><a>Estado</a></div>
      </div>
    </footer>
  );
}

function ShieldIcon(){
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4"><path fill="currentColor" d="M12 2l7 3v6c0 5-3.4 9.4-7 10c-3.6-.6-7-5-7-10V5l7-3zm0 7l-4 4l1.4 1.4L12 11.8l2.6 2.6L16 13l-4-4z"/></svg>
  );
}