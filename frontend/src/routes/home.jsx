import { Link } from "react-router-dom"
export default function Main() {
	const url = "recco.cyclic.cloud"
	return (
		<div className="info">
			<h2>Find a resource</h2>
			<p>Find resources you need based on where you are in your course:</p>
			<p>
				https://{url}/
				<span style={{ background: "yellow", padding: "0 0.25em" }}>
					class-number
				</span>
			</p>
			<p>
				e.g.{" "}
				<Link to={"/2"}>
					https://{url}/
					<span style={{ background: "yellow", padding: "0 0.25em" }}>2</span>
				</Link>
			</p>

			<h2>Add a resource/feedback</h2>
			<p>
				<span className="emph">Async learning is hard.</span> Crowd-source the
				resources you need with past, current, and future students. 				<Link to={"/fb"}>
					Add feedback for a resource
				</Link>
			</p>
            {/* <p> */}

			{/* </p> */}
			<p>
            e.g. https://
				<span style={{ background: "yellow", padding: "0 0.25em" }}>
					{url}/
				</span>
				{"<url>"}
			</p>

		</div>
	)
}
