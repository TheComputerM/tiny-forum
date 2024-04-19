import { Link } from "@solidjs/meta";
import { createAsync } from "@solidjs/router";
import { Show } from "solid-js";
import { Container, Divider, HStack, Stack } from "styled-system/jsx";
import { Comment } from "~/components/Comment";
import { CommentInput } from "~/components/CommentInput";
import { Badge } from "~/components/ui/badge";
import { Heading } from "~/components/ui/heading";
import { Text } from "~/components/ui/text";
import { API_URL } from "~/lib/constants";

const getPost = async () => {
  const response = await fetch(`${API_URL}/post/1`);
  const data = await response.json();
  return data;
};

export const route = {
  load: () => getPost(),
};

export default function PostPage() {
  const post = createAsync(() => getPost());

  return (
    <Show when={post()}>
      <Container mt="8">
        <Stack gap="6">
          <Stack>
            <Heading as="h1" textStyle="5xl">
              {post().title}
            </Heading>
            <HStack>
              <Badge>badge</Badge>
            </HStack>
          </Stack>
          <Text>{post().content}</Text>
          <Text color="fg.subtle">Posted on {post().created_at}</Text>
        </Stack>
        <Divider my="6" />
        <CommentInput />
        <br />
        <Stack>
          <Comment />
        </Stack>
      </Container>
    </Show>
  );
}
