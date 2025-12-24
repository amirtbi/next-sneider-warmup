import { Comment } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";
import { cache } from "react";

export type fetchCommentWithUser = Comment & {
  user: { name: string | null; image: string | null };
};

export const fetchCommentsByPostId = cache(
  (postId: string): Promise<fetchCommentWithUser[]> => {
    console.log("query");
    return prisma.comment.findMany({
      where: { postId },
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });
  }
);
