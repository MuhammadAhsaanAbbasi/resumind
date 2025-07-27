import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("/sign-in", "routes/auth/sign-in.tsx"),
    route("/sign-up", "routes/auth/sign-up.tsx"),
    route("/upload", "routes/upload.tsx")
] satisfies RouteConfig;
