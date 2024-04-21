import { createAsync, useParams } from "@solidjs/router";
import { For, Show, createResource } from "solid-js";
import { Container, Divider, HStack, Stack } from "styled-system/jsx";
import { CommentCard } from "~/components/CommentCard";
import { CommentInput } from "~/components/CommentInput";
import { Badge } from "~/components/ui/badge";
import { Heading } from "~/components/ui/heading";
import { Text } from "~/components/ui/text";
import { API_URL } from "~/lib/constants";
import { formatDate } from "~/lib/utils";

function arrayToTree(comments: any[]) {
  const map = new Map();
  const tree: any[] = [];

  for (const comment of comments) {
    map.set(comment.id, { ...comment, children: [] });
  }

  for (const comment of comments) {
    if (comment.parent_id !== null) {
      map.get(comment.parent_id).children.push(map.get(comment.id));
    } else {
      tree.push(map.get(comment.id));
    }
  }

  return tree;
}

function CommentTree(props: any) {
  return (
    <For each={props.comments}>
      {(comment) => (
        <>
          <CommentCard comment={comment} />
          <Show when={comment.children.length}>
            <Stack ml="8">
              <CommentTree comments={comment.children} />
            </Stack>
          </Show>
        </>
      )}
    </For>
  );
}

function CommentSection() {
  const { post_id } = useParams();

  const [comments] = createResource(async () => {
    const response = await fetch(`${API_URL}/post/${post_id}/comment`);
    const data = await response.json();
    return arrayToTree(data);
  });

  return (
    <Stack>
      <CommentInput />
      <Show when={comments()}>
        <CommentTree comments={comments()} />
      </Show>
    </Stack>
  );
}

export default function PostPage() {
  const { post_id } = useParams();
  const post = createAsync(async () => {
    const response = await fetch(`${API_URL}/post/${post_id}`);
    const data = await response.json();
    return data;
  });

  return (
    <Show when={post()}>
      <Container mt="8">
        <Stack gap="6">
          <Stack>
            <Heading as="h1" textStyle="5xl">
              {post().title}
            </Heading>
            <HStack>
              <For each={post().tags}>
                {(tag: string) => <Badge>{tag}</Badge>}
              </For>
            </HStack>
          </Stack>
          <Text>{post().content}</Text>
          <Text color="fg.subtle" textStyle="sm">
            Posted on {formatDate(post().created_at)} by {post().user}
          </Text>
        </Stack>
        <Divider my="6" />

        <CommentSection />
      </Container>
    </Show>
  );
}
