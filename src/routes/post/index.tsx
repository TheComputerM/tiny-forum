import { Container, Stack, styled } from "styled-system/jsx";
import { Button } from "~/components/ui/button";
import { FormLabel } from "~/components/ui/form-label";
import { Heading } from "~/components/ui/heading";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { For, Show, createResource } from "solid-js";
import { API_URL } from "~/lib/constants";

const TagsSelector = () => {
  const [tags] = createResource(async () => {
    const response = await fetch(`${API_URL}/tag`);
    const data = await response.json();
    return data.map((tag: any) => ({ label: tag.name, value: tag.id }));
  });

  return (
    <Show when={tags()}>
      <select name="tags" multiple>
        <For each={tags()}>
          {(tag) => <option value={tag.value}>{tag.label}</option>}
        </For>
      </select>
    </Show>
  );
}

export default function CreatePostPage() {
  return (
    <Container mt="6">
      <Heading as="h1" textStyle="5xl">
        Create Post
      </Heading>
      <styled.form
        display="contents"
        action="/api/post"
        method="post"
        id="post_form"
      >
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
