import { Component } from "solid-js";
import { HStack, styled } from "styled-system/jsx";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { TbSend } from "solid-icons/tb";
import { reload, useParams } from "@solidjs/router";
import { API_URL } from "~/lib/constants";

export const CommentInput: Component<{ parent?: number }> = (props) => {
  const parentId = props.parent;
  const { post_id } = useParams();
  let requestUrl = `/post/${post_id}/comment`;

  if (parentId) requestUrl = requestUrl.concat("?parent=", parentId.toString());

  return (
    <HStack>
      <styled.form
        display="contents"
        onSubmit={async (event) => {
          event.preventDefault();
          await fetch(`${API_URL}${requestUrl}`, {
            method: "POST",
            // @ts-ignore
            body: new FormData(event.target),
          });
          reload();
        }}
      >
        <Input name="content" placeholder="Comment..." required />
        <Button type="submit">
          Send
          <TbSend />
        </Button>
      </styled.form>
    </HStack>
  );
};
