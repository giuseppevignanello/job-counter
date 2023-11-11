import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux/es/exports";
import { ActionType } from "../state/action-types";
import CategoryDetail from "../pages/CategoryDetail";
import { useSelector } from "react-redux";
import { State } from "../state";

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
    //state
    const state = useSelector((state: State) => state.search);
    const dispatch = useDispatch();

    //apiURL
    const [apiUrl, setApiUrl] = useState<string>("http://127.0.0.1:8000/api");

    //jobs and categories
    const [jobs, setJobs] = useState<Job[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);

    type CategorizedJobs = Record<string, Job[]>;

    useEffect(() => {
        axios
            .get(`${apiUrl}/jobs`)
            .then((response) => {
                const fetchedJobs = response.data;
                setJobs(fetchedJobs);
            })
            .catch((error) => {
                console.error("Error", error);
            });
    }, [apiUrl]);

    //get the categories
    useEffect(() => {
        axios.get(`${apiUrl}/categories`).then((response) => {
            const fetchedCategories = response.data;
            setCategories(fetchedCategories);
        });
    }, [`${apiUrl}/categories`]);

    //putting the jobs into each category
    const categorizedJobs: CategorizedJobs = {};
    categories.forEach((category) => {
        //search function
        if (state.search) {
            categorizedJobs[category.name] = jobs.filter(
                (job) =>
                    job.category_id === category.id &&
                    (job.title
                        .toLowerCase()
                        .includes(state.search.toLowerCase()) ||
                        job.company
                            .toLowerCase()
                            .includes(state.search.toLowerCase()))
            );
        } else {
            categorizedJobs[category.name] = jobs.filter(
                (job) => job.category_id === category.id
            );
        }
    });

    //store jobs (all and by category)
    useEffect(() => {
        dispatch({
            type: ActionType.JOBS,
            payload: jobs,
        });

        dispatch({
            type: ActionType.CATEGORIZEDJOBS,
            payload: categorizedJobs,
        });
    });

    //Format Date
    function formatDate(timeString: string) {
        const date = new Date(timeString);
        return date.toLocaleDateString(undefined);
    }

    return (
        <div className="container">
            <div className="grid-container">
                {Object.keys(categorizedJobs).map(
                    (categoryName, categoryId) => (
                        <div
                            key={categoryName}
                            className={`box ${
                                categoryId === 1
                                    ? "applied"
                                    : categoryId === 1
                                    ? "left"
                                    : "right"
                            }`}
                        >
                            <Link
                                className="text-black text-decoration-none"
                                to={`/category_detail/${categoryId + 1}`}
                                key={categoryId + 1}
                            >
                                <h4 className="text-center box_title bg_main py-2 p-1">
                                    {categoryName}
                                </h4>
                            </Link>
                            <div>
                                <ul className="list-unstyled box-content px-2">
                                    {categorizedJobs[categoryName].map(
                                        (job, index) => (
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
                                                        <p>
                                                            {formatDate(
                                                                job.time
                                                            )}
                                                        </p>
                                                    </div>
                                                </li>
                                            </Link>
                                        )
                                    )}
                                </ul>
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default AppMain;
