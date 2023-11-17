import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

interface RegisterFormProps {
    updateAuthStatus: (newAuthStatus: boolean) => void;
}

interface FormData {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ updateAuthStatus }) => {
    const navigate = useNavigate();
    const registerApiUrl = "http://localhost:8000/api/register";
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [repeatPasswordError, setRepeatPasswordError] = useState("");

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        //validation
        let validator = true;
        if (formData.name.length < 3 || formData.name.length > 25) {
            setNameError("Username must be between 3 and 25 characters");
            validator = false;
        }
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

        if (formData.password != formData.password_confirmation) {
            validator = false;
            setRepeatPasswordError("The two passwords do not match");
        }

        if (validator) {
            axios.post(registerApiUrl, formData).then((response) => {
                const token = response.data.token;
                axios.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${token}`;
                updateAuthStatus(true);
                navigate("/");
            });
        }
    };

    return (
        <div className="wrapper content">
            <div className="container">
                <h2 className="text-center mt-5">Register</h2>
                <form
                    className="w-75 m-auto d-flex flex-column"
                    onSubmit={handleSubmit}
                >
                    <label className="d-flex flex-column">
                        <div className="text-center">Username: </div>
                        <input
                            className="w-75 m-auto"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <div
                        className={`${
                            nameError ? "d-block" : "d-none"
                        } badge bg-danger w-75 m-auto mt-2`}
                    >
                        {nameError}
                    </div>
                    <br />

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
                    <div
                        className={`${
                            passwordError ? "d-block" : "d-none"
                        } badge bg-danger w-75 m-auto mt-2`}
                    >
                        {passwordError}
                    </div>
                    <br />
                    <label className="d-flex flex-column">
                        <div className="text-center">Repeat Password: </div>
                        <input
                            className="w-75 m-auto"
                            type="password"
                            name="password_confirmation"
                            value={formData.password_confirmation}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <div
                        className={`${
                            repeatPasswordError ? "d-block" : "d-none"
                        } badge bg-danger w-75 m-auto mt-2`}
                    >
                        {repeatPasswordError}
                    </div>
                    <br />

                    <button className="btn btn-dark w-75 m-auto" type="submit">
                        Register
                    </button>
                    <span className="mt-3 text-center">
                        Do you already have an account?
                        <Link to={"/login"}>Log in!</Link>
                    </span>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;
