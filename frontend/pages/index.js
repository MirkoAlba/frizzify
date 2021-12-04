import { useRef, useState } from "react";

import { useMutation, useLazyQuery } from "@apollo/client";
import { LOGIN } from "../graphql/mutations/index";
import { SONGS } from "../graphql/queries/index";
import { setAccessToken } from "../apollo/access-token";

export default function Home() {
  const inputInitialState = {
    identifier: "",
    password: "",
  };
  const [input, setInput] = useState(inputInitialState);

  const [login] = useMutation(LOGIN, {
    onCompleted: (d) => {
      setAccessToken(d.login.jwt);
      fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(d.login?.jwt),
      });
    },
    onError: (e) => {
      console.log(e.graphQLErrors[0].extensions.error.details.errors);
    },
    variables: {
      input,
    },
  });

  const [q] = useLazyQuery(SONGS, {
    onCompleted: (d) => console.log(d),
  });

  return (
    <div>
      email
      <input
        onChange={(e) => {
          setInput({ identifier: e.target.value, password: input.password });
        }}
        type="text"
      />
      pwd
      <input
        onChange={(e) => {
          setInput({ identifier: input.identifier, password: e.target.value });
        }}
        type="password"
      />
      <button onClick={() => login()}>login</button>
      <button onClick={() => q()}>songs</button>
    </div>
  );
}
