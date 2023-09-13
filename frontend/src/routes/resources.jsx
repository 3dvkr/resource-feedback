import { useLoaderData, useParams } from "react-router-dom"

import Picker from "../components/picker"

function resourceHeader(resource) {
	let str = ""
	if (resource) {
		if (resource.name) {
			str += resource.name
		} else {
			str += "Resource"
		}
		if (resource.format) {
			str += " (" + resource.format + ")"
		}
		return str
	} else {
		return null
	}
}

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
					<div key={i} className="card">
						<h2>{resourceHeader(r.resourceRef)}</h2>
						<p>{r?.resourceRef?.url}</p> {/* TODO: remove this line for production */}
						<p>
							<a href={r?.resourceRef?.url}>Link</a>
						</p>
						<p>{r?.resourceRef?.description}{"..."}</p>
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
