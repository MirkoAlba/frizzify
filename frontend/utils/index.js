export const breakpoint = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
};

export async function validLoginRegister(operation, input, callback) {
  return fetch("/api/validate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      operation,
      input,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.valid) {
        // console.log("data yes: ", data);
        callback();
      } else {
        // console.log("data no: ", data);
        return data;
      }
    });
}
