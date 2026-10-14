import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import CalendarView from "./calendarView";

export default async function CalendarPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    redirect("/login");
  }

  const posts = await prisma.posts.findMany({
    where: {
      userId: session.user.id,
      ScheduledFor: { not: null },
    },
    orderBy: { ScheduledFor: "asc" },
  });

  const events = posts.map((post) => ({
    id: post.id,
    title: post.content.length > 40 ? post.content.slice(0, 40) + "…" : post.content,
    start: post.ScheduledFor!.toISOString(),
    extendedProps: {
      description: post.content,
      platforms: post.platforms,
      media: post.media,
      status: post.status,
    },
  }));

  return <CalendarView events={events} />;
}