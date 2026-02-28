import { createBrowserRouter } from "react-router";
import UltimateCv from "./pages/UltimateCv";
import CreativeCv from "./pages/CreativeCv";
import InteractiveCv from "./pages/InteractiveCv";
import SimpleCv from "./pages/SimpleCv";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: UltimateCv,
  },
  {
    path: "/creative",
    Component: CreativeCv,
  },
  {
    path: "/interactive",
    Component: InteractiveCv,
  },
  {
    path: "/simple",
    Component: SimpleCv,
  },
]);