import { parse } from "cookie";
import { NextResponse } from "next/dist/server/web/spec-extension/response";

import { checkIfLoggedIn } from "../../../utils";

export async function middleware(req, ev) {
  //   const { pathname } = req.nextUrl;
  var token;
  if (req.headers.get("cookie")) {
    token = parse(req.headers.get("cookie")).jid;
  }
  const { isLoggedIn } = await checkIfLoggedIn(token);

  if (!isLoggedIn) {
    return NextResponse.redirect("/");
  } else {
    return NextResponse.next();
  }
}
