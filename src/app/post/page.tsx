import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { parsePostMedia } from "@/lib/media";
import PostForm from "./postForm";

export default async function PostPage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string; add?: string }>;
}) {
  const { edit, add } = await searchParams;

  if (!edit) return <PostForm />;

  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    redirect("/login");
  }

  const post = await prisma.posts.findFirst({
    where: { id: edit, userId: session.user.id },
  });

  if (!post) {
    redirect("/publications");
  }

  const platforms: string[] = [...post.platforms];
  if (add && !platforms.includes(add)) platforms.push(add);

  return (
    <PostForm
      editId={post.id}
      initialContent={post.content}
      initialPlatforms={platforms}
      initialMedia={parsePostMedia(post.media)}
    />
  );
}
