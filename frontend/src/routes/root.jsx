import { Outlet } from "react-router-dom"

export default function Root() {
	return (
		<div>
			<header>
				<nav>
                    <p>nav</p>
				</nav>
			</header>
			<main>
				<Outlet />
			</main>
			<footer>footer</footer>
		</div>
	)
}
