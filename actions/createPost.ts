"use server";

import { auth } from "@/lib/auth";
import { Post } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";
import { paths } from "@/utils/pathHelpers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const formSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
  userId: z.string(),
  topicId: z.string(),
});

interface ICreatePostFormState {
  success?: boolean;
  errors?: {
    title?: string[];
    content?: string[];
    _form?: string[];
  };
}

export const createPost = async (
  slug: string,
  formState: ICreatePostFormState,
  formData: FormData
): Promise<ICreatePostFormState> => {
  const parsedForm = formSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("description"),
    userId: formData.get("userId"),
    topicId: formData.get("topicId"),
  });

  if (!parsedForm.success) {
    return { errors: parsedForm.error.flatten().fieldErrors };
  }

  const session = await auth();

  if (!session || !session.user) {
    return {
      errors: {
        _form: ["You must be signed in to do this"],
      },
    };
  }

  const topic = await prisma.topic.findUnique({ where: { slug } });

  if (!topic) {
    return {
      errors: {
        _form: ["There is not valid topic"],
      },
    };
  }

  let post: Post;
  try {
    post = await prisma.post.create({
      data: {
        title: parsedForm.data.title,
        content: parsedForm.data.content,
        topicId: parsedForm.data.topicId,
        userId: parsedForm.data.userId,
      },
    });
  } catch (e: unknown) {
    if (e instanceof Error) {
      return {
        errors: {
          _form: [e.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["something went wrong"],
        },
      };
    }
  }

  revalidatePath(paths.topicShowPath(slug));
  redirect(paths.postShowPath(slug, post.id));
};
