import PostShow from "@/components/posts/postShow/postShow";
import { paths } from "@/utils/pathHelpers";
import { Box, Flex, Link, Text } from "@chakra-ui/react";

interface PostPageProps {
  params: Promise<{
    postId: string;
    slug: string;
  }>;
}

const PostPage = async ({ params }: PostPageProps) => {
  const { slug, postId } = await params;
  return (
    <Box>
      <Link p={5} href={paths.topicShowPath(slug)}>
        <Text fontWeight="bold" color="black">
          Back to {slug}
        </Text>
      </Link>
      <Flex direction="column">
        <PostShow postId={postId} />
      </Flex>
    </Box>
  );
};

export default PostPage;
