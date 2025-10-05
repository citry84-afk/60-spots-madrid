export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-aurora">
      <div className="container mx-auto px-6 py-24 max-w-2xl">
        <div className="glass rounded-3xl p-10 text-center">
          <h1 className="text-5xl font-bold text-white mb-4">404</h1>
          <p className="text-white/80 mb-6">La página que buscas no existe o ha sido movida.</p>
          <a className="btn-primary px-6 py-3 inline-block" href="/">Volver al inicio</a>
        </div>
      </div>
    </div>
  );
}



