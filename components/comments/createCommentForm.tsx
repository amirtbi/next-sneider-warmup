"use client";

import { Field, Flex, Text, Textarea } from "@chakra-ui/react";
import * as actions from "@/actions";
import { useActionState, RefObject, useEffect, useRef, useState } from "react";
import { IWindowRef } from "@/hooks/useWindowRef";
import FormButton from "@/components/formButton/formButton";
import CustomButton from "../button/button";

const CreateCommenttForm = ({
  windowRef,
  postId,
  parentId,
  startOpen,
}: {
  windowRef: RefObject<IWindowRef | undefined>;
  postId: string;
  parentId: string;
  startOpen?: boolean;
}) => {
  const [open, setOpen] = useState(startOpen);
  const ref = useRef<HTMLFormElement | null>(null);
  const [state, formAction] = useActionState(
    actions.createComment.bind(null, { postId, parentId }),
    {
      success: true,
      errors: {},
    }
  );

  useEffect(() => {
    if (state?.success) {
      ref.current?.reset();
      windowRef.current?.close();

      if (!startOpen) {
        setOpen(false);
      }
    }
  }, [startOpen, state, windowRef]);

  const form = (
    <form action={formAction} ref={ref}>
      <Flex direction="column" gap="5">
        {state?.errors?._form?.length && (
          <Text textStyle="md" color="red">
            {state?.errors?._form?.join(",")}
          </Text>
        )}
        <Field.Root invalid={!!state?.errors?.content}>
          <Field.Label>content</Field.Label>
          <Textarea name="content" size="md" placeholder="Enter your comment" />
          {state?.errors?.content && (
            <Text textStyle="xs" color="red">
              {state?.errors?.content?.join(", ")}
            </Text>
          )}
        </Field.Root>

        <FormButton>Create comment</FormButton>
      </Flex>
    </form>
  );

  return (
    <>
      <CustomButton size="sm" variant="solid">
        Reply
      </CustomButton>
      {open && form}
    </>
  );
};

export default CreateCommenttForm;
