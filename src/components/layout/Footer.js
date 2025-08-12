export default function Footer(){
  return (
    <footer className="border-t py-8 text-sm text-slate-500">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2"><div className="h-8 w-8 rounded-lg bg-emerald-600 text-white grid place-items-center">F</div> © {new Date().getFullYear()} Facturate</div>
        <div className="flex items-center gap-4"><a>Privacidad</a><a>Términos</a><a>Estado</a></div>
      </div>
    </footer>
  );
}