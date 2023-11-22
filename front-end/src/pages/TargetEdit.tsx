import ComeBackButton from "../components/ComeBackButton";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
const TargetEdit = () => {
    const apiUrlTarget = "http://127.0.0.1:8000/api/target";

    const [FormData, setFormData] = useState({
        name: "",
        deadline: "",
        motivationalDescription: "",
        target: 0,
    });
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

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

    useEffect(() => {
        axios.get(`${apiUrlTarget}/${id}`).then((response) => {
            const target = response.data;
            setFormData(target);
        });
    }, []);

    function send(e: React.FormEvent) {
        e.preventDefault();
        axios
            .put(`${apiUrlTarget}/${id}`, FormData)
            .then(() => {
                navigate("/");
            })
            .catch((error) => {
                console.error("Error: ", error);
            });
    }
    return (
        <div>
            <div className="mt-3">
                <ComeBackButton destination="/target"></ComeBackButton>
            </div>
            <div className="my-4">
                <h4>Edit "{FormData.name}" target</h4>
                <form onSubmit={send}>
                    <div className="my-3 d-md-flex justify-content-around">
                        <div className="w-50">
                            <div>
                                <label className="target_label mb-3">
                                    {"Name"}
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        aria-describedby="helpId"
                                        value={FormData.name}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>
                            <div>
                                <label className="target_label">
                                    {"MotivationalDescription"}
                                    <textarea
                                        className="form-control"
                                        name="motivationalDescription"
                                        aria-describedby="helpId"
                                        value={FormData.motivationalDescription}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>
                        </div>
                        <div className="w-50">
                            <div>
                                <label className="target_label mb-3">
                                    {"Target"}
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="target"
                                        aria-describedby="helpId"
                                        value={FormData.target}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>
                            <div>
                                <label className="target_label">
                                    {"Deadline"}
                                    <input
                                        type="date"
                                        className="form-control"
                                        name="deadline"
                                        aria-describedby="helpId"
                                        value={FormData.deadline}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="myBtn bg_accent text-white"
                    >
                        Edit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TargetEdit;
