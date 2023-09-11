import React from "react"
import ReactDOM from "react-dom/client"

import { createBrowserRouter, RouterProvider } from "react-router-dom"

import Root from "./routes/root"
import ErrorPage from "./error-page"
import Home from "./routes/home.jsx"
import Selector from "./routes/selector"
import Resources, { loader as resourcesLoader } from "./routes/resources"
import Feedback, { action as feedbackAction } from "./routes/feedback.jsx"
import FeedbackResource, { loader as feedbackResourceLoader } from "./routes/feedback-resource.jsx"

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		errorElement: <ErrorPage />,
		children: [
			{ index: true, element: <Home /> },
			{
				path: "/resources/*",
				element: <Resources />,
				loader: resourcesLoader,
			},
			{
				path: "/fb/resource/*",
				element: <FeedbackResource />,
				loader: feedbackResourceLoader,
			},
			{
				path: "/fb/*",
				element: <Feedback />,
				action: feedbackAction,
			},
			{
				path: "/*",
				element: <Selector />,
			},
		],
	},
])

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
)
