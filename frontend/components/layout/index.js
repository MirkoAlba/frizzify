import Header from "./header";
import Footer from "./footer";

import { Fragment } from "react";

import PlayingNowBar from "../web-player/playing-now-bar";
import LeftNav from "../web-player/left-nav";

export default function Layout(props) {
  return props.isLoggedIn ? (
    <Fragment>
      <div className="wrapper-main-view">
        <LeftNav />
        <main className="main-view">{props.children}</main>
      </div>
      <PlayingNowBar />
    </Fragment>
  ) : (
    <Fragment>
      <Header />
      <main className="main-content">{props.children}</main>
      <Footer />
    </Fragment>
  );
}
