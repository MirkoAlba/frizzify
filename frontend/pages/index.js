import { useState, useRef } from "react";

import { useMutation } from "@apollo/client";
import { LOGIN } from "../graphql/mutations/index";

export default function Home() {
  const email = useRef();
  const pwd = useRef();

  const handleChange = (current) => {
    console.log(current.target.value);
  };

  const [login] = useMutation(LOGIN, {
    onCompleted: (d) => console.log("data: ", d),
    variables: {
      input: {
        identifier: email.current?.value,
        password: pwd.current?.value,
      },
    },
  });

  return (
    <div>
      email
      <input onChange={(e) => handleChange(e)} ref={email} type="text" />
      pwd
      <input onChange={(e) => handleChange(e)} ref={pwd} type="password" />
      <button onClick={() => login()}>login</button>
    </div>
  );
}
