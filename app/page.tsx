import CreateTopic from "@/components/topic/createTopic/createTopic";
import TopicList from "@/components/topicList/topicList";
import prisma from "@/lib/prisma";
import { Flex, Grid, GridItem, Stack, Text } from "@chakra-ui/react";

export default async function Home() {
  const topcis = await prisma.topic.findMany();

  return (
    <Grid templateColumns="repeat(12, 1fr)" gap="3" p="4">
      <GridItem colSpan={10}>
        <Flex alignItems={"center"} gap="5">
          <Text fontWeight="semibold" textStyle="xl" color="black">
            Topics
          </Text>
        </Flex>
      </GridItem>
      <GridItem colSpan={2}>
        <Flex direction={"column"} alignItems={"flex-end"} gap="2">
          <CreateTopic />
          <Stack direction="row" justifyContent={"flex-end"}>
            <TopicList topics={topcis} />
          </Stack>
        </Flex>
      </GridItem>
    </Grid>
  );
}
