import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

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

    return <div>{job.title}</div>;
};

export default JobDetail;
