import { useState } from "react"
import { useParams, Form, redirect } from "react-router-dom"

export default function Feedback() {
	const { "*": resourceUrl } = useParams()
	const [text, setText] = useState(resourceUrl || "")

	return (
		<Form method="post">
			<label htmlFor="resourceUrl" className="choice-panel">
				Resource Url
			</label>
			<input
				type="url"
				name="resourceUrl"
				id="resourceUrl"
				value={text}
				onChange={(e) => setText(e.target.value)}
			/>
			<label htmlFor="classNumber" className="choice-panel">
				Class
			</label>
			<input
				type="number"
				name="classNumber"
				id="classNumber"
				min="0"
				max="70"
			/>
			<div className="full-grid-span choice-panel">
				<div className="choice-panel-option">
					<input id="goodClass" name="classRating" type="radio" value="1" />
					<label htmlFor="goodClass">👍</label>
				</div>
				<div className="choice-panel-option">
					<input id="badClass" name="classRating" type="radio" value="" />
					<label htmlFor="badClass">👎</label>
				</div>
			</div>
			<div className="full-grid-span choice-panel">
				<button className="btn">Submit</button>
			</div>
		</Form>
	)
}

export async function action({ request }) {
	let formData = await request.formData()
	const url = formData.get("resourceUrl"),
		classNumber = formData.get("classNumber"),
		classRating = formData.get("classRating")

	const submitBody = {
		url,
		classNumber,
		classRating,
	}
	const response = await fetch("/api/resource/", {
		method: "POST",
		body: JSON.stringify(submitBody),
		headers: {
			"Content-Type": "application/json",
		},
	})
	if (!response.ok) {
		throw { message: "Could not save feedback", status: 500 }
	}
	return redirect("/" + submitBody.classNumber)
}
