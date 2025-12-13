import CustomButton from "@/components/button/button";
import PostList from "@/components/posts/postList/postList";
import { fetchPostsByTopicSlug } from "@/queries/posts";
import { paths } from "@/utils/pathHelpers";
import { Flex, Link, Text } from "@chakra-ui/react";

interface TopicProps {
  params: Promise<{
    slug: string;
  }>;
}

const topic = async ({ params }: TopicProps) => {
  const { slug } = await params;

  return (
    <Flex p="5" justifyContent={"space-between"}>
      <Flex direction="column" gap="2" flexGrow={1}>
        <Text fontWeight={"semibold"} fontSize="xl" color={"black"}>
          {slug}
        </Text>
        <PostList fetchData={() => fetchPostsByTopicSlug(slug)} />
      </Flex>
      <Flex direction={"column"} gap="3">
        <CustomButton color="teal.600" size="xs">
          <Link href={paths.postCreatePath(slug)}>Create a Post</Link>
        </CustomButton>
      </Flex>
    </Flex>
  );
};

export default topic;
