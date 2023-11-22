import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux/es/exports";
import { ActionType } from "../state/action-types";
import { useSelector } from "react-redux";
import { State } from "../state";
import AppModal from "../components/AppModal";

//interfaces
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
    //general
    const dispatch = useDispatch();

    //state: search, message
    const search = useSelector((state: State) => state.search);
    const messageObject = useSelector((state: State) => state.message);
    const [message, setMessage] = useState<string>(messageObject.message);

    //hide message
    setTimeout(() => {
        setMessage("");
    }, 3000);

    //dispatch

    //apiURL
    const apiUrl: string = "http://127.0.0.1:8000/api";

    //jobs and categories
    const [jobs, setJobs] = useState<Job[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);

    type CategorizedJobs = Record<string, Job[]>;

    //get all the jobs
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
        if (search.search) {
            categorizedJobs[category.name] = jobs.filter(
                (job) =>
                    job.category_id === category.id &&
                    (job.title
                        .toLowerCase()
                        .includes(search.search.toLowerCase()) ||
                        job.company
                            .toLowerCase()
                            .includes(search.search.toLowerCase()))
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
        <div className="container-fluid">
            <AppModal modal="logout"></AppModal>
            <div>
                {message && (
                    <div className="alert alert-info" role="alert">
                        <strong>
                            <i className="fa-solid fa-thumbs-up"></i>
                        </strong>{" "}
                        {message}
                    </div>
                )}
            </div>
            <div className="grid-container">
                {Object.keys(categorizedJobs).map(
                    (categoryName, categoryId) => (
                        <div
                            //set "applied" box full height
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
                                        (job) => (
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
