import { ArrowRightIcon, EyeIcon, HashIcon } from "lucide-react";

function PostCard({ key }: { key: number }) {
  return (
    <div className="card bg-base-300  shadow" key={key}>
      <figure>
        <img
          className="w-full max-h-[400px] object-cover"
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Shoes!</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div className="flex gap-2 flex-wrap">
          <div className="btn btn-xs btn-neutral">
            <HashIcon size={16} /> Fashion
          </div>
          <div className="btn btn-xs btn-neutral">
            <HashIcon size={16} /> Fashion
          </div>
          <div className="btn btn-xs btn-neutral">
            <HashIcon size={16} /> Fashion
          </div>
          <div className="btn btn-xs btn-neutral">
            <HashIcon size={16} /> Fashion
          </div>
        </div>
        <div className="card-actions justify-between items-center">
          <div className="flex gap-2">
            <EyeIcon />
            12
          </div>
          <button className="btn btn-ghost">
            <ArrowRightIcon /> Read more
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PostList() {
  const posts = [1, 2, 3];
  return (
    <>
      {posts.map((key) => (
        <PostCard key={key} />
      ))}
    </>
  );
}
