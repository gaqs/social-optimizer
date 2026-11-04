"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import type {
  EventClickArg,
  EventContentArg,
  EventHoveringArg,
} from "@fullcalendar/core";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import SideNav from "@/components/Sidenav";
import Card from "@/components/Card";
import Button from "@/components/Button";
import Charts from "./_sections/Charts";
import { TriangleAlert, BellRing, Pencil } from "lucide-react";
import { firstImageMedia } from "@/lib/media";
import { PLATFORMS } from "@/lib/platforms";

interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  extendedProps: {
    description: string;
    platforms: string[];
    media: string;
    status: string;
  };
}

interface CalendarViewProps {
  events: CalendarEvent[];
}

interface TooltipData {
  id: string;
  description: string;
  platforms: string[];
  media: string;
  status: string;
  start: Date | null;
  x: number;
  y: number;
  pinned: boolean;
}

const TOOLTIP_WIDTH = 320;
const TOOLTIP_HEIGHT = 380;

const STATUS_LABELS: Record<string, string> = {
  draft: "Borrador",
  scheduled: "Programado",
  published: "Publicado",
  failed: "Falló",
};

export default function CalendarView({ events }: CalendarViewProps) {
  const router = useRouter();
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  // Cierra el tooltip al hacer click fuera, con Escape o al desmontar (navegación)
  useEffect(() => {
    if (!tooltip) return;

    const onPointerDown = (event: PointerEvent) => {
      if (tooltipRef.current?.contains(event.target as Node)) return;
      setTooltip(null);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setTooltip(null);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [tooltip]);

  const buildTooltip = (
    info: EventClickArg | EventHoveringArg,
    pinned: boolean,
  ): TooltipData => {
    const { clientX, clientY } = info.jsEvent;
    return {
      id: info.event.id,
      description: info.event.extendedProps.description,
      platforms: info.event.extendedProps.platforms,
      media: info.event.extendedProps.media,
      status: info.event.extendedProps.status,
      start: info.event.start,
      pinned,
      x: Math.min(clientX + 12, window.innerWidth - TOOLTIP_WIDTH - 12),
      y: Math.min(clientY + 12, window.innerHeight - TOOLTIP_HEIGHT),
    };
  };

  const renderEventContent = (eventInfo: EventContentArg) => {
    const { media, platforms } = eventInfo.event.extendedProps;
    const cover = firstImageMedia(media || "");

    return (
      <div className="flex flex-col items-center gap-1 overflow-hidden p-0.5 w-full">
        {cover && (
          <Image
            src={cover}
            alt="post"
            width={48}
            height={48}
            className="w-12 h-12 rounded object-cover shrink-0"
          />
        )}
        <span className="text-xs truncate">
          {platforms?.[0]}
          {platforms?.length > 1 ? ` +${platforms.length - 1}` : ""}
        </span>
      </div>
    );
  };

  const handleEventMouseEnter = (info: EventHoveringArg) => {
    if (tooltip?.pinned) return;
    setTooltip(buildTooltip(info, false));
  };

  const handleEventMouseLeave = () => {
    setTooltip((prev) => (prev?.pinned ? prev : null));
  };

  const handleEventClick = (info: EventClickArg) => {
    info.jsEvent.preventDefault();
    setTooltip((prev) =>
      prev?.pinned && prev.id === info.event.id
        ? null
        : buildTooltip(info, true),
    );
  };

  const cover = tooltip ? firstImageMedia(tooltip.media || "") : null;

  return (
    <main className="mx-auto bg-indigo-10 flex bg-slate-50">
      <SideNav />

      <section id="calendar" className="calendar-container container py-20 px-20 mt-10">
        <div className="mb-10">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin]}
            headerToolbar={{
              start: "prev,next today",
              center: "title",
              end: "dayGridMonth,dayGridWeek,timeGridDay",
            }}
            initialView="dayGridMonth"
            locale="es"
            fixedWeekCount={false}
            height="600px"
            events={events}
            editable={false}
            eventContent={renderEventContent}
            eventMouseEnter={handleEventMouseEnter}
            eventMouseLeave={handleEventMouseLeave}
            eventClick={handleEventClick}
            slotDuration="00:30:00"
            slotLabelFormat={{ hour: "2-digit", minute: "2-digit", hour12: false }}
            slotMinTime="06:00:00"
            slotMaxTime="22:00:00"
            allDaySlot={true}
          />
        </div>

        <div className="grid grid-cols-12 gap-5">
          <Card className="content-error-messages col-span-4">
            <h4 className="mb-5">Brecha de contenido</h4>
            <div className="content-message flex flex-row mb-5">
              <div className="icon_info p-3 bg-red-200 rounded-md text-red-600 mr-2 w-fit">
                <TriangleAlert />
              </div>
              <div className="flex flex-col text-sm content-center">
                <div className="font-bold">Semana 4 sin posts</div>
                <div>Sin posts el dia 04 de Octubre</div>
              </div>
            </div>
            <div className="content-message flex flex-row mb-5">
              <div className="icon_info p-3 bg-yellow-200 rounded-md text-yellow-600 mr-2 w-fit">
                <BellRing />
              </div>
              <div className="flex flex-col text-sm content-center">
                <div className="font-bold">Oportunidad de post</div>
                <div>Mejor tiempo: Hoy a las 8:00am</div>
              </div>
            </div>
          </Card>
          <Card className="campain-performance col-span-8">
            <Charts />
          </Card>
        </div>
      </section>

      {tooltip && (
        <div
          ref={tooltipRef}
          role="dialog"
          aria-label="Previsualización del post"
          className="fixed z-50 w-80 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          <div className="flex items-center gap-2 border-b border-neutral-100 p-3">
            {tooltip.platforms.map((p) => {
              const platform = PLATFORMS.find((item) => item.id === p);
              if (!platform) return null;
              return (
                <Image
                  key={p}
                  src={platform.icon}
                  alt={platform.label}
                  width={18}
                  height={18}
                />
              );
            })}
            <span className="ml-auto rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-bold text-indigo-600">
              {STATUS_LABELS[tooltip.status] ?? tooltip.status}
            </span>
          </div>

          {cover && (
            <Image
              src={cover}
              alt="Media del post"
              width={TOOLTIP_WIDTH}
              height={160}
              className="h-40 w-full object-cover"
            />
          )}

          <div className="flex flex-col gap-2 p-3">
            <p className="line-clamp-3 text-sm text-neutral-700">
              {tooltip.description || "Sin contenido"}
            </p>
            <div className="text-xs text-neutral-400">
              {tooltip.start?.toLocaleString("es-CL") ?? "Sin fecha"}
            </div>
            <Button
              variant="primary"
              className="w-full text-sm font-bold"
              onClick={() => router.push(`/post?edit=${tooltip.id}`)}
            >
              <Pencil size={14} />
              Editar post
            </Button>
          </div>
        </div>
      )}
    </main>
  );
}
