// import { uri as apiUri } from "../apollo/api";

// import { parse } from "cookie";
// import { getAccessToken, setAccessToken } from "../apollo/access-token";
// import { NextResponse } from "next/dist/server/web/spec-extension/response";

export async function middleware(req, ev) {
  // const { pathname } = req.nextUrl;
  // var token;
  // if (req.headers.get("cookie")) {
  //   token = parse(req.headers.get("cookie")).jid;
  // }
  // var isLoggedIn;
  // const data = await fetch(apiUri + "/api/users/me", {
  //   method: "GET",
  //   headers: {
  //     Authorization: "Bearer " + token,
  //   },
  // }).then((res) => res.json());
  // isLoggedIn = data.error ? false : true;
  // setAccessToken(token);
  // console.log("at: ", getAccessToken());
  // if (isLoggedIn && pathname !== "/") {
  //   return NextResponse.next();
  // } else if (!isLoggedIn && pathname !== "/") {
  //   return NextResponse.redirect("/");
  // }
  // if (!isLoggedIn && pathname.includes("/")) {
  //   setAccessToken(jid);
  //   return NextResponse.next();
  // } else if (!isLoggedIn && pathname !== "/") {
  //   setAccessToken("");
  //   return NextResponse.redirect("/");
  // } else if (isLoggedIn && !pathname.includes("/")) {
  //   setAccessToken(jid);
  //   return NextResponse.next();
  // }
}
