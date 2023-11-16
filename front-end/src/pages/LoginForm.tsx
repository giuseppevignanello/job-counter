import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";

interface UserData {
    username: string;
    email: string;
    password: string;
}
function LoginForm() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
    };

    return (
        <div className="wrapper content">
            <div className="container">
                <h2 className="text-center mt-5">Login</h2>
                <form
                    className="w-75 m-auto d-flex flex-column"
                    onSubmit={handleSubmit}
                >
                    <label className="d-flex flex-column">
                        <div className="text-center">Username: </div>
                        <input
                            className="w-75 m-auto"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </label>
                    <br />

                    <label className="d-flex flex-column">
                        <div className="text-center">Email: </div>
                        <input
                            className="w-75 m-auto"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>
                    <br />

                    <label className="d-flex flex-column">
                        <div className="text-center">Password: </div>
                        <input
                            className="w-75 m-auto"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                    <br />

                    <button className="btn btn-dark w-75 m-auto" type="submit">
                        Login
                    </button>
                    <span className="mt-3 text-center">
                        Do you not have an account?
                        <Link to={"/"}>Register!.</Link>
                    </span>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;
