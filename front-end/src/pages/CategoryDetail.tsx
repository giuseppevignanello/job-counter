import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
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

const CategoryDetail = () => {
    const state = useSelector((state: State) => state.search);
    const { id } = useParams();
    const [category, setCategory] = useState<Category>();
    const [categoryJobs, setCategoryJobs] = useState<Job[]>([]);

    useEffect(() => {
        axios
            .get(`http://127.0.0.1:8000/api/categories/${id}`)
            .then((response) => {
                setCategory(response.data);
            });

        axios
            .get(`http://127.0.0.1:8000/api/jobs-by-category/${id}`)
            .then((response) => {
                setCategoryJobs(response.data);
            })
            .catch((error) => {
                console.error("Errore nella richiesta API", error);
            });
    }, []);

    const filteredJobs = state
        ? categoryJobs.filter(
              (job) =>
                  job.title
                      .toLowerCase()
                      .includes(state.search.toLowerCase()) ||
                  job.company.toLowerCase().includes(state.search.toLowerCase())
          )
        : categoryJobs;

    function formatDate(timeString: string) {
        const date = new Date(timeString);
        return date.toLocaleDateString(undefined);
    }
    return (
        <div className="container">
            <Link to={`/`}>
                <button
                    type="button"
                    className="myBtn bg_accent2 mt-3 text-white"
                >
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
            </Link>
            <h2 className="mt-4 text-center bg_main py-2">
                {category?.name} Jobs
            </h2>
            <div className="myContainer">
                {filteredJobs.length > 0 ? (
                    <div className="mb-4">
                        {filteredJobs.map((job) => (
                            <Link
                                className="text-dark text-decoration-none"
                                to={`/job_detail/${job.id}`}
                            >
                                <div className="box card my-2" key={job.id}>
                                    <div className="d-flex justify-content-between">
                                        <div>
                                            {job.title} <br />
                                            {job.company}
                                        </div>
                                        <div className="align-self-end">
                                            {formatDate(job.time)}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p> {category?.name} is empty</p>
                )}
            </div>
        </div>
    );
};

export default CategoryDetail;
