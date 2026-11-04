"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import SideNav from "@/components/Sidenav";
import Card from "@/components/Card";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { Select } from "@/components/Select";
import Dropdown from "@/components/Dropdown";
import DropdownItem from "@/components/DropdownItem";
import { Progress, ProgressBar } from "@/components/Progress";
import { PLATFORMS } from "@/lib/platforms";
import {
  Search,
  Check,
  Plus,
  Sparkles,
  MoreVertical,
  BarChart3,
  Pencil,
} from "lucide-react";

export type PublicationPost = {
  id: string;
  content: string;
  image: string | null;
  platforms: string[];
  status: string;
  createdAt: string;
  scheduledFor: string | null;
};

const STATUS_LABELS: Record<string, string> = {
  draft: "Borrador",
  scheduled: "Programado",
  published: "Publicado",
  failed: "Falló",
};

const FILTERS = [
  { id: "all", label: "Todos" },
  ...PLATFORMS.map((p) => ({ id: p.id, label: p.label })),
];

const RANGE_MS: Record<string, number> = {
  "7": 7 * 864e5,
  "30": 30 * 864e5,
};

export default function PublicationsView({ posts }: { posts: PublicationPost[] }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [platform, setPlatform] = useState("all");
  const [status, setStatus] = useState("all");
  const [range, setRange] = useState("all");

  const filtered = useMemo(() => {
    const now = Date.now();
    return posts.filter((post) => {
      if (query && !post.content.toLowerCase().includes(query.toLowerCase())) return false;
      if (platform !== "all" && !post.platforms.includes(platform)) return false;
      if (status !== "all" && post.status !== status) return false;
      if (RANGE_MS[range] && now - new Date(post.createdAt).getTime() > RANGE_MS[range]) return false;
      return true;
    });
  }, [posts, query, platform, status, range]);

  const published = posts.filter((post) => post.status === "published").length;
  const scheduled = posts.filter((post) => post.status === "scheduled").length;
  const effectiveness = posts.length ? Math.round((published / posts.length) * 100) : 0;

  // Oportunidad: el post publicado que menos redes cubre (y más reciente entre esos).
  const opportunity = posts
    .filter((post) => post.status === "published" && post.platforms.length < PLATFORMS.length)
    .sort(
      (a, b) =>
        a.platforms.length - b.platforms.length ||
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )[0];

  const missingPlatforms = (post: PublicationPost) =>
    PLATFORMS.filter((p) => !post.platforms.includes(p.id));

  const editUrl = (id: string, add?: string) => `/post?edit=${id}${add ? `&add=${add}` : ""}`;

  return (
    <>
      <main className="mx-auto bg-indigo-10 flex bg-slate-50">
        <SideNav />

        <section id="publications" className="container py-20 px-20 mt-0 mt-10">
          <div className="w-fill md:w-[50%]">
            <h3 className="text-4xl font-bolder mb-3">Gestión de Publicaciones</h3>
            <div className="text-secondary text-sm mb-5">
              Revisa en qué redes ya publicaste y republica el contenido donde falta.
            </div>
          </div>

          <div className="grid grid-cols-12 gap-5 mb-5">
            <Card className="col-span-4">
              <div className="uppercase text-sm font-bold mb-2">Posts creados</div>
              <h2>{posts.length}</h2>
              <div className="text-sm text-neutral-500">Contenidos en tu historial</div>
            </Card>
            <Card className="col-span-4">
              <div className="uppercase text-sm font-bold mb-2">Tasa de efectividad</div>
              <h2>{effectiveness}%</h2>
              <Progress className="h-3 mt-2">
                <ProgressBar value={effectiveness} className="h-3" />
              </Progress>
            </Card>
            <Card className="col-span-4">
              <div className="uppercase text-sm font-bold mb-2">Programados</div>
              <h2>{scheduled}</h2>
              <div className="text-sm text-neutral-500">Pendientes de publicar</div>
            </Card>
          </div>

          {opportunity && (
            <Card className="bg-gradient-to-r from-indigo-950 to-indigo-900 mb-5">
              <div className="flex flex-row items-center justify-between gap-5">
                <div>
                  <div className="flex flex-row text-sm mb-3 uppercase text-amber-600">
                    <div className="mr-2">
                      <Sparkles />
                    </div>
                    <div className="font-bold">Oportunidad de Multidifusión Detectada</div>
                  </div>
                  <div className="text-white font-bold mb-2">
                    &quot;{opportunity.content.substring(0, 90)}...&quot;
                  </div>
                  <div className="text-indigo-200 text-sm mb-5">
                    Publicado solo en {opportunity.platforms.join(", ") || "ninguna red"}. Amplía su
                    alcance publicándolo en las redes que faltan.
                  </div>
                  <Button
                    variant="border_white"
                    className="font-bold text-white"
                    onClick={() => router.push(editUrl(opportunity.id))}
                  >
                    Ampliar alcance →
                  </Button>
                </div>
                <div className="text-xs text-amber-600 font-bold rounded-2xl bg-amber-100 p-2 whitespace-nowrap">
                  {opportunity.platforms.length}/{PLATFORMS.length} redes
                </div>
              </div>
            </Card>
          )}

          <Card className="mb-5">
            <Input
              placeholder="Buscar por temática o título..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              startAdornment={<Search size={18} />}
            />

            <div className="flex flex-wrap gap-2 mt-4">
              {FILTERS.map((filter) => (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setPlatform(filter.id)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium border transition ${
                    platform === filter.id
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-white text-neutral-600 border-neutral-300 hover:border-indigo-400"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-5 mt-4">
              <Select label="Estado" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="all">Todos los estados</option>
                {Object.entries(STATUS_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </Select>
              <Select label="Fecha" value={range} onChange={(e) => setRange(e.target.value)}>
                <option value="all">Todas las fechas</option>
                <option value="7">Últimos 7 días</option>
                <option value="30">Últimos 30 días</option>
              </Select>
            </div>
          </Card>

          {filtered.length === 0 ? (
            <Card>
              <div className="text-center text-neutral-500 py-10">
                No hay publicaciones que coincidan con los filtros.
              </div>
            </Card>
          ) : (
            <div className="grid grid-cols-12 gap-5">
              {filtered.map((post) => (
                <Card
                  key={post.id}
                  image={post.image ?? undefined}
                  imageHeight={200}
                  className="col-span-4"
                >
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {post.platforms.map((p) => (
                      <span
                        key={p}
                        className="flex items-center gap-1 bg-green-100 text-green-700 text-xs font-medium px-2 py-0.5 rounded-full"
                      >
                        <Check size={12} strokeWidth={3} />
                        {p}
                      </span>
                    ))}
                  </div>

                  <div className="text-xs text-neutral-500 mb-2">
                    {STATUS_LABELS[post.status] ?? post.status} ·{" "}
                    {new Date(post.scheduledFor ?? post.createdAt).toLocaleDateString("es-CL")}
                  </div>

                  <p className="font-bold mb-3 line-clamp-3">{post.content}</p>

                  {missingPlatforms(post).length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {missingPlatforms(post).map((p) => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => router.push(editUrl(post.id, p.id))}
                          className="flex items-center gap-1 text-xs font-medium text-indigo-600 border border-dashed border-indigo-300 rounded-full px-3 py-1 hover:bg-indigo-50"
                        >
                          <Plus size={12} strokeWidth={3} />
                          Añadir a {p.label}
                        </button>
                      ))}
                    </div>
                  )}

                  <Button
                    variant="primary"
                    className="w-full font-bold"
                    onClick={() => router.push(editUrl(post.id))}
                  >
                    <Pencil size={16} />
                    Editar y Republicar
                  </Button>

                  <div className="flex items-center justify-between mt-2">
                    <Button
                      variant="white"
                      className="text-sm font-bold"
                      onClick={() => router.push("/analytics")}
                    >
                      <BarChart3 size={16} />
                      Métricas
                    </Button>
                    <Dropdown
                      trigger={
                        <div className="p-2 rounded-lg text-neutral-500 hover:bg-neutral-100">
                          <MoreVertical size={18} />
                        </div>
                      }
                    >
                      <DropdownItem onClick={() => router.push(editUrl(post.id))}>
                        Editar contenido
                      </DropdownItem>
                      <DropdownItem onClick={() => router.push("/analytics")}>
                        Ver rendimiento
                      </DropdownItem>
                    </Dropdown>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}
