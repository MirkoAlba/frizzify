import { useRef, useState } from "react";

import { useMutation, useLazyQuery } from "@apollo/client";
import { LOGIN } from "../graphql/mutations/index";
import { SONGS } from "../graphql/queries/index";
import { setAccessToken } from "../apollo/access-token";
import { useCookies } from "react-cookie";

export default function Home() {
  const [cookie, setCookie] = useCookies(["user"]);

  const inputInitialState = {
    identifier: "",
    password: "",
  };
  const [input, setInput] = useState(inputInitialState);

  const [login] = useMutation(LOGIN, {
    onCompleted: (d) => {
      console.log("data: ", d);
      setAccessToken(d.login.jwt);
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
