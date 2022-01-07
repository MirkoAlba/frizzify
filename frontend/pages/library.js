import { setAccessToken } from "../apollo/access-token";
import { checkIfLoggedIn } from "../utils";

import { parse } from "cookie";

export default function Library() {
  return <div>library</div>;
}

export async function getServerSideProps({ req }) {
  var token;
  if (req.headers.cookie) {
    token = parse(req.headers.cookie).jid;
  }
  const { isLoggedIn } = await checkIfLoggedIn(token);

  if (!isLoggedIn) {
    setAccessToken("nullo");
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  }

  return {
    props: { isLoggedIn },
  };
}
