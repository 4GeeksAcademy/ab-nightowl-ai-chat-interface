export default function Home() {
  const menuItems = [
    "Optimizacion de Tokens",
    "Arquitectura GPT-4",
    "Analisis Predictivo",
    "Configuracion de API",
  ];

  const bars = [38, 56, 22, 76, 48, 34];

  return (
    <div className="min-h-screen bg-[#08132b] text-[#dbe6ff]">
      <div className="mx-auto min-h-screen max-w-[1600px] border-x border-[#2b3e64]/80 lg:grid lg:grid-cols-[320px_1fr_380px]">
        <aside className="border-b border-[#2b3e64]/80 bg-[#121f3f] lg:border-r lg:border-b-0">
          <div className="flex h-full flex-col p-5 sm:p-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-[#1fe2ff]">NEURAL_CORE</h1>
              <p className="mt-1 font-mono text-sm text-[#95a9d4]">v2.4.0_STABLE</p>
            </div>

            <button className="mt-7 flex h-12 items-center justify-center gap-3 rounded-md border border-[#4f668f] bg-[#2b3658] px-4 text-sm font-medium text-[#18dffd] transition hover:bg-[#36456a]">
              <span className="text-xl leading-none">+</span>
              <span>New Chat</span>
            </button>

            <nav className="mt-7 space-y-2">
              {menuItems.map((item) => (
                <a
                  key={item}
                  href="#"
                  className="flex items-center gap-3 rounded-md px-2 py-2 text-lg text-[#c9d7f2] transition hover:bg-[#1d2a4b]"
                >
                  <span className="h-5 w-5 rounded-sm border border-[#5e739a]" />
                  <span>{item}</span>
                </a>
              ))}
            </nav>

            <div className="mt-auto space-y-2 pt-8">
              <a href="#" className="flex items-center gap-3 rounded-md px-2 py-2 text-xl text-[#d1defa] hover:bg-[#1d2a4b]">
                <span className="h-5 w-5 rounded-full border border-[#5e739a]" />
                <span>Help</span>
              </a>
              <a href="#" className="flex items-center gap-3 rounded-md px-2 py-2 text-xl text-[#d1defa] hover:bg-[#1d2a4b]">
                <span className="h-5 w-5 rounded-sm border border-[#5e739a]" />
                <span>Logout</span>
              </a>
            </div>

            <button className="mt-5 h-11 rounded-md border border-[#45eefe]/60 bg-[#19d8f5] font-mono text-xs font-semibold tracking-wider text-[#0d2c4b] transition hover:brightness-110">
              UPGRADE_PLAN
            </button>
          </div>
        </aside>

        <main className="border-b border-[#2b3e64]/80 bg-[#061137] lg:border-r lg:border-b-0">
          <div className="flex h-full flex-col">
            <header className="flex flex-wrap items-center gap-4 border-b border-[#2b3e64]/80 px-5 py-4 sm:px-7">
              <h2 className="text-4xl font-bold tracking-tight text-[#d7e4ff]">CLARITY_AI</h2>
              <nav className="flex items-center gap-6 font-mono text-sm uppercase text-[#b0c3e8]">
                <a href="#" className="border-b-2 border-[#1ce4ff] pb-1 text-[#1ce4ff]">
                  Models
                </a>
                <a href="#" className="hover:text-white">
                  API
                </a>
                <a href="#" className="hover:text-white">
                  Docs
                </a>
              </nav>
              <div className="ml-auto flex items-center gap-3">
                <div className="rounded-full border border-[#446086] bg-[#1b2949] px-4 py-2 font-mono text-sm text-[#c8dafd]">
                  Token Metrics: 2.4k
                </div>
                <span className="h-7 w-7 rounded-full border border-[#56749d]" />
                <span className="h-7 w-7 rounded-full border border-[#56749d]" />
              </div>
            </header>

            <section className="flex-1 space-y-6 overflow-y-auto px-5 py-6 sm:px-7">
              <article className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="h-10 w-10 rounded-sm bg-[#16dcfb]" />
                  <p className="font-mono text-xl uppercase tracking-wide text-[#d7e6ff]">SYSTEM_READY</p>
                </div>
                <p className="max-w-[96%] text-lg leading-relaxed text-[#dce7ff]">
                  Hola. Soy tu asistente NEURAL_CORE. He analizado tu solicitud sobre la gestion de tokens. Como puedo ayudarte a optimizar tu flujo de trabajo hoy? Podemos revisar el historial de consumo o ajustar los parametros del modelo.
                </p>
              </article>

              <div className="flex justify-end">
                <div className="max-w-[92%] rounded-2xl border border-[#4b648f] bg-[#2a3658] px-7 py-5 text-lg leading-relaxed text-[#d8e5ff]">
                  Puedes darme un desglose de los tokens utilizados en el ultimo analisis tecnico?
                </div>
              </div>

              <article className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="h-10 w-10 rounded-sm bg-[#16dcfb]" />
                  <p className="font-mono text-xl uppercase tracking-wide text-[#d7e6ff]">PROCESSING_TOKEN</p>
                </div>

                <p className="text-lg text-[#dce7ff]">Entendido. Aqui tienes el desglose tecnico de la ultima sesion:</p>

                <div className="overflow-hidden rounded-2xl border border-[#415b86] bg-[#0d1835]">
                  <div className="flex items-center justify-between border-b border-[#4b648f] bg-[#323d5f] px-5 py-3">
                    <span className="font-mono text-xl uppercase tracking-wide text-[#d1e0fc]">JSON_OUTPUT</span>
                    <button className="font-mono text-xl uppercase tracking-wide text-[#d1e0fc]">COPY</button>
                  </div>
                  <pre className="overflow-x-auto bg-black px-5 py-5 font-mono text-base leading-relaxed text-[#31f1c5]">{`{
  "request_id": "nc_89234x",
  "tokens_prompt": 452,
  "tokens_completion": 890,
  "total_tokens": 1342,
  "cost_usd": 0.00268
}`}</pre>
                </div>

                <p className="text-lg text-[#dce7ff]">El consumo fue eficiente debido a la compresion de contexto aplicada.</p>
              </article>
            </section>

            <footer className="border-t border-[#2b3e64]/80 px-5 py-5 sm:px-7">
              <div className="rounded-2xl border border-[#425c84] bg-[#141f41] p-4">
                <textarea
                  className="h-36 w-full resize-none bg-transparent text-lg text-[#dce8ff] outline-none placeholder:text-[#95abd3]"
                  placeholder="Describe tu consulta de IA aqui..."
                />
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-[#c6d8fa]">
                    <span className="h-8 w-8 rounded-md border border-[#5e739a]" />
                    <span className="h-8 w-8 rounded-md border border-[#5e739a]" />
                  </div>
                  <button className="h-12 min-w-[220px] rounded-2xl border border-[#48f1ff]/70 bg-[#1adcf8] px-6 font-mono text-sm font-semibold tracking-wide text-[#082847] transition hover:brightness-110">
                    ENVIAR_PROMPT
                  </button>
                </div>
              </div>
            </footer>
          </div>
        </main>

        <aside className="bg-[#0c1738] px-5 py-6">
          <div className="space-y-6">
            <h3 className="font-mono text-xl uppercase tracking-wide text-[#d8e6ff]">ESTADISTICAS DE TOKEN</h3>

            <section className="rounded-2xl border border-[#405b86] bg-[#101f42] p-5">
              <p className="font-mono text-xl uppercase tracking-wide text-[#bbceef]">Tokens Usados (Hoy)</p>
              <p className="mt-2 text-5xl font-bold text-[#d4e3ff]">145,280</p>
              <p className="mt-2 text-2xl text-[#41efca]">+12% vs. ayer</p>
            </section>

            <section className="rounded-2xl border border-[#405b86] bg-[#101f42] p-5">
              <div className="mb-3 flex items-center justify-between">
                <p className="font-mono text-xl uppercase tracking-wide text-[#caddff]">Presupuesto Diario</p>
                <span className="font-mono text-xl text-[#d8e6ff]">72%</span>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-[#2a3858]">
                <div className="h-full w-[72%] bg-[#1fe2fb]" />
              </div>
              <p className="mt-3 text-xl italic text-[#b5caed]">Limite: 200,000 tokens</p>
            </section>

            <section className="rounded-2xl border border-[#405b86] bg-[#101f42] p-5">
              <p className="font-mono text-xl uppercase tracking-wide text-[#caddff]">Consumo por Mensaje</p>
              <div className="mt-4 flex h-32 items-end justify-between gap-2">
                {bars.map((height, index) => (
                  <div
                    key={height}
                    className={`w-full rounded-t-sm ${index === 4 ? "bg-[#1adcf8]" : "bg-[#4f637d]"}`}
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
              <div className="mt-3 grid grid-cols-6 text-center font-mono text-sm text-[#95abd2]">
                <span>M-5</span>
                <span>M-4</span>
                <span>M-3</span>
                <span>M-2</span>
                <span>AHORA</span>
                <span>PROX</span>
              </div>
            </section>

            <section className="mt-8 border-t border-[#2f4368] pt-6">
              <p className="font-mono text-xl uppercase tracking-wide text-[#d4e3ff]">Costo Estimado</p>
              <p className="mt-2 text-5xl font-bold text-[#4bf2c7]">$34.12 USD</p>
              <button className="mt-5 h-12 w-full rounded-xl border border-[#48618b] bg-[#2d3959] font-mono text-sm font-semibold tracking-wide text-[#dbe9ff] transition hover:bg-[#38496c]">
                GESTIONAR_FACTURACION
              </button>
            </section>

            <div className="h-40 rounded-2xl border border-[#2f4368] bg-[radial-gradient(circle_at_45%_35%,#2a3f63_0%,#0d1733_55%,#091127_100%)]" />
          </div>
        </aside>
      </div>
    </div>
  );
}
