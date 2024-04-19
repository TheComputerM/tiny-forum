import { TbLogin } from "solid-icons/tb";
import { Center, Stack, styled } from "styled-system/jsx";
import { Button } from "~/components/ui/button";
import * as Card from "~/components/ui/card";
import { FormLabel } from "~/components/ui/form-label";
import { Input } from "~/components/ui/input";
import { Link } from "~/components/ui/link";

export default function SignInPage() {
  return (
    <Center mt="6">
      <Card.Root width="md">
        <Card.Header>
          <Card.Title>Sign In</Card.Title>
          <Card.Description>
            Don't have an account?
            <Link href="/auth/signup" ml="1">
              Sign Up
            </Link>
          </Card.Description>
        </Card.Header>
        <styled.form display="contents">
          <Card.Body>
            <Stack gap="1">
              <FormLabel>EMail</FormLabel>
              <Input type="email" placeholder="fyyyyxxxx@p.bits-pilani.ac.in" />
            </Stack>
          </Card.Body>
          <Card.Footer>
            <Button>
              <TbLogin />
              Sign In
            </Button>
          </Card.Footer>
        </styled.form>
      </Card.Root>
    </Center>
  );
}
