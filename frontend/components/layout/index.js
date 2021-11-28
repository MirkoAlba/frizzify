import Header from "./header";
import Footer from "./footer";
import { Fragment } from "react";

export default function Layout(props) {
  return (
    <Fragment>
      <Header />
      <main>{props.children}</main>
      <Footer />
    </Fragment>
  );
}
