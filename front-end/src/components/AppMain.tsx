import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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

    //move panel
    const [openPanel, setOpenPanel] = useState<number | null>(null);

    const handleMoveClick = (jobId: number) => {
        setOpenPanel(openPanel === jobId ? null : jobId);
    };

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

    const navigate = useNavigate();
    //fast update categories
    function update(jobId: number, categoryId: number) {
        axios
            .put(`${apiUrl}/jobs/${jobId}`, categoryId)
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
                                            <li className="box_item d-flex justify-content-between">
                                                <Link
                                                    className="text-dark text-decoration-none "
                                                    to={`/job_detail/${job.id}`}
                                                    key={job.id}
                                                >
                                                    <div>
                                                        <p className="job_title">
                                                            {job.title}
                                                        </p>
                                                        <span className="job_company">
                                                            {job.company}
                                                        </span>
                                                    </div>
                                                </Link>
                                                <div className="d-flex flex-column align-items-end position-relative ">
                                                    <p>
                                                        {formatDate(job.time)}
                                                    </p>
                                                    <div>
                                                        <div
                                                            className={`move_panel ${
                                                                openPanel ===
                                                                job.id
                                                                    ? ""
                                                                    : "d-none"
                                                            }`}
                                                        >
                                                            <ul className="list-unstyled fs-5">
                                                                <li
                                                                    onClick={() =>
                                                                        update(
                                                                            job.id,
                                                                            0
                                                                        )
                                                                    }
                                                                >
                                                                    🤔Saved
                                                                </li>
                                                                <li>
                                                                    🤞Applied
                                                                </li>
                                                                <li>
                                                                    😢Refused
                                                                </li>
                                                                <li>
                                                                    😊 Interview
                                                                </li>
                                                                <li>
                                                                    😍 Offer
                                                                </li>
                                                            </ul>
                                                        </div>

                                                        <button
                                                            type="button"
                                                            className="text-white bg_accent myBtn fs-6"
                                                            onClick={() =>
                                                                handleMoveClick(
                                                                    job.id
                                                                )
                                                            }
                                                        >
                                                            Move
                                                        </button>
                                                    </div>
                                                </div>
                                            </li>
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
