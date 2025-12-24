import CreateCommentFormWrapper from "./createCommentFormWrapper";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { fetchCommentsByPostId } from "@/queries/comment";

const CommentShow = async ({
  commentId,
  postId,
}: {
  commentId: string;
  postId: string;
}) => {
  const comments = await fetchCommentsByPostId(postId);

  const comment = comments.find((c) => c.id === commentId);

  if (!comment) return null;

  const children = comments.filter((c) => c.parentId === commentId);
  const renderedChildren = children.map((child) => {
    return <CommentShow key={child.id} commentId={child.id} postId={postId} />;
  });

  return (
    <>
      <Box m="4" borderWidth="1px" color="fg.disabled">
        <Flex direction="column" gap="1" p="2">
          <Flex gap="3" alignItems={"center"}>
            <Image
              boxSize="50px"
              borderRadius="full"
              fit="cover"
              alt={comment.user.name || "user"}
              src={comment.user.image || ""}
            />
            <Text fontSize="sm" color="gray.500">
              {comment.user.name}
            </Text>
          </Flex>
          <Flex flexDirection={"column"}>
            <Text paddingTop={"5"} paddingLeft="10" color="gray.500">
              {comment.content}
            </Text>
            <CreateCommentFormWrapper
              postId={comment.postId}
              parentId={comment.id}
            />
          </Flex>
          <Box p="5">{renderedChildren}</Box>
        </Flex>
      </Box>
    </>
  );
};

export default CommentShow;
