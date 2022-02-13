import Header from "./header";
import Footer from "./footer";

import { Fragment } from "react";

import PlayingNowBar from "../web-player/playing-now-bar";
import LeftNav from "../web-player/left-nav";

export default function Layout(props) {
  return props.isLoggedIn ? (
    <Fragment>
      <main className="player-main">
        <LeftNav />
        <section className="player-main__content">{props.children}</section>
        <PlayingNowBar token={props.token} />
      </main>
    </Fragment>
  ) : (
    <Fragment>
      <Header />
      <main className="main-content">{props.children}</main>
      <Footer />
    </Fragment>
  );
}
