"use server";

import { auth } from "@/lib/auth";
import { Topic } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";
import { paths } from "@/utils/pathHelpers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const formSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
});

interface ICreateTopicFormState {
  success?: boolean;
  errors?: {
    name?: string[];
    description?: string[];
    _form?: string[];
  };
}

export const createTopic = async (
  formState: ICreateTopicFormState,
  formData: FormData
): Promise<ICreateTopicFormState> => {
  const parsedForm = formSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
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

  let topic: Topic;
  try {
    topic = await prisma.topic.create({
      data: {
        slug: parsedForm.data.name,
        description: parsedForm.data.description,
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

  revalidatePath("/");
  redirect(paths.topicShowPath(topic.slug));
};
