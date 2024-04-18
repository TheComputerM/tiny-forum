import { Container, Stack } from "styled-system/jsx";
import { PostCard } from "~/components/Post";

export default function HomePage() {
  return (
    <Container mt="6">
      <Stack>
        <PostCard />
      </Stack>
    </Container>
  );
}
