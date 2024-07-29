import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/provider";
import { mode } from "@chakra-ui/theme-tools";
import { extendTheme } from "@chakra-ui/theme-utils";
import { ColorModeScript } from "@chakra-ui/color-mode";
import HomePage from "./pages/HomePage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import PostPage from "./pages/PostPage.jsx";
import UpdatePage from "./pages/UpdatePage.jsx";
import ListPage from "./pages/ListPage.jsx";
import CreatePage from "./pages/CreatePage.jsx";
import CollectionPage from "./pages/CollectionPage.jsx";
import VideoPage from "./pages/VideoPage.jsx";

const styles = {
  global: (props) => ({
    body: {
      color: mode("blue.800", "gray.400")(props),
      bg: mode("white", "blackAlpha.900")(props),
    },
  }),
};

const config = {
  initialColorMode: "light",
  useSystemColorMode: true,
};

const colors = {
  gray: {
    light: "#616161",
    dark: "#1e1e1e",
  },
};

const theme = extendTheme({ config, styles, colors });

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/profiles/:userId",
        element: <ProfilePage />,
      },
      {
        path: "/me",
        element: <ProfilePage />,
      },
      {
        path: "/posts/:postId",
        element: <PostPage />,
      },
      {
        path: "/me/update",
        element: <UpdatePage />,
      },
      {
        path: "/me/create",
        element: <CreatePage />,
      },
      {
        path: "/me/collection",
        element: <CollectionPage />,
      },
      {
        path: "/tags/:tagId",
        element: <ListPage />,
      },
      {
        path: "/me/story",
        element: <VideoPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
