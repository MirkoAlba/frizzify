import {
  validateRegisterInput,
  validateLoginInput,
} from "../../utils/validators";

export default function handler(req, res) {
  if (req.method !== "POST") {
    res.redirect(301, "/");
    return;
  }

  const { operation, input } = req.body;

  if (operation == "register") {
    const { username, email, password, confirmPassword } = input;
    const { errors, valid } = validateRegisterInput(
      username,
      email,
      password,
      confirmPassword
    );

    valid
      ? res.status(200).json({ errors, valid })
      : res.status(400).json({ errors, valid });
  } else if (operation == "login") {
    const { identifier, password } = input;
    const { errors, valid } = validateLoginInput(identifier, password);

    valid
      ? res.status(200).json({ errors, valid })
      : res.status(400).json({ errors, valid });
  }
}
