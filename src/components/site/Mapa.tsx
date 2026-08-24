import { useState } from "react";
import mapa from "@/assets/mapa.jpg";
import neg1 from "@/assets/neg-1.jpg";
import neg2 from "@/assets/neg-2.jpg";
import neg3 from "@/assets/neg-3.jpg";
import { Reveal } from "./Reveal";

type Marcador = {
  id: string;
  nombre: string;
  categoria: string;
  municipio: string;
  x: number;
  y: number;
  img: string;
};

const categorias = [
  "Restaurantes",
  "Alojamientos",
  "Comercios",
  "Actividades",
  "Naturaleza",
  "Lugares de interés",
] as const;

const municipios = ["Sotillo de la Adrada", "La Adrada", "Piedralaves", "Casavieja"];

const marcadores: Marcador[] = [
  {
    id: "1",
    nombre: "Mesón La Adrada",
    categoria: "Restaurantes",
    municipio: "Sotillo de la Adrada",
    x: 32,
    y: 40,
    img: neg1,
  },
  {
    id: "2",
    nombre: "Casa Rural El Pinar",
    categoria: "Alojamientos",
    municipio: "Piedralaves",
    x: 61,
    y: 30,
    img: neg2,
  },
  {
    id: "3",
    nombre: "Horno de la Plaza",
    categoria: "Comercios",
    municipio: "La Adrada",
    x: 47,
    y: 63,
    img: neg3,
  },
  {
    id: "4",
    nombre: "Garganta de Nuño Cojo",
    categoria: "Naturaleza",
    municipio: "Piedralaves",
    x: 74,
    y: 58,
    img: neg2,
  },
  {
    id: "5",
    nombre: "Ruta de los Molinos",
    categoria: "Actividades",
    municipio: "Casavieja",
    x: 20,
    y: 68,
    img: neg1,
  },
];

export function Mapa() {
  const [cat, setCat] = useState<string>("Todo");
  const [mun, setMun] = useState<string>("Todos");
  const [activo, setActivo] = useState<Marcador | null>(marcadores[0]);

  const visibles = marcadores.filter(
    (m) => (cat === "Todo" || m.categoria === cat) && (mun === "Todos" || m.municipio === mun),
  );

  return (
    <section id="mapa" className="bg-background py-24 sm:py-32">
      <div className="container-page">
        <Reveal>
          <p className="eyebrow text-terracotta">Mapa</p>
          <h2 className="mt-5 text-4xl font-extrabold leading-[1.03] sm:text-5xl">
            Descubre el Valle
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-8 flex flex-wrap items-center gap-2">
            {["Todo", ...categorias].map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors duration-200 ${
                  cat === c
                    ? "bg-forest-deep text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/70"
                }`}
              >
                {c}
              </button>
            ))}
            <select
              value={mun}
              onChange={(e) => setMun(e.target.value)}
              className="ml-auto rounded-lg border border-border bg-card px-3.5 py-2 text-sm font-semibold"
            >
              <option value="Todos">Todos los municipios</option>
              {municipios.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
        </Reveal>

        <Reveal delay={140}>
          <div className="relative mt-6 overflow-hidden rounded-2xl border border-border shadow-soft">
            <img
              src={mapa}
              alt="Mapa del Valle del Tiétar"
              width={1600}
              height={1200}
              loading="lazy"
              className="h-[26rem] w-full object-cover saturate-[0.45] sm:h-[34rem]"
            />
            <span className="absolute inset-0 bg-background/25" />

            {visibles.map((m) => (
              <button
                key={m.id}
                onClick={() => setActivo(m)}
                aria-label={m.nombre}
                style={{ left: `${m.x}%`, top: `${m.y}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-background transition-transform duration-200 hover:scale-110 ${
                  activo?.id === m.id ? "size-6 bg-accent" : "size-4 bg-forest-deep"
                }`}
              />
            ))}

            {activo && visibles.some((m) => m.id === activo.id) && (
              <div className="absolute bottom-4 left-4 right-4 flex items-center gap-4 rounded-xl bg-card p-3 shadow-lift sm:right-auto sm:w-80">
                <img
                  src={activo.img}
                  alt={activo.nombre}
                  width={1200}
                  height={900}
                  loading="lazy"
                  className="size-16 shrink-0 rounded-lg object-cover"
                />
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    {activo.categoria}
                  </p>
                  <p className="truncate text-base font-bold">{activo.nombre}</p>
                  <p className="text-sm text-muted-foreground">{activo.municipio}</p>
                </div>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
