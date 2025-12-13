import { Post } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";

export type PostListItem = Post & {
  topic: { slug: string };
  user: { name: string | null };
  _count: { comments: number };
};

export const fetchPostsByTopicSlug = async (
  slug: string
): Promise<PostListItem[]> => {
  return await prisma.post.findMany({
    where: { topic: { slug } },
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true } },
      _count: { select: { comments: true } },
    },
  });
};
