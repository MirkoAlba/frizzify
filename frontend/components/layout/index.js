import Header from "./header";
import Footer from "./footer";
import { Fragment } from "react";

export default function Layout(props) {
  return (
    <Fragment>
      <Header />
      <main className="main-content">{props.children}</main>
      <Footer />
    </Fragment>
  );
}
