"use client";

import removeUserAction from "@/actions/removeUserAction";
import { Box, Button, Flex } from "@chakra-ui/react";
import Link from "next/link";
import { startTransition } from "react";

interface UsersProps {
  users: { name: string; email: string; id: number }[];
}

const UsersList = ({ users }: UsersProps) => {
  const handleRemoveUser = (userId: number) => {
    startTransition(async () => {
      removeUserAction(userId);
    });
  };

  return (
    <Box p="3">
      <Flex direction="column" gap="3">
        {users.map((user) => (
          <div key={user.id} className="flex justify-between">
            <div className="flex gap-2">
              <div>{user.name}</div>-<div>{user.email}</div>
            </div>
            <Flex gap="3">
              <Button size="sm" variant="subtle">
                <Link href={`/users/edit/${user.id}`}>Edit</Link>&nbsp;
              </Button>
              <Button
                size="sm"
                variant="subtle"
                color="black"
                bg="orange"
                onClick={() => handleRemoveUser(user?.id)}
              >
                remove
              </Button>
            </Flex>
          </div>
        ))}
      </Flex>
    </Box>
  );
};

export default UsersList;
