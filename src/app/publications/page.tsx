import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { firstImageMedia } from "@/lib/media";
import PublicationsView, { type PublicationPost } from "./view";

export default async function PublicationsPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    redirect("/login");
  }

  const posts = await prisma.posts.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  const publications: PublicationPost[] = posts.map((post) => ({
    id: post.id,
    content: post.content,
    image: firstImageMedia(post.media),
    platforms: post.platforms,
    status: post.status,
    createdAt: post.createdAt.toISOString(),
    scheduledFor: post.ScheduledFor?.toISOString() ?? null,
  }));

  return <PublicationsView posts={publications} />;
}
