import { Container, Stack, styled } from "styled-system/jsx";
import { Button } from "~/components/ui/button";
import { FormLabel } from "~/components/ui/form-label";
import { Heading } from "~/components/ui/heading";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";

export default function CreatePostPage() {
  return (
    <Container mt="6">
      <Heading as="h1" textStyle="5xl">
        Create Post
      </Heading>
      <styled.form display="contents" action="/api/post" method="post">
        <Stack mt="6" gap="3">
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
          <Button type="submit">Post</Button>
        </Stack>
      </styled.form>
    </Container>
  );
}
