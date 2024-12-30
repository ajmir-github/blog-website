import { useSearchParams } from "react-router";

export default function Home() {
  let [searchParams] = useSearchParams();
  return <h1>HOME page - search:{searchParams.get("search")}</h1>;
}
