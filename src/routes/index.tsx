import { cache, createAsync } from "@solidjs/router";
import { TbCheck, TbChevronDown, TbSquarePlus } from "solid-icons/tb";
import { For, Index, Show } from "solid-js";
import { Container, Divider, HStack, Stack } from "styled-system/jsx";
import { button } from "styled-system/recipes";
import { PostCard } from "~/components/Post";
import { API_URL } from "~/lib/constants";
import * as Select from "~/components/ui/select";

const getPosts = cache(async () => {
  const response = await fetch(`${API_URL}/post`);
  const data = await response.json();
  return data;
}, "posts");

export const route = {
  load: () => getPosts(),
};

function SortFilter(props: { onValueChange?: (event: any) => void }) {
  const items = [
    {
      label: "Recent",
      value: "recent",
    },
  ];

  return (
    <Select.Root
      positioning={{ sameWidth: true }}
      items={items}
      multiple={false}
      onValueChange={props.onValueChange}
      width="xs"
    >
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Sort" />
          <TbChevronDown />
        </Select.Trigger>
      </Select.Control>
      <Select.Positioner>
        <Select.Content>
          <Index each={items}>
            {(item) => (
              <Select.Item item={item()}>
                <Select.ItemText>{item().label}</Select.ItemText>
                <Select.ItemIndicator>
                  <TbCheck />
                </Select.ItemIndicator>
              </Select.Item>
            )}
          </Index>
        </Select.Content>
      </Select.Positioner>
    </Select.Root>
  );
}

export default function HomePage() {
  const posts = createAsync(() => getPosts());

  return (
    <Show when={posts()}>
      <Container mt="6">
        <HStack justify="space-between">
          <SortFilter />
          <a class={button()} href="/post">
            Create Post
            <TbSquarePlus />
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
