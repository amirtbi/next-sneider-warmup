import { PostListItem } from "@/queries/posts";
import { paths } from "@/utils/pathHelpers";
import { Box, Flex, Stack, Card, Heading, Text, Link } from "@chakra-ui/react";

interface PostListProps {
  fetchData: () => Promise<PostListItem[]>;
}

const PostList = async ({ fetchData }: PostListProps) => {
  const postList = await fetchData();

  return (
    <Box width={"100%"}>
      <Flex flexGrow={"1"} direction="column">
        <Stack>
          {postList.map((topicPost) => (
            <Link
              href={paths.postShowPath(topicPost.topic.slug, topicPost.id)}
              key={topicPost.id}
            >
              <Card.Root size="sm" key={topicPost.id}>
                <Card.Header>
                  <Heading size="md"> {topicPost.title}</Heading>
                </Card.Header>
                <Card.Body color="fg.muted">{topicPost.content}</Card.Body>
                <Card.Footer>
                  <Flex gap="2" justify={"space-between"}>
                    <Text fontSize={"xs"} color="gray.300">
                      By:{topicPost.user.name}
                    </Text>
                    <Text fontSize={"xs"}>
                      Comments: {topicPost._count.comments}
                    </Text>
                  </Flex>
                </Card.Footer>
              </Card.Root>
            </Link>
          ))}
        </Stack>
      </Flex>
    </Box>
  );
};

export default PostList;
