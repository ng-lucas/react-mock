import Homepage from "../components/Homepage/Homepage";
import Login from "../components/Login/Login";
import Signup from "../components/Signup/Signup";
import Layout from "../layout/Layout";
import Setting from "../components/Setting/Setting";
import ArticleDetail from "../../src/components/Articles/ArticleDetail/ArticleDetail";
import NewArticle from "../components/Articles/NewArticle";
import AuthService from "../services/AuthService";
import PublicRoute from "../services/PublicRoute";
import Author from "../components/Profile/Author";
import User from "../components/Profile/User";
import EditArticle from "../components/Articles/EditArticle";

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Homepage />,
        children: [
          {
            path: ":type",
            element: <></>,
          },
          {
            path: ":type/:tag",
            element: <></>,
          },
          {
            path: "my-feed",
            element: <AuthService />,
            children: [
              {
                path: "",
                element: <></>,
              },
            ],
          },
        ],
      },
      {
        path: "/article-detail/:slug",
        element: <ArticleDetail />,
      },
      {
        path: "/profile/:username",
        element: <Author />,
      },
      {
        path: "/login",
        element: <PublicRoute />,
        children: [
          {
            path: "",
            element: <Login />,
          },
        ],
      },
      {
        path: "/signup",
        element: <PublicRoute />,
        children: [
          {
            path: "",
            element: <Signup />,
          },
        ],
      },
      {
        path: "/user",
        element: <AuthService />,
        children: [
          {
            path: "",
            element: <User />,
          },
        ],
      },
      {
        path: "/new-article",
        element: <AuthService />,
        children: [
          {
            path: "",
            element: <NewArticle />,
          },
        ],
      },
      {
        path: "/edit-myArticle/:slug",
        element: <AuthService />,
        children: [
          {
            path: "",
            element: <EditArticle />,
          },
        ],
      },
      {
        path: "/setting",
        element: <AuthService />,
        children: [
          {
            path: "",
            element: <Setting />,
          },
        ],
      },
    ],
  },
];

export default routes;
