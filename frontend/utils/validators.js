const regExEmail =
  /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
const regExPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
// var regExPhoneNumber = /^((3[1-6][0-9]))(\d{7})$/;

export function validateRegisterInput(
  username,
  email,
  password,
  confirmPassword
) {
  const errors = {};

  if (username.trim() === "") {
    errors.username = "Username non deve essere vuoto!";
  }

  if (username.trim().length > 25) {
    errors.username = "Username non deve superare i 25 caratteri!";
  }

  if (email.trim() === "") {
    errors.email = "Email non deve essere vuota!";
  } else {
    // if (email.trim().length > 50) {
    //   errors.email = "Email non deve superare i 50 caratteri!";
    // }

    if (!email.match(regExEmail)) {
      errors.email = "Email deve essere valida!";
    }

    // if (!/@gmail.com\s*$/.test(email.trim())) {
    //   errors.email = "Usare email con dominio valido. Es: gmail.com";
    // }
  }

  if (password.trim() === "") {
    errors.password = "Password non deve essere vuota!";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Le Password devono coincidere!";
  } else if (!password.match(regExPassword)) {
    errors.password =
      "Password deve contenere almeno 8 caratteri tra lettere e numeri!";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
}

export function validateLoginInput(userIdentifier, userPassword) {
  const errors = {};

  if (userPassword.trim() === "") {
    errors.password = "Password non deve essere vuota!";
  }

  if (userIdentifier.trim() === "") {
    errors.identifier = "Email non deve essere vuota!";
  } else {
    // if (userEmail.trim().length > 50) {
    //   errors.email = "Email non deve superare i 50 caratteri!";
    // }

    if (!userIdentifier.match(regExEmail)) {
      errors.identifier = "Email deve essere valida!";
    }
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
}
