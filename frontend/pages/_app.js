import "../sass/index.scss";
import App from "next/app";
import Layout from "../components/layout/index";

import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../apollo/apollo-client";

import { QUEUES, QUEUE } from "../graphql/queries";
import { queryClient } from "../apollo/utils";

import cookie from "cookie";
import { getAccessToken, setAccessToken } from "../apollo/access-token";

import { uri } from "../apollo/api";

import { StoreProvider } from "easy-peasy";
import { store } from "../src/store";

function MyApp({ Component, pageProps, token, isLoggedIn, queues }) {
  const client = useApollo(pageProps);
  setAccessToken(token);

  // console.log(queues);

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

  // prima che la mia app venga renderizzata controllo che il token
  // sia presente in tutte le req quindi lo prendo e lo parso
  var token;
  if (appContext.ctx.req?.headers.cookie) {
    var c = cookie.parse(appContext.ctx.req.headers.cookie);
    token = c.jid;
  } else {
    token = getAccessToken();
  }

  // fetcho la api per vedere se lo user corrente è loggato
  const data = await fetch(uri + "/api/users/me", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  }).then((res) => {
    return res.json();
  });
  const isLoggedIn = data.error ? false : true;

  var queues;
  if (isLoggedIn) {
    queues = await queryClient({ query: QUEUES });
  }

  // ritorno il token per settarlo
  return {
    ...appProps,
    token,
    isLoggedIn, // se non è loggato ritorno unauthorized
    queues,
  };
};

export default MyApp;
