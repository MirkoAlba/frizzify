import { useStoreState } from "easy-peasy";

export default function Player() {
  const user = useStoreState((state) => state.user);
  console.log(user);
  return <div>webplayer</div>;
}
