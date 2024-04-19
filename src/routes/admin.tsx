import { TbPlus, TbTrash } from "solid-icons/tb";
import { For, Show, createResource } from "solid-js";
import { Container, Divider, HStack, Stack } from "styled-system/jsx";
import { Button } from "~/components/ui/button";
import { Heading } from "~/components/ui/heading";
import { IconButton } from "~/components/ui/icon-button";
import * as Table from "~/components/ui/table";
import { API_URL } from "~/lib/constants";

function TagsTable() {
  const [tags] = createResource(async () => {
    const response = await fetch(`${API_URL}/tag`);
    const data = await response.json();
    return data;
  });

  return (
    <Show when={tags()}>
      <Table.Root>
        <Table.Head>
          <Table.Row>
            <Table.Header>Name</Table.Header>
            <Table.Header>Description</Table.Header>
            <Table.Header textAlign="right">Actions</Table.Header>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <For each={tags()}>
            {(tag) => (
              <Table.Row>
                <Table.Cell>{tag.name}</Table.Cell>
                <Table.Cell>{tag.description}</Table.Cell>
                <Table.Cell textAlign="right">
                  <IconButton size="xs">
                    <TbTrash />
                  </IconButton>
                </Table.Cell>
              </Table.Row>
            )}
          </For>
        </Table.Body>
      </Table.Root>
    </Show>
  );
}

export default function AdminPage() {
  return (
    <Container mt="6">
      <Stack>
        <HStack alignItems="center" justify="space-between">
          <Heading as="h1" textStyle="4xl">
            Tags
          </Heading>
          <Button>
            <TbPlus />
            Add Tag
          </Button>
        </HStack>
        <TagsTable />
      </Stack>
      <Divider my="6" />
      <Heading as="h1" textStyle="4xl">
        Users
      </Heading>
    </Container>
  );
}
