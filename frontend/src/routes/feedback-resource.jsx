import { useLoaderData } from "react-router-dom"

export default function Feedback() {
	const resourceFeedback = useLoaderData()

	return (
		<div>
			<p>{resourceFeedback.name}</p>
			<p>{resourceFeedback.url}</p>
			{resourceFeedback.feedback.map((fb, i) => (
				<div key={i} style={{border: "1px solid black", padding:"1em 2em", marginBottom: "1em"}}>
					<p>Class number: {fb.classNum}</p>
					<p>Likes: {fb.likes}</p>
					<p>Dislikes: {fb.dislikes}</p>
				</div>
			))}
		</div>
	)
}

export async function loader({ params }) {
	const { "*": resourceUrl } = params
	const api = await fetch("/api/feedback/" + resourceUrl)
	const response = await api.json()
	console.log("feedback: ", { response })
	return response
}
