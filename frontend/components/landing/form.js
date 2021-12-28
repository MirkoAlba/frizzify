import { Container, Row, Col, Form } from "react-bootstrap";

import { useState } from "react";
import { useMutation } from "@apollo/client";
import { REGISTER, LOGIN } from "../../graphql/mutations/index";
import { setAccessToken } from "../../apollo/access-token";

import { validLoginRegister } from "../../utils/index";

import View from "../../assets/view.svg";
import Hide from "../../assets/hide.svg";

import { useRouter } from "next/router";

import { useStoreActions } from "easy-peasy";

export default function RegisterLoginForm() {
  const router = useRouter();

  const setUserId = useStoreActions((actions) => actions.setUserId);

  const [show, setShow] = useState(false);

  //handle show password when typing
  const [showPassword, setShowPassword] = useState("password");
  const handleShowPassword = () => {
    if (showPassword === "password") setShowPassword("text");
    if (showPassword === "text") setShowPassword("password");
  };

  const [errors, setErrors] = useState();
  // if (errors) console.log("errori: ", errors);

  //register
  const registerInitialState = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [registerInput, setRegisterInput] = useState(registerInitialState);
  const [register] = useMutation(REGISTER, {
    onCompleted: (d) => {
      setAccessToken(d.register.jwt);
      fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(d.register.jwt),
      });
      setUserId(d.register.user);
      window.location.href = "/";
    },
    onError: (e) => {
      if (e.graphQLErrors[0].message == "Email is already taken") {
        setErrors({ errors: { email: "Email gia esistente!" } });
      }
    },
    variables: {
      input: {
        username: registerInput.username,
        email: registerInput.email,
        password: registerInput.password,
      },
    },
  });

  //login
  const loginInitialState = {
    identifier: "",
    password: "",
  };
  const [loginInput, setLoginInput] = useState(loginInitialState);
  const [login] = useMutation(LOGIN, {
    onCompleted: (d) => {
      setAccessToken(d.login.jwt);
      fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(d.login.jwt),
      });
      setUserId(d.login.user);
      window.location.href = "/";
    },
    onError: (e) => {
      if (e.graphQLErrors[0].message == "Invalid identifier or password") {
        setErrors({
          errors: {
            identifier: "Email o password errate!",
            password: "Email o password errate!",
          },
        });
      }
    },
    variables: {
      input: loginInput,
    },
  });

  return (
    <section className="wrapper wrapper-block-form py-45 py-md-75 py-lg-90">
      <Container>
        <Row>
          <Col xs={6} sm={{ span: 4, offset: 2 }} className="text-center">
            <button
              className={show === false ? "form-btn-animation" : ""}
              onClick={() => (
                setShow(false),
                setRegisterInput(registerInitialState),
                setLoginInput(loginInitialState),
                setErrors({})
              )}
            >
              <h2>Registrati</h2>
            </button>
          </Col>

          <Col xs={6} sm={4} className="text-center">
            <button
              className={show === true ? "form-btn-animation" : ""}
              onClick={() => (
                setShow(true),
                setRegisterInput(registerInitialState),
                setLoginInput(loginInitialState),
                setErrors({})
              )}
            >
              <h2>Accedi</h2>
            </button>
          </Col>
          {show ? (
            <Col sm={12} lg={{ span: 8, offset: 2 }} className="col-login">
              <Row>
                <Col sm={12} md={6} className="mt-3">
                  <Form.Label className="form-label text-secondary">
                    E-mail
                  </Form.Label>
                  <Form.Control
                    className="form-input"
                    type="email"
                    placeholder="Inserisci la tua E-mail"
                    value={loginInput.identifier}
                    onChange={(e) =>
                      setLoginInput({
                        ...loginInput,
                        identifier: e.target.value,
                      })
                    }
                    isInvalid={errors?.errors?.identifier}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors?.errors?.identifier}
                  </Form.Control.Feedback>
                </Col>

                <Col sm={12} md={6} className="mt-3">
                  <Form.Label className="form-label text-secondary d-flex align-items-center">
                    Password
                    {showPassword == "password" ? (
                      <View
                        className="ms-2 cursor-pointer"
                        onClick={handleShowPassword}
                      />
                    ) : (
                      <Hide
                        className="ms-2 cursor-pointer"
                        onClick={handleShowPassword}
                      />
                    )}
                  </Form.Label>
                  <Form.Control
                    className="form-input"
                    type={showPassword}
                    placeholder="Inserisci Password"
                    value={loginInput.password}
                    onChange={(e) =>
                      setLoginInput({
                        ...loginInput,
                        password: e.target.value,
                      })
                    }
                    isInvalid={errors?.errors?.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors?.errors?.password}
                  </Form.Control.Feedback>
                </Col>
                <Col sm={12} className="mt-3">
                  <button
                    onClick={async () => {
                      setErrors(
                        await validLoginRegister("login", loginInput, login)
                      );
                    }}
                    className="btn-lr"
                  >
                    Accedi
                  </button>
                </Col>
              </Row>
            </Col>
          ) : (
            <Col sm={12} lg={{ span: 8, offset: 2 }} className="col-register">
              <Row>
                <Col sm={12} md={6} className="mt-3">
                  <Form.Label className="form-label text-secondary">
                    E-mail
                  </Form.Label>
                  <Form.Control
                    className="form-input"
                    type="email"
                    placeholder="Inserisci la tua E-mail"
                    value={registerInput.email}
                    onChange={(e) =>
                      setRegisterInput({
                        ...registerInput,
                        email: e.target.value,
                      })
                    }
                    isInvalid={errors?.errors?.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors?.errors?.email}
                  </Form.Control.Feedback>
                </Col>

                <Col sm={12} md={6} className="mt-3">
                  <Form.Label className="form-label text-secondary">
                    Username
                  </Form.Label>
                  <Form.Control
                    className="form-input"
                    type="text"
                    placeholder="Inserisci il tuo Username"
                    value={registerInput.username}
                    onChange={(e) =>
                      setRegisterInput({
                        ...registerInput,
                        username: e.target.value,
                      })
                    }
                    isInvalid={errors?.errors?.username}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors?.errors?.username}
                  </Form.Control.Feedback>
                </Col>

                <Col sm={12} md={6} className="mt-3">
                  <Form.Label className="form-label text-secondary d-flex align-items-center">
                    Password
                    {showPassword == "password" ? (
                      <View
                        className="ms-2 cursor-pointer"
                        onClick={handleShowPassword}
                      />
                    ) : (
                      <Hide
                        className="ms-2 cursor-pointer"
                        onClick={handleShowPassword}
                      />
                    )}
                  </Form.Label>
                  <Form.Control
                    className="form-input"
                    type={showPassword}
                    placeholder="Inserisci Password"
                    value={registerInput.password}
                    onChange={(e) =>
                      setRegisterInput({
                        ...registerInput,
                        password: e.target.value,
                      })
                    }
                    isInvalid={errors?.errors?.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors?.errors?.password}
                  </Form.Control.Feedback>
                </Col>

                <Col sm={12} md={6} className="mt-3">
                  <Form.Label className="form-label text-secondary">
                    Conferma Password
                  </Form.Label>
                  <Form.Control
                    className="form-input"
                    type={showPassword}
                    placeholder="Conferma Password"
                    value={registerInput.confirmPassword}
                    onChange={(e) =>
                      setRegisterInput({
                        ...registerInput,
                        confirmPassword: e.target.value,
                      })
                    }
                    isInvalid={errors?.errors?.confirmPassword}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors?.errors?.confirmPassword}
                  </Form.Control.Feedback>
                </Col>

                <Col sm={12} className="mt-3">
                  <span>
                    <Form.Check
                      className="d-inline-block me-3"
                      required
                      aria-label="option 1"
                    />
                    Accetto le condizioni della{" "}
                    <a href="#" className="text-secondary">
                      Privacy
                    </a>
                  </span>
                </Col>
                <Col sm={12} className="mt-3">
                  <button
                    onClick={async () => {
                      setErrors(
                        await validLoginRegister(
                          "register",
                          registerInput,
                          register
                        )
                      );
                    }}
                    className="btn-lr"
                  >
                    Registrati
                  </button>
                </Col>
              </Row>
            </Col>
          )}
        </Row>
      </Container>
    </section>
  );
}
