import { useLoaderData, useParams } from "react-router-dom"

import Picker from "../components/picker"

export default function Resources() {
	const { "*": classNumber } = useParams()
	const resources = useLoaderData()
	const foundResources = Array.isArray(resources) && resources.length > 0

	return (
		<div>
			<h1>100Devs Resources</h1>
			<Picker num={+classNumber} />
			{foundResources ? (
				resources.map((r, i) => (
					<div
						key={i}
						className="card"
					>
						<p>{r?.resourceRef?.name || r?.resourceRef?.url}</p>
						<p>likes: {r.likes}</p>
						<p>dislikes: {r.dislikes}</p>
					</div>
				))
			) : (
				<p>No resources found</p>
			)}
		</div>
	)
}

export async function loader({ params }) {
	const { "*": classNumber } = params
	const api = await fetch("/api/resource/" + classNumber)
	const response = await api.json()
	return response
}
