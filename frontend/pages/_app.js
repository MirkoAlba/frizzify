import "../sass/index.scss";
import App from "next/app";
import Layout from "../components/layout/index";

import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../apollo/apollo-client";

import cookie from "cookie";
import { setAccessToken } from "../apollo/access-token";

function MyApp({ Component, pageProps, token }) {
  const client = useApollo(pageProps);
  setAccessToken(token);
  return (
    <ApolloProvider client={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);

  // prima che la mia app venga renderizzata controllo che il token
  // sia presente in tutte le req quindi lo prendo e lo parso
  var token;
  if (appContext.ctx.req?.headers.cookie) {
    token = cookie.parse(appContext.ctx.req?.headers.cookie);
  }

  // ritorno il token per settarlo
  return { ...appProps, token: token?.jid };
};

export default MyApp;
