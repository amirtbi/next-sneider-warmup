import { fetchCommentsByPostId } from "@/queries/comment";
import CommentShow from "./commentShow";
import { Heading } from "@chakra-ui/react";

interface CommnetListProps {
  postId: string;
}
const CommentList = async ({ postId }: CommnetListProps) => {
  const comments = await fetchCommentsByPostId(postId);

  const topLevelComments = await comments.filter(
    (comment) => comment.parentId === null
  );

  const renderedComments = topLevelComments.map((comment) => {
    return (
      <CommentShow key={comment.id} commentId={comment.id} postId={postId} />
    );
  });

  return (
    <div className="space-y-3">
      <Heading size="md" marginTop="10" color="black" fontWeight={"bold"}>
        All {comments.length} comments
      </Heading>
      {renderedComments}
    </div>
  );
};

export default CommentList;
