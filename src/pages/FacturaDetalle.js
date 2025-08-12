import { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { ArrowLeft, Download, Mail, QrCode } from "lucide-react";
import { invoices } from "../data/invoices";
import { getStatusDefinition } from "../constants/statuses";

export default function FacturaDetalle() {
  const { nro } = useParams();
  const navigate = useNavigate();

  const factura = useMemo(() => invoices.find((i) => i.nroComprobante === nro), [nro]);

  if (!factura) {
    return (
      <section className="py-10">
        <Card>
          <CardHeader>
            <CardTitle>Comprobante no encontrado</CardTitle>
          </CardHeader>
          <CardContent>
            <Button variant="outline" onClick={() => navigate(-1)}>Volver</Button>
          </CardContent>
        </Card>
      </section>
    );
  }

  const status = getStatusDefinition(factura.estado);

  return (
    <section className="py-10">
      <div className="flex items-center gap-3 mb-4">
        <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2"><ArrowLeft className="h-4 w-4"/>Volver</Button>
        <div className="text-sm text-slate-500">Detalle de Factura</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">Factura C</CardTitle>
          </CardHeader>
          <CardContent>
                          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6 text-sm">
                <Field label="Fecha" value={factura.fecha} />
                <Field label="Importe" value={factura.importe} />
                <Field label="Punto de Venta" value={factura.puntoDeVenta} mono />
                <Field label="Nro. Comprobante" value={factura.nroComprobante} mono />
                <Field label="Concepto" value={factura.concepto} />
                <Field label="CAE" value={factura.cae} mono />
                <Field label="Estado" value={<Badge className={status.badgeClass}>{status.label}</Badge>} />
                <Field label="Vto. CAE" value={factura.vtoCAE} />
              </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><QrCode className="h-5 w-5 text-emerald-600"/>Código QR</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center gap-4">
              <div className="h-56 w-56 bg-gray-50 border rounded-lg grid place-items-center text-slate-400">QR</div>
              <div className="w-full flex flex-col gap-3">
                <Button className="bg-emerald-600 hover:bg-emerald-700 gap-2"><Download className="h-4 w-4"/>Documento PDF</Button>
                <Button variant="purple" className="gap-2"><Mail className="h-4 w-4"/>Enviar por email</Button>
                <Button variant="destructive" className="gap-2"><span className="h-4 w-4">✖</span>Anular factura</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function Field({ label, value, mono, align }) {
  return (
    <div className="p-4 rounded-lg bg-gray-50 border border-gray-100 shadow-sm">
      <div className="text-xs text-slate-500">{label}</div>
      <div className={`mt-1 ${mono ? 'font-mono' : ''} ${align === 'right' ? 'text-right' : ''}`}>{value}</div>
    </div>
  );
} 