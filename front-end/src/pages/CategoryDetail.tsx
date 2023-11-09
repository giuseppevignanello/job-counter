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
            {filteredJobs.length > 0 ? (
                <div className="mb-4">
                    {filteredJobs.map((job) => (
                        <div className="box" key={job.id}>
                            {job.title} - {job.company}
                        </div>
                    ))}
                </div>
            ) : (
                <p> {category?.name} is empty</p>
            )}
        </div>
    );
};

export default CategoryDetail;
