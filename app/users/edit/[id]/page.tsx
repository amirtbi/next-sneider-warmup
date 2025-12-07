import EditUserForm from "@/components/editUserForm/editUserForm";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

interface EditUserProps {
  params: {
    id: string;
  };
}

const EditUser = async ({ params }: EditUserProps) => {
  const { id } = await params;

  const user = await prisma.user.findUnique({ where: { id: +id } });

  if (!user) {
    return notFound();
  }

  return <EditUserForm id={user.id} name={user.name} email={user.email} />;
};

export default EditUser;

export const generateStaticParams = async () => {
  const users = await prisma.user.findMany();

  return users.map((user) => ({ id: user.id.toString() }));
};
