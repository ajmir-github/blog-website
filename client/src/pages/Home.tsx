import { useSearchParams } from "react-router";
import Sidebar from "../components/Sidebar";
import PostList from "../components/PostList";

export default function Home() {
  let [searchParams] = useSearchParams();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-2">
      <div className="flex flex-col gap-2">
        <Sidebar />
      </div>
      <div className="lg:col-span-2 grid lg:grid-cols-2 gap-2">
        <PostList />
      </div>
    </div>
  );
}
