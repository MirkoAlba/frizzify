import "../sass/index.scss";
import App from "next/app";
import Layout from "../components/layout/index";

import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../apollo/apollo-client";

import cookie from "cookie";
import { setAccessToken } from "../apollo/access-token";

import { uri } from "../apollo/api";

import { StoreProvider } from "easy-peasy";
import { store } from "../src/store";

function MyApp({ Component, pageProps, token, isLoggedIn }) {
  const client = useApollo(pageProps);
  setAccessToken(token);

  return (
    <StoreProvider store={store}>
      <ApolloProvider client={client}>
        {isLoggedIn ? (
          <Component {...pageProps} />
        ) : (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </ApolloProvider>
    </StoreProvider>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);

  // prima che la mia app venga renderizzata controllo che il token
  // sia presente in tutte le req quindi lo prendo e lo parso
  var token;
  if (appContext.ctx.req?.headers?.cookie) {
    token = cookie.parse(appContext.ctx.req?.headers.cookie);
  }

  // fetcho la api per vedere se lo user corrente è loggato
  const data = await fetch(uri + "/api/users/me", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + appContext?.ctx?.req?.cookies?.jid,
    },
  }).then((res) => {
    return res.json();
  });
  const isLoggedIn = data.error ? false : true;

  // ritorno il token per settarlo
  return {
    ...appProps,
    token: token?.jid,
    isLoggedIn, // se non è loggato ritorno unauthorized
  };
};

export default MyApp;
