import { Container, Divider, HStack } from "styled-system/jsx";
import { Heading } from "./ui/heading";
import { Button } from "./ui/button";
import { TbUserCog } from "solid-icons/tb";
import { button } from "styled-system/recipes";

function UserPanel() {
  return (
    <HStack alignItems="center" gap="3">
      <a class={button()} href="/admin">
        <TbUserCog />
        Admin
      </a>
      <Button variant="ghost">
        Logout
      </Button>
    </HStack>
  );
}

export function Navbar() {
  return (
    <Divider>
      <Container>
        <HStack justify="space-between" py="4">
          <a href="/">
            <Heading textStyle="2xl">Tiny Forum</Heading>
          </a>
          <UserPanel />
        </HStack>
      </Container>
    </Divider>
  );
}
