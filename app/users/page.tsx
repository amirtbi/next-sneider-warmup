import UsersList from "@/components/users/users";
import prisma from "@/lib/prisma";
import { Button, Text } from "@chakra-ui/react";
import Link from "next/link";

const Users = async () => {
  const users: { id: number; name: string; email: string }[] = [];

  const getUsers = async () => {
    const userLists = await prisma.user.findMany();

    for (const user of userLists) {
      users.push(user);
    }

    console.log("users", users);
  };

  await getUsers();

  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-5 justify-between items-center border-b-2 border-b-slate-100">
        <Text textStyle="4xl">Users</Text>
        <Button variant={"surface"}>
          <Link href="/users/new">Create new User</Link>
        </Button>
      </div>
      {users.length ? <UsersList users={users} /> : <span>Empty users</span>}
    </div>
  );
};

export default Users;
