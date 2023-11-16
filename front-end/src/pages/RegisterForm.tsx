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

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        axios.post(registerApiUrl, formData).then(() => {
            updateAuthStatus(true);
            navigate("/");
        });
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
