import { Check } from "lucide-react";
import { Badge } from "../components/Badge";
import { Button } from "../components/Button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/Card";

export default function Pricing() {
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
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700" onClick={()=> alert('elegido')}>Elegir plan</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}