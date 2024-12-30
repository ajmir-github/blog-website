import { useParams } from "react-router";

export default function Post() {
  let params = useParams<{ postId: string }>();

  return <h1>Post page:{params.postId}</h1>;
}
