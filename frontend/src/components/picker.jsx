import PropTypes from "prop-types"
import { useNavigate, Link } from "react-router-dom"

export default function Picker(props) {
	const num = Number(props.num)
	const navigate = useNavigate()
	if (Number.isNaN(num)) {
		throw new Error("Invalid class number or class not found")
	}

	const clickHandler = (e) => {
		const classRequested = e.target.textContent
		navigate(`/resources/${classRequested}`)
	}

	return (
		<div style={{ display: "flex", gap: "1em" }}>
			{(num - 1 !== 0) && (
				<Link to={"/resources/" + (num - 1)} onClick={clickHandler}>
					{num - 1}
				</Link>
			)}
			<span>{num}</span>
			<Link to={"/resources/" + (num + 1)} onClick={clickHandler}>
				{num + 1}
			</Link>
		</div>
	)
}

Picker.propTypes = {
	num: PropTypes.number.isRequired,
}
