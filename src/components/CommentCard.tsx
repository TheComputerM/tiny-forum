import { Component, For, Show, createResource, createSignal } from "solid-js";
import { HStack, Stack } from "styled-system/jsx";
import { Text } from "./ui/text";
import { Badge } from "./ui/badge";
import { Heading } from "~/components/ui/heading";
import * as Card from "~/components/ui/card";
import * as Collapsible from "~/components/ui/collapsible";
import { Button } from "./ui/button";
import {
  TbArrowBackUp,
  TbArrowBigDown,
  TbArrowBigUp,
  TbArrowBigUpFilled,
  TbArrowBigDownFilled,
} from "solid-icons/tb";
import { CommentInput } from "./CommentInput";
import { IconButton } from "./ui/icon-button";
import { API_URL } from "~/lib/constants";

const CommentVotes = () => {
  const [vote, setVote] = createSignal(0);
  const totalVotes = 0;
  return (
    <HStack gap="2" alignItems="center">
      <IconButton size="sm" variant="ghost" onClick={() => setVote(1)}>
        <Show when={vote() === 1} fallback={<TbArrowBigUp />}>
          <TbArrowBigUpFilled />
        </Show>
      </IconButton>
      <IconButton size="sm" variant="ghost" onClick={() => setVote(-1)}>
        <Show when={vote() === -1} fallback={<TbArrowBigDown />}>
          <TbArrowBigDownFilled />
        </Show>
      </IconButton>
      <Text ml="2">{totalVotes + vote()}</Text>
    </HStack>
  );
};

export const CommentCard: Component<any> = (props) => {
  const [open, setOpen] = createSignal(false);
  const [user] = createResource(async () => {
    const response = await fetch(`${API_URL}/user/${props.comment.user}`);
    return await response.json();
  });
  return (
    <Card.Root px="4" py="2">
      <Stack gap="1.5">
        <Show when={user()}>
          <Heading as="h6" textStyle="lg">
            {user().name}
          </Heading>
          <HStack>
            <For each={user().tags}>
              {(tag: string) => <Badge>{tag}</Badge>}
            </For>
          </HStack>
        </Show>
        <Text>{props.comment.content}</Text>

        <HStack justify="space-between" alignItems="center">
          <CommentVotes />
          <Button
            size="xs"
            variant="outline"
            onClick={() => setOpen((x) => !x)}
          >
            <TbArrowBackUp />
            Reply
          </Button>
        </HStack>
      </Stack>
      <Collapsible.Root open={open()}>
        <Collapsible.Content py="1" mt="2" px="1">
          <CommentInput parent={props.comment.id} />
        </Collapsible.Content>
      </Collapsible.Root>
    </Card.Root>
  );
};
