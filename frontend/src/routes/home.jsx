import { Link } from "react-router-dom"
export default function Main() {
	const url = "recco.cyclic.cloud"
	return (
		<div className="info">
			<p className="description">
				<span className="emph">Async learning is hard.</span> Crowdsource the
				resources you need with past, current, and future students.
			</p>
			<h2>Find a resource</h2>
			<p>Find resources you need based on where you are in your course:</p>
			<p className="font-code">
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

			<h2>Pay it forward</h2>
			<p>
				Add feedback on a resource{" "}<Link to={"/fb"}>with a form</Link>, or using your address bar: <span className="font-code">
					https://
					<span style={{ background: "yellow", padding: "0 0.25em" }}>
						{url}/
					</span>
					{"<url>"}
				</span>.
			</p>
			<p>
				e.g.{" "}
				<span className="font-code">
					https://
					<span style={{ background: "yellow", padding: "0 0.25em" }}>
						{url}/
					</span>
					{"www.google.com"}
				</span>
			</p>
		</div>
	)
}
