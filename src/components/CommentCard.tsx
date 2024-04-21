import { Component, Show, createSignal } from "solid-js";
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

  return (
    <Card.Root px="4" py="2">
      <Stack gap="1.5">
        <Heading as="h6" textStyle="lg">
          Username
        </Heading>
        <HStack>
          <Badge>badge</Badge>
        </HStack>
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
