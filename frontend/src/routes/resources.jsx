import { useLoaderData, } from "react-router-dom"

export default function Resources() {
	const resources = useLoaderData()
	if (Array.isArray(resources) && resources.length === 0) {
		return <p>No resources found</p>
	}
	return (
		<div>
			{resources.map((r, i) => (
				<div key={i} style={{ border: "1px solid black", padding: "1em 2em", margin: "1em" }}>
					<p>{r?.resourceRef?.name || r?.resourceRef?.url}</p>
					<p>likes: {r.likes}</p>
					<p>dislikes: {r.dislikes}</p>
				</div>
			))}
		</div>
	)
}

export async function loader({ params }) {
	const { "*": classNumber } = params
	const api = await fetch("http://localhost:8080/resource/" + classNumber)
	const response = await api.json()
	return response
}
