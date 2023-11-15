import React from "react";
import ReactDOM from "react-dom/client";
import Root, {
  loader as rootLoader,
  action as rootAction,
  deleter as rootDeleter,
} from "./routes/root";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import ErrorPage from "./ErrorPage";
import Contact, { loader as contactLoader } from "./routes/Contact";
import EditContact, { action as editAction } from "./routes/edit";

// Set Router Config
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    // Handle Routing Error
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    deleter: rootDeleter,
    children: [
      {
        // ":" turns the following into a "dynamic segment"
        path: "contacts/:contactId",
        element: <Contact />,
        loader: contactLoader,
      },
      {
        path: "contacts/:contactId/edit",
        element: <EditContact />,
        loader: contactLoader,
        action: editAction,
      },
      {
        path: "contacts/:contactId/destroy",
        element: <Root />,
        action: rootDeleter,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Set Routing */}
    <RouterProvider router={router} />
  </React.StrictMode>
);
