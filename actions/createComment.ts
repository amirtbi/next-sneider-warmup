"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { paths } from "@/utils/pathHelpers";
import { revalidatePath } from "next/cache";
import z from "zod";

const formSchema = z.object({
  content: z.string().min(3),
});

interface ICreateCommentFormState {
  success?: boolean;
  errors?: {
    content?: string[];
    _form?: string[];
  };
}

export const createComment = async (
  { postId, parentId }: { postId: string; parentId: string },
  formState: ICreateCommentFormState,
  formData: FormData
): Promise<ICreateCommentFormState> => {
  const parsedForm = formSchema.safeParse({
    content: formData.get("content"),
  });

  if (!parsedForm.success) {
    return { errors: parsedForm.error.flatten().fieldErrors };
  }

  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return {
      errors: {
        _form: ["You must be signed in to do this"],
      },
    };
  }

  try {
    await prisma.comment.create({
      data: {
        postId,
        parentId,
        userId: session.user.id,
        content: parsedForm.data.content,
      },
    });
    return { success: true };
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
          _form: ["Something went wrong"],
        },
      };
    }
  }

  //   revalidatePath(paths.postShowPath())
  revalidatePath(paths.homePage());
};
