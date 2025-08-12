const pad = (num, size = 2) => String(num).padStart(size, '0');
const formatCurrency = (n) => `$${new Intl.NumberFormat('es-AR').format(n)}`;

const buildDate = (y, m, d, hh, mm) => `${pad(d)}/${pad(m)}/${y}, ${pad(hh)}:${pad(mm)}`;

const baseSamples = [
  { fecha: "07/08/2025, 20:38", importe: "$3.000", puntoDeVenta: "00002", nroComprobante: "0000000004", concepto: "Productos", cae: "75329434830460", estado: "Anulada", vtoCAE: "17/08/2025" },
  { fecha: "07/08/2025, 20:32", importe: "$2.000", puntoDeVenta: "00002", nroComprobante: "0000000003", concepto: "Productos", cae: "75329434002080", estado: "Confirmada", vtoCAE: "17/08/2025" },
  { fecha: "07/08/2025, 19:44", importe: "$2.000", puntoDeVenta: "00002", nroComprobante: "0000000002", concepto: "Productos", cae: "75329426957158", estado: "Anulada", vtoCAE: "17/08/2025" },
];

const generated = (() => {
  const list = [];
  const year = 2025;
  const month = 8;
  let caeSeed = 75329430000000;
  for (let i = 5; i <= 140; i++) {
    const day = 5 + (i % 5); // 05..09
    const hh = 9 + (i % 10); // 09..18
    const mm = (i * 7) % 60;
    const fecha = buildDate(year, month, day, hh, mm);
    const importeNum = 1000 + (i * 37) % 9000; // 1000..9999
    const importe = formatCurrency(importeNum);
    const puntoDeVenta = "00002";
    const nroComprobante = pad(i, 10);
    const concepto = i % 3 === 0 ? "Servicios" : "Productos";
    const cae = String(caeSeed + i).padEnd(14, '0').slice(0, 14);
    const estado = i % 2 === 0 ? "Confirmada" : "Anulada";
    const vtoCAE = buildDate(year, month, 17, 0, 0).split(",")[0];
    list.push({ fecha, importe, puntoDeVenta, nroComprobante, concepto, cae, estado, vtoCAE });
  }
  return list;
})();

export const invoices = [...baseSamples, ...generated]; 