import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { FileText, Search, Plus, X, Calendar } from "lucide-react";
import { getStatusDefinition, INVOICE_STATUS } from "../constants/statuses";
import { invoices as invoicesData } from "../data/invoices";
import { Input } from "../components/ui/Input";
import { Textarea } from "../components/ui/Textarea";

export default function Facturacion() {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const [isNewOpen, setIsNewOpen] = useState(false);
  const [newInvoice, setNewInvoice] = useState({
    concepto: "Productos",
    descripcion: "",
    importe: "",
    medioPago: "Efectivo",
    fechaEmision: new Date().toISOString().slice(0, 10),
    periodoDesde: "",
    periodoHasta: "",
    clienteNombre: "",
    clienteTipoDoc: "DNI",
    clienteDocumento: "",
    clienteEmail: "",
  });

  const invoices = useMemo(() => invoicesData, []);

  const parseInvoiceDate = (s) => {
    const [d, m, rest] = s.split("/");
    const [y, time] = (rest || "").split(", ");
    const [hh, mm] = (time || "00:00").split(":");
    return new Date(Number(y), Number(m) - 1, Number(d), Number(hh), Number(mm));
  };
  const parseDateInput = (s) => {
    if (!s) return null;
    const [y, m, d] = s.split("-");
    return new Date(Number(y), Number(m) - 1, Number(d), 0, 0, 0);
  };

  const fromDateObj = useMemo(() => parseDateInput(dateFrom), [dateFrom]);
  const toDateObj = useMemo(() => {
    const d = parseDateInput(dateTo);
    if (!d) return null;
    d.setHours(23, 59, 59, 999);
    return d;
  }, [dateTo]);

  const filtered = useMemo(() => {
    return invoices.filter((i) => {
      const q = query.trim().toLowerCase();
      const matchesQuery = q === "" || [
        i.nroComprobante,
        i.puntoDeVenta,
        i.concepto,
        i.cae,
        i.importe,
        i.fecha,
        i.estado,
      ].some((v) => String(v).toLowerCase().includes(q));

      const matchesStatus = status === "" || i.estado === status;

      const when = parseInvoiceDate(i.fecha);
      const afterFrom = !fromDateObj || when >= fromDateObj;
      const beforeTo = !toDateObj || when <= toDateObj;

      return matchesQuery && matchesStatus && afterFrom && beforeTo;
    });
  }, [invoices, query, status, fromDateObj, toDateObj]);

  const isServicio = useMemo(() => newInvoice.concepto.toLowerCase().includes("servicio"), [newInvoice.concepto]);

  const onChangeNew = (field) => (e) => {
    const value = e?.target ? e.target.value : e;
    setNewInvoice((prev) => ({ ...prev, [field]: value }));
  };

  const onSubmitNew = (e) => {
    e.preventDefault();
    setIsNewOpen(false);
  };

  const clearFilters = () => {
    setStatus("");
    setDateFrom("");
    setDateTo("");
  };

  return (
    <section className="py-6 h-full">
      <Card className="shadow-sm h-full">
        <CardHeader>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-3">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-emerald-600" />
                Comprobantes emitidos
              </CardTitle>
              <Button size="sm" className="gap-2" onClick={() => setIsNewOpen(true)}><Plus className="h-4 w-4"/>Nueva factura</Button>
            </div>

            <div className="relative w-full md:w-96">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar (nro, CAE, concepto, importe, fecha)"
                className="pl-9"
              />
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="text-xs text-slate-500">Estado</div>
              <div className="inline-flex rounded-md border border-gray-200 bg-white p-1">
                {['', INVOICE_STATUS.CONFIRMADA, INVOICE_STATUS.ANULADA].map((s) => (
                  <button
                    key={s || 'Todos'}
                    className={`h-8 px-3 rounded-md text-xs font-medium ${status===s ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'text-slate-600 hover:bg-gray-50'}`}
                    onClick={() => setStatus(s)}
                    type="button"
                  >{s || 'Todos'}</button>
                ))}
              </div>

              <div className="text-xs text-slate-500 ml-2">Periodo</div>
              <div className="flex items-center gap-2 rounded-md border border-gray-200 bg-white p-1">
                <div className="relative">
                  <Input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="pl-8 h-8" />
                  <Calendar className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                </div>
                <span className="text-slate-400">—</span>
                <div className="relative">
                  <Input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="pl-8 h-8" />
                  <Calendar className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                </div>
                <Button variant="ghost" size="sm" onClick={clearFilters}>Limpiar</Button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="h-[calc(100%-4rem)]">
          <div className="overflow-auto max-h-full">
            <table className="w-full text-sm text-slate-700">
              <thead className="sticky top-0 bg-white">
                <tr className="border-b text-slate-500">
                  <th className="text-left py-3 px-2">Fecha</th>
                  <th className="text-left py-3 px-2">Importe</th>
                  <th className="text-left py-3 px-2">Punto de venta</th>
                  <th className="text-left py-3 px-2">Nro. de comprobante</th>
                  <th className="text-left py-3 px-2">Concepto</th>
                  <th className="text-left py-3 px-2">CAE</th>
                  <th className="text-left py-3 px-2">Estado</th>
                  <th className="text-right py-3 px-2">Detalle</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map((inv) => (
                  <tr key={inv.nroComprobante} className="hover:bg-emerald-50/40">
                    <td className="py-3 px-2 whitespace-nowrap bg-gray-50 rounded-l-md border border-gray-100">{inv.fecha}</td>
                    <td className="py-3 px-2 font-medium bg-gray-50 text-left border border-gray-100">{inv.importe}</td>
                    <td className="py-3 px-2 font-mono bg-gray-50 border border-gray-100">{inv.puntoDeVenta}</td>
                    <td className="py-3 px-2 font-mono bg-gray-50 border border-gray-100">{inv.nroComprobante}</td>
                    <td className="py-3 px-2 bg-gray-50 border border-gray-100">{inv.concepto}</td>
                    <td className="py-3 px-2 font-mono bg-gray-50 border border-gray-100">{inv.cae}</td>
                    <td className="py-3 px-2 bg-gray-50 border border-gray-100">
                      {(() => { const s = getStatusDefinition(inv.estado); return (<Badge className={s.badgeClass}>{s.label}</Badge>); })()}
                    </td>
                    <td className="py-3 px-2 text-right bg-gray-50 rounded-r-md border border-gray-100">
                      <Button variant="outline" size="sm" onClick={() => navigate(`/web-app/facturacion/${inv.nroComprobante}`)}>Ver</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {isNewOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-3xl rounded-xl bg-white shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <div className="text-lg font-semibold">Nueva factura</div>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsNewOpen(false)}><X/></Button>
            </div>
            <form onSubmit={onSubmitNew} className="px-6 py-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-slate-500 mb-1">Concepto</div>
                  <select
                    value={newInvoice.concepto}
                    onChange={onChangeNew("concepto")}
                    className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                  >
                    <option>Productos</option>
                    <option>Servicios</option>
                    <option>Productos y servicios</option>
                  </select>
                </div>
                <div>
                  <div className="text-xs text-slate-500 mb-1">Importe</div>
                  <Input type="number" step="0.01" min="0" value={newInvoice.importe} onChange={onChangeNew("importe")} />
                </div>
                <div className="md:col-span-2">
                  <div className="text-xs text-slate-500 mb-1">Descripción</div>
                  <Textarea rows={3} value={newInvoice.descripcion} onChange={onChangeNew("descripcion")} />
                </div>
                <div>
                  <div className="text-xs text-slate-500 mb-1">Medio de pago</div>
                  <select
                    value={newInvoice.medioPago}
                    onChange={onChangeNew("medioPago")}
                    className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                  >
                    <option>Efectivo</option>
                    <option>Transferencia</option>
                    <option>Tarjeta</option>
                    <option>Mercado Pago</option>
                  </select>
                </div>
                <div>
                  <div className="text-xs text-slate-500 mb-1">Fecha del comprobante</div>
                  <Input type="date" value={newInvoice.fechaEmision} onChange={onChangeNew("fechaEmision")} />
                </div>

                {isServicio && (
                  <>
                    <div>
                      <div className="text-xs text-slate-500 mb-1">Periodo desde</div>
                      <Input type="date" value={newInvoice.periodoDesde} onChange={onChangeNew("periodoDesde")} />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 mb-1">Periodo hasta</div>
                      <Input type="date" value={newInvoice.periodoHasta} onChange={onChangeNew("periodoHasta")} />
                    </div>
                  </>
                )}

                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Nombre o Razón social</div>
                    <Input value={newInvoice.clienteNombre} onChange={onChangeNew("clienteNombre")} />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Tipo de documento</div>
                    <select
                      value={newInvoice.clienteTipoDoc}
                      onChange={onChangeNew("clienteTipoDoc")}
                      className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                    >
                      <option>DNI</option>
                      <option>CUIT</option>
                      <option>CUIL</option>
                      <option>Pasaporte</option>
                    </select>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Nro. de documento</div>
                    <Input value={newInvoice.clienteDocumento} onChange={onChangeNew("clienteDocumento")} />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Email</div>
                    <Input type="email" value={newInvoice.clienteEmail} onChange={onChangeNew("clienteEmail")} />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-3">
                <Button variant="ghost" type="button" onClick={() => setIsNewOpen(false)}>Cancelar</Button>
                <Button type="submit" className="gap-2">Guardar</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
} 