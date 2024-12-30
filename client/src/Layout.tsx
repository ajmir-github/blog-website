import { Outlet } from "react-router";
import Sidebar from "./components/Sidebar";

export default function Layout() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen" data-theme="light">
      <Sidebar />
      <h1 className="grow bg-base-200">
        <Outlet />
      </h1>
    </div>
  );
}
