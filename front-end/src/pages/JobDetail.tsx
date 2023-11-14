import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux/es/exports";
import { ActionType } from "../state/action-types";
import { useParams } from "react-router-dom";
import ComeBackButton from "../components/ComeBackButton";

interface Job {
    id: number;
    sendOrSave: boolean;
    title: string;
    company: string;
    descriprion: string;
    url: string;
    location: string;
}

const JobDetail = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const apiUrl = "http://127.0.0.1:8000/api/jobs";

    const [job, setJob] = useState<Job>(Object);
    const { id } = useParams<{ id: string }>();

    //Delete Method
    function destroy() {
        axios
            .delete(`${apiUrl}/${id}`)
            .then((response) => {
                const message = response.data.message;
                dispatch({
                    type: ActionType.MESSAGE,
                    payload: message,
                });
                navigate("/");
            })
            .catch((error) => {
                console.error("Error", error);
            });
    }

    useEffect(() => {
        axios
            .get(`${apiUrl}/${id}`)
            .then((response) => {
                const job = response.data;
                setJob(job);
            })
            .catch((error) => {
                console.error("Error", error);
            });
    }, [apiUrl]);

    return (
        <div className="container mt-2">
            <ComeBackButton></ComeBackButton>
            <div className="card w-50 m-auto p-3">
                <h3>{job.title}</h3>
                <p>{job.company}</p>
                <p>
                    {job.description} <br />
                    {job.location}
                </p>

                <a href={job.url} target="_blank">
                    Link
                </a>
            </div>
            <div className="buttons d-flex gap-3 justify-content-center mt-3">
                <Link to={`/edit/${id}`}>
                    <button
                        type="button"
                        className="myBtn bg_accent text-white"
                    >
                        Edit
                    </button>
                </Link>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={destroy}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default JobDetail;
