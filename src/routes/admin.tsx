import { TbPlus } from "solid-icons/tb";
import { Container, Divider, HStack } from "styled-system/jsx";
import { Button } from "~/components/ui/button";
import { Heading } from "~/components/ui/heading";

export default function AdminPage() {
  return (
    <Container mt="6">
      <HStack alignItems="center" justify="space-between">
        <Heading as="h1" textStyle="4xl">
          Tags
        </Heading>
        <Button>
          <TbPlus />
          Add Tag
        </Button>
      </HStack>
      <Divider my="6" />
      <Heading as="h1" textStyle="4xl">
        Users
      </Heading>
    </Container>
  );
}
