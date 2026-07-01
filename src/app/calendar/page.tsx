'use client';

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import SideNav from "@/components/Sidenav";
import Card from "@/components/Card";
import Charts from "./_sections/Charts";
import { useRef } from "react";
import { 
    TriangleAlert,
    BellRing
} from 'lucide-react';

export default function Calendar() {

    const events = [{
        id: "1",
        title: "Instagram Post",
        description: "Post about our new product launch",
        start: "2026-06-10",
        end: "2026-06-12"
    },{
        id: "2",
        title: "Instagram Post",
        description: "Here doing nothing on the beach",
        start: "2026-06-15T09:00:00",
        end: "2026-06-15T11:30:00",
    },{
        id: "3",
        title: "Linkedin Post",
        description: "GOD DAMMIT!!!",
        start: "2026-06-20",
        end: "2026-06-22"
    }]

    const hoverTooltipRef = useRef<HTMLDivElement | null>(null);
    const pinnedTooltipRef = useRef<HTMLDivElement | null>(null);
    //create tooltip
    const createTooltip = (info: any) => {
        const tooltip = document.createElement("div");
        tooltip.className = "calendar-tooltip";
        console.log(info.event);
        tooltip.innerHTML = `
            <div>
                <strong>${info.event.title}</strong><br>
                <span>X</span>
            </div>
            "${info.event.extendedProps.description || "No description"}"<br>
            Start: ${info.event.start.toLocaleString()}<br>
            End: ${info.event.end ? info.event.end.toLocaleString() : "N/A"}
        `;
        document.body.appendChild(tooltip);

        tooltip.style.left = info.jsEvent.pageX + 10 +"px";
        tooltip.style.top = info.jsEvent.pageY + 10 + "px";
        document.body.appendChild(tooltip);
        return tooltip;
    }
    //remove tooltip
    const removeTooltip = (ref:any) => {
        if( ref.current ){
            ref.current.remove();
            ref.current = null;
        }
    }
    //mouseenter
    const handleEventMouseEnter = (info: any) => {
        if (pinnedTooltipRef.current) return;
        hoverTooltipRef.current = createTooltip(info);
    };
    //mouseleave
    const handleEventMouseLeave = (info: any) => {
        removeTooltip(hoverTooltipRef);
    };

    const handleDateClick = (info: any) => {
        if(pinnedTooltipRef.current){
            removeTooltip(pinnedTooltipRef);
            return;
        }
        removeTooltip(hoverTooltipRef);
        pinnedTooltipRef.current = createTooltip(info);

    }

  return (

    <main className="mx-auto bg-indigo-10 flex bg-slate-50">
        <SideNav />

        <section id="calendar" className="calendar-container container py-20 px-20 mt-0 mt-10">

            <div className="mb-10">
                <FullCalendar 
                    plugins={[dayGridPlugin, timeGridPlugin]}
                    headerToolbar={{
                        start: "prev,next today",
                        center: "title",
                        end: "dayGridMonth,dayGridWeek,timeGridDay"
                    }}
                    initialView="dayGridMonth"
                    locale="es"
                    fixedWeekCount={false}
                    height= "600px"
                    events={events}
                    editable={true}
                    eventMouseEnter={handleEventMouseEnter}
                    eventMouseLeave={handleEventMouseLeave}
                    eventClick={handleDateClick}

                    slotDuration="00:30:00"           // intervalos de 30 minutos
                    slotLabelFormat={{ hour: '2-digit', minute: '2-digit', hour12: false }}
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
    </main>

  );

}