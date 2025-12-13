"use client";
import { paths } from "@/utils/pathHelpers";
import { Badge, Box, Flex, Link, Text } from "@chakra-ui/react";

interface TopicListProps {
  topics: {
    id: string;
    slug: string;
    description: string;
  }[];
}
const TopicList = ({ topics }: TopicListProps) => {
  if (!topics?.length) {
    return <h1>not found any topics</h1>;
  }

  return (
    <Box borderWidth={"1px"} p="4" borderRadius={"5"}>
      <Flex direction="column" gap="2">
        <Text fontWeight={"bold"} fontSize={"md"} color="teal.800">
          Topics
        </Text>
        <Flex gap="2" flexWrap={"wrap"}>
          {topics.map((topic) => (
            <Badge color={"teal.300"} key={topic.id}>
              <Link href={paths.topicShowPath(topic.slug)}>{topic.slug}</Link>
            </Badge>
          ))}
        </Flex>
      </Flex>
    </Box>
  );
};

export default TopicList;
