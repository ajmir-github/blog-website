import {
  HomeIcon,
  InfoIcon,
  LogInIcon,
  PlusIcon,
  UserPlusIcon,
} from "lucide-react";
import { Link } from "react-router";

export default function Sidebar() {
  const signed = true;
  return (
    <div className="flex flex-row md:flex-col justify-between  items-center p-2 md:p-8 shadow bg-base-100">
      {signed && (
        <Link
          className="flex flex-col justify-center items-center gap-4 p-2"
          to={"/"}
        >
          <div className="avatar">
            <div className="ring-primary ring-offset-base-100 w-10 md:w-28 rounded-full ring ring-offset-2">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <div className="font-bold hidden md:block text-lg">
            Maria Askander
          </div>
        </Link>
      )}

      <div className="flex md:flex-col gap-2">
        {signed && (
          <Link
            className="btn btn-primary justify-start flex md:btn-lg"
            to={"/makePost"}
          >
            <PlusIcon />
            Post
          </Link>
        )}

        <Link className="btn btn-ghost justify-start flex md:btn-lg" to={"/"}>
          <HomeIcon />
          Home
        </Link>
        {signed || (
          <>
            <Link
              className="btn btn-ghost justify-start flex md:btn-lg"
              to={"/sign-in"}
            >
              <LogInIcon />
              sign in
            </Link>
            <Link
              className="btn btn-ghost justify-start md:flex md:btn-lg hidden"
              to={"/sign-up"}
            >
              <UserPlusIcon />
              sign up
            </Link>
          </>
        )}
        <Link
          className="btn btn-ghost justify-start flex md:btn-lg"
          to={"/about"}
        >
          <InfoIcon />
          About
        </Link>
      </div>
    </div>
  );
}
