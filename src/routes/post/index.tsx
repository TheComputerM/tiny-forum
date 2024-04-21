import { Container, Stack, styled } from "styled-system/jsx";
import { Button } from "~/components/ui/button";
import { FormLabel } from "~/components/ui/form-label";
import { Heading } from "~/components/ui/heading";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Index, Portal } from "solid-js/web";
import * as Select from "~/components/ui/select";
import { TbCheck } from "solid-icons/tb";
import { Show, createResource } from "solid-js";
import { API_URL } from "~/lib/constants";

const TagsSelector = () => {
  const [tags] = createResource(async () => {
    const response = await fetch(`${API_URL}/tag`);
    const data = await response.json();
    return data.map((tag: any) => ({ label: tag.name, value: tag.id }));
  });

  return (
    <Show when={tags()}>
      <Select.Root
        positioning={{ sameWidth: true }}
        items={tags()}
        multiple={true}
        name="tags"
        form="post_form"
      >
        <Select.Label>Tags</Select.Label>
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="Select a Framework" />
          </Select.Trigger>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content>
              <Index each={tags()}>
                {(item) => (
                  <Select.Item item={item()}>
                    <Select.ItemText>{item().label}</Select.ItemText>
                    <Select.ItemIndicator>
                      <TbCheck />
                    </Select.ItemIndicator>
                  </Select.Item>
                )}
              </Index>
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>
    </Show>
  );
};

export default function CreatePostPage() {
  return (
    <Container mt="6">
      <Heading as="h1" textStyle="5xl">
        Create Post
      </Heading>
      <styled.form display="contents" action="/api/post" method="post" id="post_form">
        <Stack mt="6" gap="4">
          <Stack gap="1">
            <FormLabel>Title</FormLabel>
            <Input
              name="title"
              placeholder="Something Interesting"
              minlength="10"
              required={true}
            />
          </Stack>
          <Stack gap="1">
            <FormLabel>Content</FormLabel>
            <Textarea
              name="content"
              placeholder="Post body..."
              minlength="25"
              required={true}
            ></Textarea>
          </Stack>
          <TagsSelector />
          <Button type="submit">Post</Button>
        </Stack>
      </styled.form>
    </Container>
  );
}
