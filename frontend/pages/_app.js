import "../sass/index.scss";
import App from "next/app";
import Layout from "../components/layout/index";

import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../apollo/apollo-client";

import { setAccessToken } from "../apollo/access-token";

import { StoreProvider } from "easy-peasy";
import { store } from "../src/store";
import { checkIfLoggedIn } from "../utils";
import { parse } from "cookie";

function MyApp({ Component, pageProps, token, isLoggedIn }) {
  const client = useApollo(pageProps);
  setAccessToken(token);

  return (
    <StoreProvider store={store}>
      <ApolloProvider client={client}>
        <Layout isLoggedIn={isLoggedIn}>
          <Component isLoggedIn={isLoggedIn} {...pageProps} />
        </Layout>
      </ApolloProvider>
    </StoreProvider>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);

  var jid;
  if (appContext.ctx.req?.headers.cookie) {
    jid = parse(appContext.ctx.req.headers.cookie).jid;
  }
  // prima che la mia app venga renderizzata controllo che il token sia presente nella req
  const { isLoggedIn, token } = await checkIfLoggedIn(jid);

  isLoggedIn === false && setAccessToken("");

  // ritorno il token per settarlo
  return {
    ...appProps,
    token,
    isLoggedIn, // se non è loggato ritorno unauthorized
  };
};

export default MyApp;
