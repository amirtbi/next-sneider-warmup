"use client";

import { Field, Flex, Input, Text, Textarea } from "@chakra-ui/react";
import * as actions from "@/actions";
import { useActionState, RefObject, useEffect } from "react";
import { IWindowRef } from "@/hooks/useWindowRef";
import { Topic } from "@/generated/prisma/client";
import FormButton from "@/components/formButton/formButton";

const CreatePostForm = ({
  windowRef,
  topic,
  userId,
}: {
  windowRef: RefObject<IWindowRef | undefined>;
  topic?: Topic | null;
  userId?: string;
}) => {
  const [state, formAction] = useActionState(
    actions.createPost.bind(null, topic?.slug as string),
    {
      success: true,
      errors: {},
    }
  );

  useEffect(() => {
    if (state?.success) {
      windowRef.current?.close();
    }
  }, [state, windowRef]);

  return (
    <form action={formAction}>
      <Flex direction="column" gap="5">
        <Input type="hidden" name="userId" value={userId} />
        <Input type="hidden" name="topicId" value={topic?.id} />
        {state?.errors?._form?.length && (
          <Text textStyle="md" color="red">
            {state?.errors?._form?.join(",")}
          </Text>
        )}
        <Field.Root invalid={!!state?.errors?.title}>
          <Field.Label>Title</Field.Label>
          <Input name="title" p="3" placeContent="title" flex="1" />
          {state?.errors?.title && (
            <Text textStyle="xs" color="red">
              {state?.errors?.title?.join(", ")}
            </Text>
          )}
        </Field.Root>
        <Field.Root invalid={!!state?.errors?.content}>
          <Field.Label>Content</Field.Label>
          <Textarea name="description" size="md" placeholder="description..." />
          {state?.errors?.content && (
            <Text textStyle="xs" color="red">
              {state?.errors?.content?.join(", ")}
            </Text>
          )}
        </Field.Root>

        <FormButton>Submit</FormButton>
      </Flex>
    </form>
  );
};

export default CreatePostForm;
