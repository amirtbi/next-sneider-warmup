import CommentList from "@/components/comments/commentList";
import CommentShow from "@/components/comments/commentShow";
import prisma from "@/lib/prisma";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { notFound } from "next/navigation";

const PostShow = async ({ postId }: { postId: string }) => {
  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: { comments: true },
  });
  console.log("post", post);

  if (!post) {
    notFound();
  }

  return (
    <Box>
      <Flex direction={"column"} gap="3">
        <Heading fontWeight={"bold"} color="black">
          {post.title}
        </Heading>
        <Text
          fontWeight={"semibold"}
          borderWidth="1px"
          rounded="md"
          color="gray.800"
          p="4"
        >
          {post.content}
        </Text>
        <Box width="600px">{/* <CommentShow commentId={"1"} /> */}</Box>
      </Flex>
    </Box>
  );
};

export default PostShow;
