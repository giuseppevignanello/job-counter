import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
interface LoginFormProps {
    updateAuthStatus: (newAuthStatus: boolean) => void;
}
interface FormData {
    email: string;
    password: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ updateAuthStatus }) => {
    const navigate = useNavigate();
    const loginApiUrl = "http://localhost:8000/api/login";
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        let validator = true;

        //email validation
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailPattern.test(formData.email)) {
            validator = false;
            setEmailError("Please insert a valid mail");
        }

        //password validation
        const passwordPattern =
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!?']).{8,}$/;

        if (!passwordPattern.test(formData.password)) {
            validator = false;
            setPasswordError(
                "Your password should be at least 8 characters and must include at least one UpperCase, one number and one special character"
            );
        }

        if (validator) {
            axios.post(loginApiUrl, formData).then((response) => {
                const token = response.data.token;
                localStorage.setItem("authToken", token);
                axios.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${token}`;
                updateAuthStatus(true);
                navigate("/");
            });
        }
    };

    return (
        <div className="wrapper content w_md_50 m-auto">
            <h2 className="text-center mt-5">Login</h2>
            <form className="d-flex flex-column" onSubmit={handleSubmit}>
                <label className="d-flex flex-column">
                    <div className="text-center">Email: </div>
                    <input
                        className="w-75 m-auto"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <div
                    className={`${
                        emailError ? "d-block" : "d-none"
                    } badge bg-danger w-75 m-auto mt-2`}
                >
                    {emailError}
                </div>
                <br />

                <label className="d-flex flex-column">
                    <div className="text-center">Password: </div>
                    <input
                        className="w-75 m-auto"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <br />
                <div
                    className={`${
                        passwordError ? "d-block" : "d-none"
                    } badge bg-danger w-75 m-auto mt-2`}
                >
                    {passwordError}
                </div>

                <button className="btn btn-dark w-75 m-auto" type="submit">
                    Login
                </button>
                <span className="mt-3 text-center">
                    Do you not have an account?
                    <Link to={"/"}>Register!.</Link>
                </span>
            </form>
        </div>
    );
};

export default LoginForm;
