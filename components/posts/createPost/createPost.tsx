"use client";

import { useWindowRef } from "@/hooks/useWindowRef";
import CreatePostForm from "../createPostForm/createPostForm";
import { Topic } from "@/generated/prisma/client";
import WindowApp from "@/components/window/window";
import CustomButton from "@/components/button/button";

const CreatePost = ({
  userId,
  topic,
}: {
  userId?: string;
  topic?: Topic | null;
}) => {
  const windowRef = useWindowRef();

  return (
    <WindowApp
      ref={windowRef}
      title="Create Post"
      content={
        <CreatePostForm userId={userId} topic={topic} windowRef={windowRef} />
      }
      triggerComponent={
        <CustomButton size="xs" variant="solid" bgColor={"teal.800"}>
          Create Post
        </CustomButton>
      }
    />
  );
};

export default CreatePost;
