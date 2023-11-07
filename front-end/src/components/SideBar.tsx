import React from "react";
import { useSelector } from "react-redux";

import { State } from "../state";

interface Job {
    id: number;
    time: string;
    title: string;
    company: string;
    category_id: number;
}

const SideBar = () => {
    const state = useSelector((state: State) => state.counter);
    return (
        <div className="d-none d-md-flex sidebar">
            <div>Total: {state.jobs ? state.jobs.length : ""}</div>
            <div>
                Applied:{" "}
                {state.categorizedJobs.Applied
                    ? state.categorizedJobs.Applied.length
                    : ""}{" "}
            </div>
            <div>
                Interview:{" "}
                {state.categorizedJobs.Interview
                    ? state.categorizedJobs.Interview.length
                    : ""}{" "}
            </div>
            <div>
                Offer:{" "}
                {state.categorizedJobs.Offer
                    ? state.categorizedJobs.Offer.length
                    : ""}{" "}
            </div>
            <div>
                Refused:{" "}
                {state.categorizedJobs.Refused
                    ? state.categorizedJobs.Refused.length
                    : ""}{" "}
            </div>
        </div>
    );
};

export default SideBar;
