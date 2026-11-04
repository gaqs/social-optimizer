"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { Select } from "@/components/Select";
import { getMediaLibrary } from "./action";
import { Check, Search } from "lucide-react";

export type MediaLibraryItem = {
  path: string; // /uploads/...
  kind: "image" | "video";
  createdAt: string; // cuándo se subió (fecha del post dueño)
  platforms: string[]; // redes donde se usó
  postContent: string; // texto del post de origen
};

interface MediaLibraryProps {
  open: boolean;
  onClose: () => void;
  onSelect: (paths: string[]) => void;
}

const extension = (path: string) => path.split(".").pop()?.toUpperCase() ?? "?";

// Resolución resuelta en el cliente: en la BD no se almacena ancho/alto.
function Resolution({ path, kind }: { path: string; kind: "image" | "video" }) {
  const [res, setRes] = useState("…");

  useEffect(() => {
    let cancelled = false;
    const done = (w: number, h: number) => {
      if (!cancelled && w && h) setRes(`${w}×${h}`);
    };

    if (kind === "video") {
      const video = document.createElement("video");
      video.preload = "metadata";
      video.onloadedmetadata = () => done(video.videoWidth, video.videoHeight);
      video.src = path;
    } else {
      const img = new window.Image();
      img.onload = () => done(img.naturalWidth, img.naturalHeight);
      img.src = path;
    }

    return () => {
      cancelled = true;
    };
  }, [path, kind]);

  return <>{res}</>;
}

export default function MediaLibrary({ open, onClose, onSelect }: MediaLibraryProps) {
  const [items, setItems] = useState<MediaLibraryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState("all");
  const [platform, setPlatform] = useState("all");
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    setLoading(true);
    setSelected([]);
    getMediaLibrary().then((data) => {
      if (!cancelled) {
        setItems(data);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [open]);

  const platforms = useMemo(
    () => [...new Set(items.flatMap((item) => item.platforms))],
    [items],
  );

  const filtered = useMemo(
    () =>
      items.filter((item) => {
        if (
          query &&
          !item.postContent.toLowerCase().includes(query.toLowerCase()) &&
          !item.path.toLowerCase().includes(query.toLowerCase())
        )
          return false;
        if (kind !== "all" && item.kind !== kind) return false;
        if (platform !== "all" && !item.platforms.includes(platform)) return false;
        return true;
      }),
    [items, query, kind, platform],
  );

  const toggle = (path: string) =>
    setSelected((prev) =>
      prev.includes(path) ? prev.filter((p) => p !== path) : [...prev, path],
    );

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        if (!o) onClose();
      }}
    >
      <DialogContent className="flex max-h-[calc(100dvh-2rem)] flex-col gap-0 p-0 sm:max-w-4xl">
        <DialogTitle className="sr-only">Biblioteca de medios</DialogTitle>
        <DialogDescription className="sr-only">
          Reutiliza imágenes o videos que ya subiste en tus publicaciones.
        </DialogDescription>

        <div className="shrink-0 p-6 pb-3">
          <div className="mb-1 text-lg font-bold">Biblioteca de medios</div>
          <div className="mb-4 text-sm text-neutral-500">
            Selecciona una o varias imágenes/videos que ya subiste, o cancela y súbelos desde tu equipo.
          </div>

          <Input
            placeholder="Buscar por temática, post o archivo..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            startAdornment={<Search size={18} />}
          />

          <div className="mt-3 grid grid-cols-2 gap-3">
            <Select label="Tipo" value={kind} onChange={(e) => setKind(e.target.value)}>
              <option value="all">Todos</option>
              <option value="image">Imágenes</option>
              <option value="video">Videos</option>
            </Select>
            <Select
              label="Red social"
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
            >
              <option value="all">Todas</option>
              {platforms.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </Select>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-6 pb-4">
          {loading && (
            <div className="py-10 text-center text-neutral-400">Cargando…</div>
          )}
          {!loading && filtered.length === 0 && (
            <div className="py-10 text-center text-neutral-400">
              {items.length === 0
                ? "Aún no has subido imágenes ni videos en tus publicaciones."
                : "No hay medios que coincidan con los filtros."}
            </div>
          )}

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {filtered.map((item) => {
              const isSelected = selected.includes(item.path);
              return (
                <button
                  key={item.path}
                  type="button"
                  onClick={() => toggle(item.path)}
                  className={`overflow-hidden rounded-xl border-2 text-left transition ${
                    isSelected ? "border-indigo-600" : "border-transparent"
                  }`}
                >
                  <div className="relative aspect-[4/5] w-full bg-neutral-100">
                    {item.kind === "video" ? (
                      <video
                        src={item.path}
                        muted
                        playsInline
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <Image
                        src={item.path}
                        alt={item.postContent}
                        fill
                        className="object-cover"
                      />
                    )}

                    {isSelected && (
                      <div className="absolute right-2 top-2 rounded-full bg-indigo-600 p-1 text-white">
                        <Check size={14} strokeWidth={3} />
                      </div>
                    )}

                    <div className="absolute bottom-0 left-0 bg-black/60 px-2 py-0.5 text-xs text-white">
                      {extension(item.path)} · <Resolution path={item.path} kind={item.kind} />
                    </div>
                  </div>

                  <div className="p-2 text-xs">
                    <div className="mb-1 flex flex-wrap gap-1">
                      {item.platforms.map((p) => (
                        <span
                          key={p}
                          className="rounded bg-indigo-50 px-1.5 py-0.5 text-[11px] text-indigo-600"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                    <div className="text-neutral-500">
                      Subido {new Date(item.createdAt).toLocaleDateString("es-CL")}
                    </div>
                    <div className="truncate text-neutral-400">{item.postContent}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex shrink-0 items-center justify-between gap-3 border-t border-neutral-200 p-4">
          <div className="text-sm text-neutral-500">
            {selected.length} seleccionado{selected.length === 1 ? "" : "s"}
          </div>
          <div className="flex gap-2">
            <Button variant="white" onClick={onClose}>
              Cancelar
            </Button>
            <Button
              variant="primary"
              disabled={selected.length === 0}
              onClick={() => onSelect(selected)}
            >
              Agregar al post
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
