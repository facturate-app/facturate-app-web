export default function Settings() {
    const [company, setCompany] = useState()
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
                            <Input value={company.name} onChange={(e) => setCompany({ ...company, name: e.target.value })} />
                        </div>
                        <div>
                            <Label>CUIT</Label>
                            <Input value={company.cuit} onChange={(e) => setCompany({ ...company, cuit: e.target.value })} />
                        </div>
                        <div>
                            <Label>Dirección</Label>
                            <Input value={company.address} onChange={(e) => setCompany({ ...company, address: e.target.value })} />
                        </div>
                        <div>
                            <Label>Punto de venta</Label>
                            <Input value={company.pos} onChange={(e) => setCompany({ ...company, pos: e.target.value })} />
                        </div>
                        <div className="sm:col-span-2">
                            <Label>Email</Label>
                            <Input value={company.email} onChange={(e) => setCompany({ ...company, email: e.target.value })} />
                        </div>
                        <div className="sm:col-span-2 flex items-center justify-between p-4 border rounded-lg">
                            <div>
                                <div className="font-medium">Mercado Pago</div>
                                <div className="text-sm text-slate-500">Cobrá con link en tus facturas</div>
                            </div>
                            <Switch checked={company.mpEnabled} onCheckedChange={(v) => setCompany({ ...company, mpEnabled: v })} />
                        </div>
                        <div className="sm:col-span-2 flex items-center justify-between p-4 border rounded-lg">
                            <div>
                                <div className="font-medium">WhatsApp</div>
                                <div className="text-sm text-slate-500">Enviá comprobantes por WA</div>
                            </div>
                            <Switch checked={company.waEnabled} onCheckedChange={(v) => setCompany({ ...company, waEnabled: v })} />
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