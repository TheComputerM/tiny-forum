import { Component } from "solid-js";
import { HStack, Stack } from "styled-system/jsx";
import * as Card from "~/components/ui/card";
import { Heading } from "./ui/heading";
import { Badge } from "./ui/badge";
import { Text } from "./ui/text";
import { Button } from "./ui/button";
import { TbEye } from "solid-icons/tb";

export const PostCard: Component = () => {
  return (
    <Card.Root>
      <Card.Header>
        <Stack>
          <Heading textStyle="4xl" as="h3">
            Title
          </Heading>
          <HStack>
            <Badge>badge</Badge>
          </HStack>
        </Stack>
      </Card.Header>
      <Card.Body>
        <Text>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit in
          blanditiis iusto consequatur repudiandae, fuga molestiae ipsam qui
          animi eum similique mollitia repellat delectus maiores illum,
          voluptatibus laborum! Nostrum necessitatibus distinctio dolorem quas
          officia hic consequuntur dolorum quos quis dolores?
        </Text>
      </Card.Body>
      <Card.Footer justifyContent="space-between" alignItems="center">
        <Text textStyle="lg">
          by <b>Username</b>
        </Text>
        <Button>
          <TbEye />
          View Post
        </Button>
      </Card.Footer>
    </Card.Root>
  );
};
