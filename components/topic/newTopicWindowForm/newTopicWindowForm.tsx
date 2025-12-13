"use client";

import { Field, Flex, Input, Text, Textarea } from "@chakra-ui/react";
import * as actions from "@/actions";
import { useActionState, RefObject, useEffect } from "react";
import { IWindowRef } from "@/hooks/useWindowRef";
import FormButton from "@/components/formButton/formButton";

const NewTopicWindowForm = ({
  windowRef,
}: {
  windowRef: RefObject<IWindowRef | undefined>;
}) => {
  const [state, formAction, isPending] = useActionState(actions.createTopic, {
    success: true,
    errors: {},
  });

  useEffect(() => {
    if (state?.success) {
      windowRef.current?.close();
    }
  }, [state, windowRef]);

  return (
    <form action={formAction}>
      <Flex direction="column" gap="5">
        {state?.errors?._form?.length && (
          <Text textStyle="md" color="red">
            {state?.errors?._form?.join(",")}
          </Text>
        )}
        <Field.Root invalid={!!state?.errors?.name}>
          <Field.Label>Name</Field.Label>
          <Input name="name" p="3" placeContent="title" flex="1" />
          {state?.errors?.name && (
            <Text textStyle="xs" color="red">
              {state?.errors?.name?.join(", ")}
            </Text>
          )}
        </Field.Root>
        <Field.Root invalid={!!state?.errors?.description}>
          <Field.Label>Description</Field.Label>
          <Textarea name="description" size="md" placeholder="description..." />
          {state?.errors?.description && (
            <Text textStyle="xs" color="red">
              {state?.errors?.description?.join(", ")}
            </Text>
          )}
        </Field.Root>

        <FormButton>Submit</FormButton>
      </Flex>
    </form>
  );
};

export default NewTopicWindowForm;
