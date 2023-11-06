import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux/es/exports";
import { actions } from "../state/actions/index";
import { ActionType } from "../state/action-types";

interface Job {
    id: number;
    time: string;
    title: string;
    company: string;
    category_id: number;
}

interface Category {
    id: number;
    name: string;
}

const AppMain = () => {
    const [apiUrl, setApiUrl] = useState<string>(
        "http://127.0.0.1:8000/api/jobs"
    );
    const [apiUrlCategories, setApiUrlCategories] = useState<string>(
        "http://127.0.0.1:8000/api/categories"
    );

    const [jobs, setJobs] = useState<Job[]>([]);
    const [categories, setCategories] = useState<Job[]>([]);

    const dispatch = useDispatch();

    function formatDate(timeString: string) {
        const date = new Date(timeString);
        const options = { day: "numeric", month: "short" };
        return date.toLocaleDateString(undefined, options);
    }

    type CategorizedJobs = Record<string, Job[]>;

    useEffect(() => {
        axios
            .get(apiUrl)
            .then((response) => {
                const fetchedJobs = response.data;
                setJobs(fetchedJobs);
            })
            .catch((error) => {
                console.error("Error", error);
            });

        dispatch({
            type: ActionType.JOBS,
            payload: jobs,
        });

        axios.get(apiUrlCategories).then((response) => {
            const fetchedCategories = response.data;
            setCategories(fetchedCategories);
        });
    }, [apiUrl]);

    const categorizedJobs: CategorizedJobs = {};
    categories.forEach((category) => {
        categorizedJobs[category.name] = jobs.filter(
            (job) => job.category_id === category.id
        );
    });

    dispatch({
        type: ActionType.CATEGORIZEDJOBS,
        payload: categorizedJobs,
    });

    return (
        <div className="container">
            <div
                className="row row-cols-sm-1 row-cols-md-3
       justify-content-between mt-3"
            >
                {Object.keys(categorizedJobs).map((categoryName) => (
                    <div className="box mt-3" key={categoryName}>
                        <h4 className="text-center box_title">
                            {categoryName}
                        </h4>
                        <ul className="list-unstyled box-content">
                            {categorizedJobs[categoryName].map((job, index) => (
                                <Link
                                    className="text-dark text-decoration-none"
                                    to={`/job_detail/${job.id}`}
                                    key={job.id}
                                >
                                    <li className="box_item d-flex justify-content-between">
                                        <div>
                                            <p className="job_title">
                                                {job.title}
                                            </p>
                                            <span className="job_company">
                                                {job.company}
                                            </span>
                                        </div>
                                        <div className="d-flex align-items-end">
                                            <p>{formatDate(job.time)}</p>
                                        </div>
                                    </li>
                                </Link>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AppMain;
