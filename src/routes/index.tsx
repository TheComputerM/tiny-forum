import { cache, createAsync } from "@solidjs/router";
import { For, Show } from "solid-js";
import { Container, Divider, HStack, Stack } from "styled-system/jsx";
import { button } from "styled-system/recipes";
import { PostCard } from "~/components/Post";
import { API_URL } from "~/lib/constants";

const getPosts = cache(async () => {
  const response = await fetch(`${API_URL}/post`);
  const data = await response.json();
  return data;
}, "posts");

export const route = {
  load: () => getPosts(),
};

export default function HomePage() {
  const posts = createAsync(() => getPosts());

  return (
    <Show when={posts()}>
      <Container mt="6">
        <HStack>
          <a class={button()} href="/post">
            Create Post
          </a>
        </HStack>
        <Divider my="6" />
        <Stack>
          <For each={posts()}>{(post: any) => <PostCard {...post} />}</For>
        </Stack>
      </Container>
    </Show>
  );
}
