"use client";

import { Button, Card } from "@chakra-ui/react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";

const Profile = ({ session }: { session: Session | undefined }) => {
  const user = session?.user;
  return (
    <Card.Root>
      <Card.Body gap="2">
        <Card.Title mt="2">{user?.name}</Card.Title>
        <Card.Description>{user?.email}</Card.Description>
      </Card.Body>
      <Card.Footer justifyContent="flex-end">
        {user && (
          <Button
            onClick={async () => {
              await signOut();
            }}
            variant="outline"
          >
            Sign Out
          </Button>
        )}
      </Card.Footer>
    </Card.Root>
  );
};

export default Profile;
