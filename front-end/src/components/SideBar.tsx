import React from "react";
import { useSelector } from "react-redux";

import { State } from "../state";

const SideBar = () => {
    const state = useSelector((state: State) => state.counter);

    return (
        <div className="d-none d-md-flex sidebar">
            <div>Total: {state.jobCounter}</div>
            <div>Applied: {state.appliedJobCounter}</div>
            <div>Interview: {state.interviewJobCounter}</div>
            <div>Offer: {state.offerJobCounter}</div>
            <div>Refused: {state.refusedJobCounter}</div>
        </div>
    );
};

export default SideBar;
