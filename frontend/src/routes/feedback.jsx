import { useParams, Form, redirect } from "react-router-dom"

export default function Feedback() {
	const { "*": resourceUrl } = useParams()
	return (
		<Form method="post">
			<label htmlFor="resourceUrl">Class Number</label>
			<input
				type="text"
				name="resourceUrl"
				id="resourceUrl"
				value={resourceUrl}
			/>
			<label htmlFor="classNumber">Class</label>
			<input
				type="number"
				name="classNumber"
				id="classNumber"
				min="0"
				max="70"
			/>
			<div>
				<div>
					<input id="goodClass" name="classRating" type="radio" value="1" />
					<label htmlFor="goodClass">👍</label>
				</div>
				<div>
					<input id="badClass" name="classRating" type="radio" value="" />
					<label htmlFor="badClass">👎</label>
				</div>
			</div>
			<button>Submit</button>
		</Form>
	)
}

export async function action({ request }) {
	let formData = await request.formData()
	const submitBody = {
		url: formData.get("resourceUrl"),
		classNumber: formData.get("classNumber"),
		classRating: formData.get("classRating"),
	}
	const response = await fetch("http://localhost:8080/resource/", {
		method: "POST",
		body: JSON.stringify(submitBody),
		headers: {
			"Content-Type": "application/json",
		},
	})
	if (!response.ok) {
		throw { message: "could not save feedback", status: 500 }
	} 
	return redirect("/" + submitBody.classNumber)
}
