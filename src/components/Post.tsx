import { Component } from "solid-js";
import { HStack, Stack } from "styled-system/jsx";
import * as Card from "~/components/ui/card";
import { Heading } from "./ui/heading";
import { Badge } from "./ui/badge";
import { Text } from "./ui/text";
import { TbEye } from "solid-icons/tb";
import { button } from "styled-system/recipes";

export const PostCard: Component<{
  id: number;
  title: string;
  content: string;
}> = (props) => {
  return (
    <Card.Root>
      <Card.Header>
        <Stack>
          <Heading textStyle="4xl" as="h3">
            {props.title}
          </Heading>
          <HStack>
            <Badge>badge</Badge>
          </HStack>
        </Stack>
      </Card.Header>
      <Card.Body>
        <Text>{props.content}</Text>
      </Card.Body>
      <Card.Footer justifyContent="space-between" alignItems="center">
        <Text textStyle="lg">
          by <b>Username</b>
        </Text>
        <a href={`/post/${props.id}`} class={button()}>
          <TbEye />
          View Post
        </a>
      </Card.Footer>
    </Card.Root>
  );
};