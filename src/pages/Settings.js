import { useState } from "react";
import { Button } from "../components/ui/Button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/Card";
import { Input } from "../components/ui/Input";

export default function Settings() {
  const [form, setForm] = useState({
    nombreLegal: "",
    domicilio: "",
    telefono: "",
    email: "",
    categoriaMonotributo: "A",
  });

  const onChange = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className="py-10">
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Ajustes</CardTitle>
            <CardDescription>Datos que se mostrarán en tus comprobantes</CardDescription>
          </CardHeader>
          <form onSubmit={onSubmit}>
            <CardContent className="grid sm:grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-slate-500 mb-1">Nombre legal</div>
                <Input value={form.nombreLegal} onChange={onChange("nombreLegal")} />
              </div>
              <div>
                <div className="text-xs text-slate-500 mb-1">Domicilio</div>
                <Input value={form.domicilio} onChange={onChange("domicilio")} />
              </div>
              <div>
                <div className="text-xs text-slate-500 mb-1">Teléfono</div>
                <Input value={form.telefono} onChange={onChange("telefono")} />
              </div>
              <div>
                <div className="text-xs text-slate-500 mb-1">Email</div>
                <Input type="email" value={form.email} onChange={onChange("email")} />
              </div>
              <div className="sm:col-span-2">
                <div className="text-xs text-slate-500 mb-1">Categoría de monotributo</div>
                <select
                  value={form.categoriaMonotributo}
                  onChange={onChange("categoriaMonotributo")}
                  className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                >
                  {["A","B","C","D","E","F","G","H","I","J","K"].map(c => (
                    <option key={c} value={c}>Categoría {c}</option>
                  ))}
                </select>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">Guardar cambios</Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </section>
  );
}