import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Job {
    id: number;
    sendOrSave: boolean;
    title: string;
    company: string;
    descriprion: string;
}

const JobDetail = () => {
    const [apiUrl, setApiUrl] = useState<string>(
        "http://127.0.0.1:8000/api/jobs"
    );
    const [job, setJob] = useState<Job>(Object);
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    function destroy() {
        axios
            .delete(`${apiUrl}/${id}`)
            .then(() => {
                console.log("Element removed");
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
        <div>
            <Link to={`/`}>
                <button type="button" className="btn btn-secondary">
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
            </Link>
            {job.title}
            <Link to={`/edit/${id}`}>
                <button type="button" className="btn btn-secondary">
                    Edit
                </button>
            </Link>
            <button type="button" className="btn btn-danger" onClick={destroy}>
                Delete
            </button>
        </div>
    );
};

export default JobDetail;
