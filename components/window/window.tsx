"use client";

import { CloseButton, Dialog, Portal, Text } from "@chakra-ui/react";
import React, { Ref, useImperativeHandle, useState } from "react";

interface WindowAppProps {
  triggerComponent: React.ReactNode;
  title: string;
  content: React.ReactNode;
  ref: Ref<unknown>;
}
const WindowApp = ({
  title,
  triggerComponent,
  content,
  ref,
}: WindowAppProps) => {
  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };

  useImperativeHandle(ref, () => ({
    close: () => onClose(),
  }));

  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger asChild>{triggerComponent}</Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Text textStyle="md">{title}</Text>
              </Dialog.Header>
              <Dialog.Body> {content}</Dialog.Body>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  );
};

export default WindowApp;
