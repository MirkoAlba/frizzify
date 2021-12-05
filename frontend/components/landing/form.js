import { Container, Row, Col, Form } from "react-bootstrap";

import { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../graphql/mutations/index";
import { setAccessToken } from "../../apollo/access-token";

export default function RegisterLoginForm() {
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

  return (
    <section className="wrapper wrapper-block-form py-45 py-md-75 py-lg-90">
      <Container>
        <Row>
          <Col>
            <Form.Label className="form-label">Nome</Form.Label>
            <Form.Control
              className="form-input"
              type="text"
              placeholder="Inserisci il tuo Nome"
              //   value={registerInput.firstName}
              //   onChange={(e) =>
              //     setRegisterInput({
              //       ...registerInput,
              //       firstName: e.target.value,
              //     })
              //   }
              //   isInvalid={errors?.firstName ? true : false}
            />
            <Form.Control.Feedback type="invalid">
              {errors?.firstName}
            </Form.Control.Feedback>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
