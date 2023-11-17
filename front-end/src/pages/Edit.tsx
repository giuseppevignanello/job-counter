import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux/es/exports";
import { ActionType } from "../state/action-types";
import { useNavigate } from "react-router-dom";
import ComeBackButton from "../components/ComeBackButton";

const Edit = () => {
    const dispatch = useDispatch();
    const [apiUrl, setApiUrl] = useState<string>(
        "http://127.0.0.1:8000/api/jobs"
    );
    const [apiCategoriesUrl, setApiCategoriesUrl] = useState<string>(
        "http://127.0.0.1:8000/api/categories"
    );

    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    interface Job {
        id: number;
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
        axios
            .get(`${apiUrl}/${id}`)
            .then((response) => {
                const existingData = response.data;

                setFormData(existingData);
            })
            .catch((error) => {
                console.error("Error fetching existing data: ", error);
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

    const [titleError, setTitleError] = useState("");
    const [companyError, setCompanyError] = useState("");
    const [urlError, setUrlError] = useState("");
    const [locationError, setLocationError] = useState("");
    const [categoryError, setCategoryError] = useState("");
    const [descriptionError, setDescriptionError] = useState("");

    function send(e: React.FormEvent) {
        e.preventDefault();

        //validation
        let validator = true;
        //title
        if (FormData.title.length < 3 || FormData.title.length > 50) {
            setTitleError("Title must be between 3 and 50 characters");
            validator = false;
        }
        if (FormData.company.length < 3 || FormData.company.length > 50) {
            setCompanyError("Company must be between 3 and 50 characters");
            validator = false;
        }
        if (FormData.url.length < 3 || FormData.url.length > 150) {
            setUrlError("Url must be between 3 and 150 characters");
            validator = false;
        }
        if (FormData.location.length < 3 || FormData.location.length > 30) {
            setLocationError("Location must be between 3 and 30 characters");
            validator = false;
        }
        if (FormData.category_id == "") {
            setCategoryError("Please select a category");
            validator = false;
        }

        if (FormData.description.length > 500) {
            setDescriptionError(
                "Description must have less than 500 characters"
            );
            validator = false;
        }

        if (validator) {
            axios
                .put(apiUrl, FormData)
                .then((response) => {
                    const message = response.data.message;
                    dispatch({
                        type: ActionType.MESSAGE,
                        payload: message,
                    });
                    navigate("/");
                })
                .catch((error) => {
                    console.error("Error: ", error);
                });
        }
    }

    return (
        <div className="container mt-4">
            <ComeBackButton></ComeBackButton>
            <form onSubmit={send}>
                <div className="mb-3 d-md-flex justify-content-center">
                    <div className="w-50">
                        {/* title */}
                        <div>
                            <label className="target_label my-2">
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
                        <span
                            className={`${
                                titleError ? "d-block" : "d-none"
                            } badge bg-danger w-75`}
                        >
                            {titleError}
                        </span>

                        {/* company */}
                        <div>
                            <label className="target_label my-2">
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
                        <span
                            className={`${
                                companyError ? "d-block" : "d-none"
                            } badge bg-danger w-75`}
                        >
                            {companyError}
                        </span>

                        {/* url */}
                        <div>
                            <label className="target_label my-2">
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
                        <span
                            className={`${
                                urlError ? "d-block" : "d-none"
                            } badge bg-danger w-75`}
                        >
                            {urlError}
                        </span>

                        {/* Location */}
                        <div>
                            <label className="target_label my-2">
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
                        <span
                            className={`${
                                locationError ? "d-block" : "d-none"
                            } badge bg-danger w-75`}
                        >
                            {locationError}
                        </span>

                        {/* category */}
                        <div>
                            <label className="my-2">
                                {"Select a category"}
                            </label>
                            <div className="mb-3">
                                <select
                                    className="form-select w-75 "
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
                        <span
                            className={`${
                                categoryError ? "d-block" : "d-none"
                            } badge bg-danger w-75`}
                        >
                            {categoryError}
                        </span>
                    </div>
                    {/* description */}
                    <div>
                        <label>
                            {"Description"}
                            <textarea
                                className="form-control"
                                name="description"
                                aria-describedby="helpId"
                                rows={15}
                                cols={50}
                                value={FormData.description}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <span
                        className={`${
                            descriptionError ? "d-block" : "d-none"
                        } badge bg-danger w-75`}
                    >
                        {descriptionError}
                    </span>
                </div>
                <button type="submit" className="myBtn bg_accent text-white">
                    Add
                </button>
            </form>
        </div>
    );
};

export default Edit;
