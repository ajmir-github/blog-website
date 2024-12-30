import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./Home";
import About from "./About";
import Layout from "../Layout";
import Post from "./Post";
import User from "./User";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import NotFound from "./NotFound";

export default function Pages() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/post/:postId" element={<Post />} />
          <Route path="/user/:userId" element={<User />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
