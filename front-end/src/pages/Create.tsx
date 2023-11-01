import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Create = () => {
    const [apiUrl, setApiUrl] = useState<string>(
        "http://127.0.0.1:8000/api/jobs"
    );
    const [apiCategoriesUrl, setApiCategoriesUrl] = useState<string>(
        "http://127.0.0.1:8000/api/categories"
    );

    const navigate = useNavigate();

    interface Job {
        id: number;
        sendOrSave: boolean;
        time: string;
        title: string;
        company: string;
    }

    interface Category {
        id: number;
        name: string;
    }

    const [categories, setCategories] = useState<Category[]>([]);

    const [FormData, setFormData] = useState({
        title: "",
        company: "",
        url: "",
        description: "",
        location: "",
        category_id: "",
        time: new Date().toISOString().slice(0, -5),
    });

    useEffect(() => {
        axios
            .get(apiCategoriesUrl)
            .then((response) => {
                const categories = response.data;
                setCategories(categories);
            })
            .catch((error) => {
                console.error("Error: ", error);
            });
    }, []);

    function handleChange(
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) {
        const { name, value } = e.target;

        setFormData({
            ...FormData,
            [name]: value,
        });
    }
    function send(e: React.FormEvent) {
        e.preventDefault();
        console.log(FormData);

        axios
            .post(apiUrl, FormData)
            .then((response) => {
                console.log("Success: ", response.data);
                navigate("/");
            })
            .catch((error) => {
                console.error("Error: ", error);
            });
    }

    return (
        <div className="container mt-4">
            <Link to={`/`}>
                <button type="button" className="btn btn-secondary">
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
            </Link>
            <form onSubmit={send}>
                <div className="mb-3">
                    <div>
                        <label>
                            {"Title"}
                            <input
                                type="text"
                                className="form-control"
                                name="title"
                                aria-describedby="helpId"
                                value={FormData.title}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            {"Company"}
                            <input
                                type="text"
                                className="form-control"
                                name="company"
                                aria-describedby="helpId"
                                value={FormData.company}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            {"Url"}
                            <input
                                type="text"
                                className="form-control"
                                name="url"
                                aria-describedby="helpId"
                                value={FormData.url}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            {"Description"}
                            <textarea
                                className="form-control"
                                name="description"
                                aria-describedby="helpId"
                                value={FormData.description}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            {"Location"}
                            <input
                                type="text"
                                className="form-control"
                                name="location"
                                aria-describedby="helpId"
                                value={FormData.location}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div>
                        <label>{"Select a category"}</label>
                        <div className="mb-3">
                            <select
                                className="form-select w-50"
                                name="category_id"
                                value={FormData.category_id}
                                onChange={handleChange}
                            >
                                <option value="">Select a category</option>
                                {categories.map((category) => (
                                    <option
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">
                    Add
                </button>
            </form>
        </div>
    );
};

export default Create;
