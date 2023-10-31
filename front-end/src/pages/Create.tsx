import React, { useState, useEffect } from "react";
import axios from "axios";

const Create = () => {
    const [apiUrl, setApiUrl] = useState<string>(
        "http://127.0.0.1:8000/api/jobs"
    );

    interface Job {
        id: number;
        sendOrSave: boolean;
        time: string;
        title: string;
        company: string;
    }

    const [FormData, setFormData] = useState({
        title: "",
        company: "",
        url: "",
        description: "",
        location: "",
        sendOrSave: false,
        time: new Date().toISOString().slice(0, -5),
    });

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        const { name, value, type } = e.target;
        if (type === "checkbox") {
            const val = (e.target as HTMLInputElement).checked;
            setFormData({
                ...FormData,
                [name]: val,
            });
        } else {
            setFormData({
                ...FormData,
                [name]: value,
            });
        }
    }
    function send(e: React.FormEvent) {
        e.preventDefault();

        axios
            .post(apiUrl, FormData)
            .then((response) => {
                console.log("Success: ", response.data);
            })
            .catch((error) => {
                console.error("Error: ", error);
            });
    }

    return (
        <div className="container mt-4">
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
                    <div className="d-flex gap-2">
                        <label>{"Have you applyied yet?"}</label>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                name="sendOrSave"
                                checked={FormData.sendOrSave}
                                onChange={handleChange}
                            />
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
