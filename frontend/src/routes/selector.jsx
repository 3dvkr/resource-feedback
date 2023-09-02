import { useParams, Navigate } from "react-router-dom"

function trimUrl(str) {
    if (str.startsWith("http://")) {
        return str.replace("http://", "")
    } else if (str.startsWith("https://")) {
        return str.replace("https://", "")
    } else {
        return str
    }
}

export default function Selector() {
    const {'*': urlOption} = useParams()
    if (Number.isNaN(Number(urlOption))) {
        return <Navigate to={`/fb/${trimUrl(urlOption)}`} />
	} else {
        return <Navigate to={`/resources/${urlOption}`} />
	}

}