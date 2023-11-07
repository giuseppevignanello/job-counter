import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";

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
    return (
        <div className="container">
            <Link to={`/`}>
                <button type="button" className="btn btn-secondary mt-3">
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
            </Link>
            <h2 className="mt-4 text-center bg_main py-2">
                {category?.name} Jobs
            </h2>
            {categoryJobs.length > 0 ? (
                <div className="mb-4">
                    {categoryJobs.map((job) => (
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
