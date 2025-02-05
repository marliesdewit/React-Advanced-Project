import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";

import { Root } from "./components/Root";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import EventsPage from "./pages/EventsPage";
import EventPage from "./pages/EventPage";
import "./index.css";
import { EventsContextProvider } from "./context/EventsContext";
import theme from "./theme/theme";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <EventsPage />,
        // loader: postListLoader,
      },
      {
        path: "/event/:id",
        element: <EventPage />,
        // loader: postLoader,
        // action: addComment,
      },
    ],
  },
]);
// @ts-ignore
ReactDOM.createRoot(document.getElementById("root")).render(
  <EventsContextProvider>
    <React.StrictMode>
      <ChakraProvider theme={theme}>
        <RouterProvider router={router} />
      </ChakraProvider>
    </React.StrictMode>
  </EventsContextProvider>
);
