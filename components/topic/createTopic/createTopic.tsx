"use client";

import { useWindowRef } from "@/hooks/useWindowRef";
import NewTopicWindowForm from "../newTopicWindowForm/newTopicWindowForm";
import WindowApp from "@/components/window/window";
import CustomButton from "@/components/button/button";

const CreateTopic = () => {
  const windowRef = useWindowRef();

  return (
    <WindowApp
      ref={windowRef}
      title="Create Topic"
      content={<NewTopicWindowForm windowRef={windowRef} />}
      triggerComponent={
        <CustomButton size="xs" variant="solid" bgColor={"teal.800"}>
          Create Topic
        </CustomButton>
      }
    />
  );
};

export default CreateTopic;
