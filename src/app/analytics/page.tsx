"use client";

import { useState } from "react";
import SideNav from "@/components/Sidenav";
import Image from "next/image";
import Card from "@/components/Card";
import Badge from "@/components/Badge";
import Button from "@/components/Button";
import { Progress, ProgressBar } from "@/components/Progress";
import { Table,
TableHeader,
TableBody,
TableRow,
TableHead,
TableCell } from "@/components/Table";

import {
  BarChart,
  Bar,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { LoaderCircle, BrainCog, Sparkles } from "lucide-react";

export default function Analytics() {
  const data = [
    { date: "2026-06-01", users: 120 },
    { date: "2026-06-02", users: 145 },
    { date: "2026-06-03", users: 132 },
    { date: "2026-06-04", users: 178 },
    { date: "2026-06-05", users: 201 },
    { date: "2026-06-06", users: 189 },
    { date: "2026-06-07", users: 220 },
  ];

  const description = {
    text1:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    text2:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    text3:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  };

  return (
    <>
      <main className="mx-auto bg-indigo-10 flex bg-slate-50">
        <SideNav />

        <section id="analytics" className="container py-20 px-20 mt-0 mt-10">
          <div className="w-fill md:w-[50%]">
            <h3 className="text-4xl font-bolder mb-3">
              Rendimiento Inteligente
            </h3>
            <div className="text-secondary text-sm mb-5">
              Introducete dentro de su ecosistema social. La informacion es
              procesada en tiempo real para su claridad.
            </div>
          </div>
          <div id="analytics-container" className="flex flex-col gap-5">
            <div
              id="top-analytics-container"
              className="grid grid-cols-12 gap-5"
            >
              <Card className="col-span-4">
                <div className="flex flex-row justify-between">
                  <div className="uppercase text-sm font-bold">
                    Total Engagement
                  </div>
                  <Badge>+24%</Badge>
                </div>
                <h2>842.9k</h2>
                <div>Across all linked professional accounts</div>
              </Card>
              <Card className="col-span-8 bg-gradient-to-r from-indigo-950 to-indigo-900">
                <div className="flex flex-row items-center justify-between">
                  <div className="">
                    <div className="flex flex-row text-sm mb-5 uppercase text-amber-600">
                      <div className="mr-2">
                        <Sparkles />
                      </div>
                      <div className="font-bold">
                        {" "}
                        Recomendado para maximo alcance
                      </div>
                    </div>
                    <div className="text-white font-bold mb-5">
                      "Deberias postear mas contenido en video los Miercoles a
                      las 10 AM para acalanzar a tu audiencia de manera mas
                      efectiva"
                    </div>
                    <Button
                      variant="border_white"
                      className="font-bold text-white"
                    >
                      Aplicar a mi agenda →
                    </Button>
                  </div>
                  <div className="relative flex h-[120px] w-[120px] items-center justify-center">
                    <LoaderCircle
                      size={120}
                      strokeWidth={0.7}
                      color="white"
                      className="animate-spin [animation-duration:5s]"
                    />
                    <BrainCog
                      size={28}
                      strokeWidth={2}
                      color="white"
                      className="absolute"
                    />
                  </div>
                </div>
              </Card>
            </div>

            <div id="middle-amalytics-container">
              <Card className="analytics-best-time bg-indigo-50">
                <h4 className="mb-2">Comparación de Redes Sociales</h4>
                <div className="text-sm mb-5">Desglose del rendimiento en todas las plataformas conectadas</div>

                <Table className="w-full table-auto border-separate border-spacing-y-3">
                  <TableHeader className="border-none">
                    <TableRow className="border-none uppercase text-xs text-muted-foreground">
                      <TableHead className="text-center font-bold">Plataforma</TableHead>
                      <TableHead className="text-center font-bold">Interaccion</TableHead>
                      <TableHead className="text-center font-bold">Alcance</TableHead>
                      <TableHead className="text-center font-bold">Clicks</TableHead>
                      <TableHead className="text-center font-bold">Seguidores</TableHead>
                      <TableHead className="text-center font-bold">Crecimiento</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="text-center">
                    <TableRow className="bg-white pb-5 border-none">
                      <TableCell>
                        <div className="flex flex-row text-center items-center justify-center">
                          <Image src="/img/rrss/instagram.png" alt="Instagram" width={20} height={20} className="mr-2"/>
                          Instagram
                        </div>
                      </TableCell>
                      <TableCell>42.1k</TableCell>
                      <TableCell>1.2M</TableCell>
                      <TableCell>12.4k</TableCell>
                      <TableCell>85.2k</TableCell>
                      <TableCell className="text-blue-600 font-bold">+4.2%</TableCell>
                    </TableRow>
                    <TableRow className="bg-white mb-5 border-none">
                      <TableCell>
                        <div className="flex flex-row text-center items-center justify-center">
                          <Image src="/img/rrss/facebook.png" alt="Instagram" width={20} height={20} className="mr-2"/>
                          Facebook
                        </div>
                      </TableCell>
                      <TableCell>42.1k</TableCell>
                      <TableCell>1.2M</TableCell>
                      <TableCell>12.4k</TableCell>
                      <TableCell>85.2k</TableCell>
                      <TableCell className="text-red-600 font-bold">-3.3%</TableCell>
                    </TableRow>
                    <TableRow className="bg-white border-none">
                      <TableCell>
                        <div className="flex flex-row text-center items-center justify-center">
                          <Image src="/img/rrss/x.png" alt="Instagram" width={20} height={20} className="mr-2"/>
                          X (Twitter)
                        </div>
                      </TableCell>
                      <TableCell>42.1k</TableCell>
                      <TableCell>1.2M</TableCell>
                      <TableCell>12.4k</TableCell>
                      <TableCell>85.2k</TableCell>
                      <TableCell className="text-blue-600 font-bold">+2.1%</TableCell>
                    </TableRow>
                    <TableRow className="bg-white border-none">
                      <TableCell>
                        <div className="flex flex-row text-center items-center justify-center">
                          <Image src="/img/rrss/tiktok.png" alt="Instagram" width={20} height={20} className="mr-2"/>
                          Tiktok
                        </div>
                      </TableCell>
                      <TableCell>42.1k</TableCell>
                      <TableCell>1.2M</TableCell>
                      <TableCell>12.4k</TableCell>
                      <TableCell>85.2k</TableCell>
                      <TableCell className="text-blue-600 font-bold">+4.9%</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>


              </Card>
            </div>

            <div id="bottom-analytics-container">
              <h5 className="mb-5">Top Performing Posts</h5>
              <div id="top-performing-post" className="grid grid-cols-12 gap-5">
                <Card
                  image="https://picsum.photos/400/400"
                  imageAlt="imagen"
                  className="col-span-4 p-0"
                >
                  <div className="flex flex-row gap-2">
                    <Badge>VIDEO</Badge>
                    <Badge>ORGANIC</Badge>
                  </div>
                  <div className="font-bold mb-2 py-5">
                    "{description.text1.substring(0, 100)} ..."
                  </div>
                  <div className="flex flex-row justify-around text-center gap-2">
                    <div>
                      <p className="mb-2">REACH</p>
                      <h4>42.1k</h4>
                    </div>
                    <div>
                      <p className="mb-2">SAVES</p>
                      <h4>1.204</h4>
                    </div>
                    <div>
                      <p className="mb-2">CTR</p>
                      <h4>4.8%</h4>
                    </div>
                  </div>
                </Card>
                <Card
                  image="https://picsum.photos/400/300"
                  imageAlt="imagen"
                  className="col-span-4"
                >
                  <div className="flex flex-row gap-2">
                    <Badge>VIDEO</Badge>
                    <Badge>ORGANIC</Badge>
                  </div>
                  <div className="font-bold mb-2 py-5">
                    "{description.text1.substring(0, 100)} ..."
                  </div>
                  <div className="flex flex-row justify-around text-center gap-2">
                    <div>
                      <p className="mb-2">REACH</p>
                      <h4>42.1k</h4>
                    </div>
                    <div>
                      <p className="mb-2">SAVES</p>
                      <h4>1.204</h4>
                    </div>
                    <div>
                      <p className="mb-2">CTR</p>
                      <h4>4.8%</h4>
                    </div>
                  </div>
                </Card>
                <Card
                  image="https://picsum.photos/400/500"
                  imageAlt="imagen"
                  className="col-span-4"
                >
                  <div className="flex flex-row gap-2">
                    <Badge>VIDEO</Badge>
                    <Badge>ORGANIC</Badge>
                  </div>
                  <div className="font-bold py-5">
                    "{description.text1.substring(0, 100)} ..."
                  </div>
                  <div className="flex flex-row justify-around text-center gap-2">
                    <div>
                      <p className="mb-2">REACH</p>
                      <h4>42.1k</h4>
                    </div>
                    <div>
                      <p className="mb-2">SAVES</p>
                      <h4>1.204</h4>
                    </div>
                    <div>
                      <p className="mb-2">CTR</p>
                      <h4>4.8%</h4>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            <div
              id="footer-analytics-container"
              className="grid grid-cols-12 gap-5"
            >
              <Card className="col-span-7">
                <h5 className="mb-5">Audience Growth</h5>
                <BarChart
                  style={{
                    width: "100%",
                    maxWidth: "700px",
                    aspectRatio: 1.618,
                  }}
                  responsive
                  data={data}
                  margin={{
                    top: 5,
                    right: 0,
                    left: 0,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis width="auto" dataKey="users" />
                  <Tooltip />
                  <Bar
                    dataKey="users"
                    fill="#9895d8"
                    activeBar={{ fill: "#8281d3" }}
                    radius={[10, 10, 0, 0]}
                  />
                </BarChart>
              </Card>
              <Card className="col-span-5">
                <h5 className="mb-5">Top Territories</h5>
                <div className="flex flex-row gap-2 items-center mb-2">
                  <div className="px-4 py-3 bg-neutral-200 rounded-lg w-fit text-sm font-bolder">
                    CL
                  </div>
                  <p className="">Chile</p>
                </div>
                <Progress className="h-5 mb-5">
                  <ProgressBar value={80} showLabel className="h-5" />
                </Progress>

                <div className="flex flex-row gap-2 items-center mb-2">
                  <div className="px-4 py-3 bg-neutral-200 rounded-lg w-fit text-sm font-bolder">
                    US
                  </div>
                  <p className="">Estados Unidos</p>
                </div>
                <Progress className="h-5 mb-5">
                  <ProgressBar value={65} showLabel className="h-5" />
                </Progress>

                <div className="flex flex-row gap-2 items-center mb-2">
                  <div className="px-4 py-3 bg-neutral-200 rounded-lg w-fit text-sm font-bolder">
                    AL
                  </div>
                  <p className="">Alemania</p>
                </div>
                <Progress className="h-5 mb-5">
                  <ProgressBar value={40} showLabel className="h-5" />
                </Progress>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
