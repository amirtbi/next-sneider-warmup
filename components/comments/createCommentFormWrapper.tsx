"use client";

import { useWindowRef } from "@/hooks/useWindowRef";
import CustomButton from "../button/button";
import CreateCommentForm from "./createCommentForm";

const CreateCommentFormWrapper = ({
  postId,
  parentId,
  startOpen,
  text = "reply",
}: {
  postId: string;
  parentId?: string;
  startOpen?: boolean;
  text?: string;
}) => {
  const windowRef = useWindowRef();

  return (
    <CreateCommentForm
      windowRef={windowRef}
      postId={postId}
      parentId={parentId}
      startOpen={startOpen}
      triggerButtonComponent={
        <CustomButton size="xs" variant="solid" bgColor="teal.800">
          {text}
        </CustomButton>
      }
    />
  );
};

export default CreateCommentFormWrapper;
