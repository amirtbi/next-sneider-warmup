import CreatePost from "@/components/posts/createPost/createPost";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

interface NewPostPageProps {
  params: {
    slug: string;
  };
}

export const NewPostPage = async ({ params }: NewPostPageProps) => {
  const { slug } = await params;
  const session = await auth();
  const slugInfo = await prisma.topic.findUnique({ where: { slug } });
  return <CreatePost userId={session?.user?.id} topic={slugInfo} />;
};

export default NewPostPage;
