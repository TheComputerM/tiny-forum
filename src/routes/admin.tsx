import { TbPlus, TbTrash, TbX } from "solid-icons/tb";
import { For, Show, createResource } from "solid-js";
import { Container, Divider, HStack, Stack, styled } from "styled-system/jsx";
import { Button } from "~/components/ui/button";
import { Heading } from "~/components/ui/heading";
import { IconButton } from "~/components/ui/icon-button";
import * as Table from "~/components/ui/table";
import { API_URL } from "~/lib/constants";
import * as Dialog from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";

function NewTagModal() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button>
          <TbPlus />
          Add Tag
        </Button>
      </Dialog.Trigger>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Stack gap="8" p="6">
            <Stack gap="1">
              <Dialog.Title>Add Tag</Dialog.Title>
            </Stack>
            <styled.form display="contents" action="/api/tag" method="post">
              <Stack>
                <Input name="name" placeholder="Name" />
                <Input name="description" placeholder="Description" />
              </Stack>
              <Stack gap="3" direction="row" width="full">
                <Button width="full" type="submit">
                  Confirm
                </Button>
              </Stack>
            </styled.form>
          </Stack>
          <Dialog.CloseTrigger asChild position="absolute" top="2" right="2">
            <IconButton aria-label="Close Dialog" variant="ghost" size="sm">
              <TbX />
            </IconButton>
          </Dialog.CloseTrigger>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}

function AddUserTagModal({ userId }: { userId: number }) {
  const [tags] = createResource(async () => {
    const response = await fetch(`${API_URL}/tag`);
    const data = await response.json();
    return data;
  });

  return (
    <Show when={tags()}>
      <Dialog.Root lazyMount>
        <Dialog.Trigger asChild>
          <IconButton size="xs">
            <TbPlus />
          </IconButton>
        </Dialog.Trigger>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Stack gap="8" p="6">
              <Stack gap="1">
                <Dialog.Title>Add Tag</Dialog.Title>
              </Stack>
              <styled.form
                display="contents"
                onSubmit={async (e) => {
                  e.preventDefault();
                  // @ts-ignore
                  const formdata = new FormData(e.target);
                  await fetch(`${API_URL}/user/${userId}`, {
                    method: "PATCH",
                    body: formdata,
                  });
                  window.location.reload();
                }}
              >
                <select name="tag">
                  <For each={tags()}>
                    {(tag) => <option value={tag.id}>{tag.name}</option>}
                  </For>
                </select>
                <Stack gap="3" direction="row" width="full">
                  <Button width="full" type="submit">
                    Confirm
                  </Button>
                </Stack>
              </styled.form>
            </Stack>
            <Dialog.CloseTrigger asChild position="absolute" top="2" right="2">
              <IconButton aria-label="Close Dialog" variant="ghost" size="sm">
                <TbX />
              </IconButton>
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </Show>
  );
}

function TagsTable() {
  const [tags, { refetch }] = createResource(async () => {
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
                  <IconButton
                    size="xs"
                    onClick={async () => {
                      await fetch(`${API_URL}/tag/${tag.id}`, {
                        method: "DELETE",
                      });
                      refetch();
                    }}
                  >
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

function UsersTable() {
  const [users] = createResource(async () => {
    const response = await fetch(`${API_URL}/user`);
    const data = await response.json();
    return data;
  });
  return (
    <Show when={users()}>
      <Table.Root>
        <Table.Head>
          <Table.Row>
            <Table.Header>Name</Table.Header>
            <Table.Header>EMail</Table.Header>
            <Table.Header>Tags</Table.Header>
            <Table.Header textAlign="right">Actions</Table.Header>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <For each={users()}>
            {(user) => (
              <Table.Row>
                <Table.Cell>{user.name}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>
                  <AddUserTagModal userId={user.id} />
                </Table.Cell>
                <Table.Cell>
                  <HStack justify="end">
                    <Show when={user.is_moderator}>
                      <Button size="xs">Make Moderator</Button>
                    </Show>
                    <IconButton size="xs">
                      <TbTrash />
                    </IconButton>
                  </HStack>
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

          <NewTagModal />
        </HStack>
        <TagsTable />
      </Stack>
      <Divider my="6" />
      <Heading as="h1" textStyle="4xl">
        Users
      </Heading>
      <UsersTable />
    </Container>
  );
}
