import { serialize } from "cookie";

export default function handler(req, res) {
  if (req.method !== "POST") return;

  let token = req.body;

  if (token) {
    res.setHeader(
      "Set-Cookie",
      serialize("jid", token, {
        httpOnly: true,
        // domain: ".example.com",
        secure: process.env.NODE_ENV !== "development",
        maxAge: 6 * 60 * 60 * 1000,
        sameSite: "strict",
        path: "/",
      })
    );
    res.status(200).json({ message: "yes!" });
  } else {
    res.status(422).json({ message: "no token!" });
  }
}
