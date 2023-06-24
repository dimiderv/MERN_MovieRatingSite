import { Link } from "react-router-dom"

const LinkPage = () => {
    return (
        <section>
            <h1>Links</h1>
            <br />
            <h2>Public</h2>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <br />
            <h2>Private</h2>
            <Link to="/">Home (is going to be login)</Link>
            <Link to="/favorites">favorites</Link>
            <Link to="/auth">Shows movies</Link>
        </section>
    )
}

export default LinkPage
