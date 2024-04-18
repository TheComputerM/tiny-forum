import { Component } from "solid-js";
import { HStack } from "styled-system/jsx";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { TbSend } from "solid-icons/tb";

export const CommentInput: Component = () => {
  return (
    <HStack>
      <Input placeholder="Comment..." />
      <Button>
        Send
        <TbSend />
      </Button>
    </HStack>
  );
};
