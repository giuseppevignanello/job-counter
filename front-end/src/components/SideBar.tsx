import React from "react";
import { useSelector } from "react-redux";

import { State } from "../state";

const SideBar = () => {
    const state = useSelector((state: State) => state.counter);

    return (
        <div className="sidebar">
            <div className="p-2 mt-5">
                <div>Total: {state.jobCounter}</div>
                <div>Applied: {state.appliedJobCounter}</div>
                <div>Interview: {state.interviewJobCounter}</div>
                <div>Offer: {state.offerJobCounter}</div>
                <div>Refused: {state.refusedJobCounter}</div>
            </div>
        </div>
    );
};

export default SideBar;
