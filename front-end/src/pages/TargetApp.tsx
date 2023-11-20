import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ComeBackButton from "../components/ComeBackButton";
import { State } from "../state";

interface Target {
    id: number;
    name: string;
    target: number;
    motivationalDescription: Text;
    deadline: Date;
}
const TargetApp = () => {
    const apiUrlTarget = "http://127.0.0.1:8000/api/target";
    const apiUrlJobs = "http://127.0.0.1:8000/api/jobs";
    const [jobsCounter, setJobsCounter] = useState<number>(0);
    const [targets, setTargets] = useState<[]>([]);
    const [FormData, setFormData] = useState({
        name: "",
        deadline: "",
        motivationalDescription: "",
        target: 0,
    });
    const navigate = useNavigate();

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
            .post(apiUrlTarget, FormData)
            .then((response) => {
                console.log("Success: ", response.data);
                navigate("/");
            })
            .catch((error) => {
                console.error("Error: ", error);
            });
    }

    useEffect(() => {
        axios
            .get(apiUrlJobs)
            .then((response) => {
                const fetchedJobs = response.data;

                if (fetchedJobs !== null && fetchedJobs !== undefined) {
                    setJobsCounter(fetchedJobs.length);
                } else {
                    console.error("Response data is null or undefined");
                }
            })
            .catch((error) => {
                console.error("Error", error);
            });
    }, [apiUrlJobs]);

    useEffect(() => {
        axios
            .get(apiUrlTarget)
            .then((response) => {
                const fetchedTargets = response.data;
                setTargets(fetchedTargets);
            })
            .catch((error) => {
                console.error("Error", error);
            });
    }, [apiUrlTarget]);

    //Format Date
    const formatDeadline = (date: Date) => {
        const formattedDate = new Date(date);
        const options = { month: "numeric", day: "numeric" };
        return formattedDate.toLocaleDateString(undefined, options);
    };

    return (
        <div className="container mt-4">
            <ComeBackButton></ComeBackButton>

            <div>
                {targets && targets.length > 0 ? (
                    <div className="text-center">
                        {targets.map((target, index) => (
                            <div className="position-relative" key={index}>
                                <div
                                    className={`completed ${
                                        jobsCounter >= target.target
                                            ? ""
                                            : "d-none"
                                    }`}
                                >
                                    <img src="completed.png" alt="" />
                                </div>
                                <div className="card w-50 m-auto p-4 my-3">
                                    <h4>{target.name}</h4>
                                    <span>
                                        {target.motivationalDescription}
                                    </span>{" "}
                                    <span>
                                        {jobsCounter ? jobsCounter : ""}/{" "}
                                        {target.target} 🎯
                                    </span>
                                    <span>
                                        Deadline:{" "}
                                        {formatDeadline(target.deadline)}
                                    </span>
                                    <div className="w-100 border rounded bar">
                                        <div
                                            className="progress"
                                            style={{
                                                width: `${
                                                    jobsCounter >= target.target
                                                        ? 100
                                                        : (jobsCounter /
                                                              target.target) *
                                                          100
                                                }%`,
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>
                        <p>There aren't targets!</p>
                    </div>
                )}
            </div>
            <div className="my-4">
                <h4>Set a new Target</h4>
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
                        Add
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TargetApp;
