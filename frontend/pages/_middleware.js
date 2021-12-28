import { uri } from "../apollo/api";
import { NextResponse } from "next/server";

export async function middleware(req, ev) {
  // const { pathname } = req.nextUrl;
  // // fetcho la api per vedere se lo user corrente è loggato
  // const data = await fetch(uri + "/api/users/me", {
  //   method: "GET",
  //   headers: {
  //     Authorization: "Bearer " + req?.cookies?.jid,
  //   },
  // }).then((res) => {
  //   return res.json();
  // });
  // const isLoggedIn = data.error ? false : true;
  // if (isLoggedIn && pathname !== "/player") {
  //   return NextResponse.redirect("/player");
  // } else if (!isLoggedIn && pathname == "/player") {
  //   return NextResponse.redirect("/");
  // }
}
