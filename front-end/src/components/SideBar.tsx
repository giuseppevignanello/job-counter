import React from "react";
import { useSelector } from "react-redux";

import { State } from "../state";

const SideBar = () => {
    const state = useSelector((state: State) => state.counter);

    return (
        <div className="d-none d-md-flex sidebar">
            <div>Total: {state.jobs.length} </div>
            <div>Applied: {state.categorizedJobs.Applied.length} </div>
            <div>Interview: {state.categorizedJobs.Interview.length} </div>
            <div>Offer: {state.categorizedJobs.Offer.length} </div>
            <div>Refused: {state.categorizedJobs.Refused.length}</div>
        </div>
    );
};

export default SideBar;
