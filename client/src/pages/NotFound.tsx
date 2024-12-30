import { HomeIcon, InfoIcon } from "lucide-react";
import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="h-full min-h-[50vh] flex justify-center items-center">
      <div className="grid gap-4">
        <div className="flex flex-col items-center gap-4 text-xl uppercase text-red-500">
          <InfoIcon size={128} /> Url not found!
        </div>
        <Link to="/" className="btn btn-ghost w-full">
          <HomeIcon /> Go to home
        </Link>
      </div>
    </div>
  );
}
