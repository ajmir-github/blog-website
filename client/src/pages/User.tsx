import { useParams } from "react-router";

export default function User() {
  let params = useParams<{ userId: string }>();

  return <h1>User page:{params.userId}</h1>;
}
