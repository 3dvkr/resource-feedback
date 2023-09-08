import { Outlet, Link } from "react-router-dom"
import "../styles.css"

export default function Root() {
	return (
		<div className="container">
			<header>
				<nav>
					<Link className="btn" to="/">Home</Link>
				</nav>
			</header>
			<main>
				<Outlet />
			</main>
			<footer>Please note this app is being developed and tested.</footer>
		</div>
	)
}
