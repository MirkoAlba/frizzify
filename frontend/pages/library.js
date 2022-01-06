import { setAccessToken } from "../apollo/access-token";
import { checkIfLoggedIn } from "../utils";

export default function Library() {
  return <div>library</div>;
}

export async function getServerSideProps({ req }) {
  const { isLoggedIn } = await checkIfLoggedIn(req);

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
