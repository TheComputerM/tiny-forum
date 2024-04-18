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

const CommentVoting = () => {
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

export const Comment: Component = () => {
  const [open, setOpen] = createSignal(false);

  return (
    <Card.Root px="4" py="4">
      <Stack gap="1.5">
        <Heading as="h6" textStyle="lg">
          Username
        </Heading>
        <HStack>
          <Badge>badge</Badge>
        </HStack>
        <Text>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident
          corrupti cum facilis deleniti libero sint reiciendis accusamus id
          culpa ad.
        </Text>

        <HStack justify="space-between" alignItems="center">
          <CommentVoting />
          <Button size="sm" onClick={() => setOpen((x) => !x)}>
            <TbArrowBackUp />
            Reply
          </Button>
        </HStack>
      </Stack>
      <Collapsible.Root open={open()}>
        <Collapsible.Content mt="3">
          <CommentInput />
        </Collapsible.Content>
      </Collapsible.Root>
    </Card.Root>
  );
};
