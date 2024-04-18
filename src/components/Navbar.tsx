import { Container, Divider, HStack } from "styled-system/jsx";
import { Heading } from "./ui/heading";
import { Link } from "./ui/link";
import { Button } from "./ui/button";
import { TbUserCog } from "solid-icons/tb";
import { button } from "styled-system/recipes";

export function Navbar() {
  return (
    <Divider>
      <Container>
        <HStack justify="space-between" py="4">
          <a href="/">
            <Heading textStyle="2xl">Tiny Forum</Heading>
          </a>
          <HStack alignItems="center" gap="6">
            <a class={button()} href="/admin">
              <TbUserCog />
              Admin
            </a>
            <Link href="/about">About</Link>
          </HStack>
        </HStack>
      </Container>
    </Divider>
  );
}
