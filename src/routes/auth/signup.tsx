import { TbUserPlus } from "solid-icons/tb";
import { Center, Stack, styled } from "styled-system/jsx";
import { Button } from "~/components/ui/button";
import * as Card from "~/components/ui/card";
import { FormLabel } from "~/components/ui/form-label";
import { Input } from "~/components/ui/input";
import { Link } from "~/components/ui/link";

export default function SignUpPage() {
  return (
    <Center mt="6">
      <Card.Root width="md">
        <Card.Header>
          <Card.Title>Sign Up</Card.Title>
          <Card.Description>
            Already have an account?
            <Link href="/auth/signin" ml="1">
              Login
            </Link>
          </Card.Description>
        </Card.Header>
        <styled.form display="contents" method="post" action="/api/user">
          <Card.Body>
            <Stack gap="4">
              <Stack gap="1">
                <FormLabel>EMail</FormLabel>
                <Input
                  type="email"
                  name="email"
                  placeholder="fyyyyxxxx@p.bits-pilani.ac.in"
                />
              </Stack>
              <Stack gap="1">
                <FormLabel>Name</FormLabel>
                <Input name="name" placeholder="John Doe" />
              </Stack>
            </Stack>
          </Card.Body>
          <Card.Footer>
            <Button type="submit">
              Sign Up
              <TbUserPlus />
            </Button>
          </Card.Footer>
        </styled.form>
      </Card.Root>
    </Center>
  );
}
