'use client'

import { useState } from "react";
import SideNav from "@/components/Sidenav";
import Image from "next/image"
import Card from "@/components/Card";
import Input from "@/components/Input";
import Switch from "@/components/Switch";
import Button from "@/components/Button";

import {
    CloudUpload,
    Sparkles
} from "lucide-react";

export default function Analytics() {


      return(
        <>
            <main className="mx-auto bg-indigo-10 flex bg-slate-50">
                <SideNav />

                <section id="analytics" className="container py-20 px-20 mt-0 mt-10">
                    <div className="w-fill md:w-[50%]">
                        <h3 className="text-4xl font-bolder mb-3">Rendimiento Inteligente</h3>
                        <div className="text-secondary text-sm mb-5">Introducete dentro de su ecosistema social. La informacion es procesada en tiempo real para su claridad.</div>
                    </div>
                    <div id="analytics-container" className="flex flex-col gap-5">

                        <div id="top-analytics-container" className="grid grid-cols-12 gap-5">
                            <Card className="col-span-4">
                                Total Engagement
                            </Card>
                            <Card className="col-span-8">
                                Estrategia AI
                            </Card>
                        </div>

                        <div id="middle-amalytics-container">
                            <Card className="analytics-best-time">
                                Best time
                            </Card>
                        </div>

                        <div id="bottom-analytics-container">
                            <h5 className="mb-5">Top Performing Posts</h5>
                            <div id="top-performing-post" className="grid grid-cols-12 gap-5">
                                <Card className="col-span-4">Post 1</Card>
                                <Card className="col-span-4">Post 2</Card>
                                <Card className="col-span-4">Post 3</Card>
                            </div>
                        </div>

                        <div id="footer-analytics-container" className="grid grid-cols-12 gap-5">
                            <Card className="col-span-7">
                                <h5>Audience Growth</h5>
                            </Card>
                            <Card className="col-span-5">
                                <h5>Top Territories</h5>
                            </Card>
                        </div>

            
                    </div>
                    
                </section>
            </main>
        </>
      )
}