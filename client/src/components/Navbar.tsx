import {
  HomeIcon,
  InfoIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  PlusIcon,
  SearchIcon,
  StarsIcon,
} from "lucide-react";
import { Link } from "react-router";
import useToggle from "../utils/useToggle";

export default function Navbar() {
  const [mobileMenu, toggleMenu] = useToggle();
  const signed = true;
  return (
    <div className="px-2 pt-2">
      <div className="navbar bg-base-300  rounded-box shadow">
        <div className="navbar-start gap-2">
          <div className={"dropdown dropdown-open md:hidden"}>
            <div
              role="button"
              className="btn btn-ghost"
              onClick={toggleMenu.toggle}
            >
              <MenuIcon />
            </div>
            {mobileMenu && (
              <ul className="menu dropdown-content bg-base-200 rounded-box z-[1] mt-3 w-52 p-2 gap-1 shadow">
                <li>
                  <Link to={"/"} onClick={toggleMenu.close}>
                    <HomeIcon /> Home
                  </Link>
                </li>

                <li>
                  <Link to={"/"} onClick={toggleMenu.close}>
                    <StarsIcon /> Top Posts
                  </Link>
                </li>

                <li>
                  <Link to={"/about"} onClick={toggleMenu.close}>
                    <InfoIcon /> About
                  </Link>
                </li>
                {signed && (
                  <li>
                    <button>
                      <LogOutIcon /> Sign out
                    </button>
                  </li>
                )}
              </ul>
            )}
          </div>
          <Link to={"/"} className="btn btn-ghost text-xl">
            BW
          </Link>
        </div>
        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal px-1 gap-1">
            <li>
              <Link to={"/"}>
                <HomeIcon /> Home
              </Link>
            </li>

            <li>
              <Link to={"/"}>
                <StarsIcon /> Top Posts
              </Link>
            </li>

            <li>
              <Link to={"/about"}>
                <InfoIcon /> About
              </Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end gap-2">
          <button className="btn btn-ghost">
            <SearchIcon />
            <span className="hidden sm:block">Search</span>
          </button>
          {signed ? (
            <button className="btn btn-primary">
              <PlusIcon />
              <span className="hidden sm:block">Post</span>
            </button>
          ) : (
            <button className="btn btn-primary">
              <LogInIcon />
              <span className="hidden sm:block">Sign in</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
