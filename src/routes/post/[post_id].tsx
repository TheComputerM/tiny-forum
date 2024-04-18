import { Container, Divider, HStack, Stack } from "styled-system/jsx";
import { Comment } from "~/components/Comment";
import { CommentInput } from "~/components/CommentInput";
import { Badge } from "~/components/ui/badge";
import { Heading } from "~/components/ui/heading";
import { Text } from "~/components/ui/text";

export default function PostPage() {
  return (
    <Container mt="8">
      <Stack gap="6">
        <Stack>
          <Heading as="h1" textStyle="5xl">
            Title
          </Heading>
          <HStack>
            <Badge>badge</Badge>
          </HStack>
        </Stack>
        <Text>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas
          enim iure eos deleniti culpa laudantium exercitationem at neque harum.
          Veniam eveniet odit itaque, nam sit, ullam vero hic beatae, a quasi
          facere doloribus esse perferendis obcaecati dolor voluptatem adipisci
          alias?
        </Text>
      </Stack>
      <Divider my="6" />
      <CommentInput />
      <br />
      <Stack>
        <Comment />
      </Stack>
    </Container>
  );
}
