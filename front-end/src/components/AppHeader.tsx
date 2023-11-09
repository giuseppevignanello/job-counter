import React, { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux/es/exports";
import { ActionType } from "../state/action-types";

const AppHeader = () => {
    const dispatch = useDispatch();
    function search(e: React.ChangeEvent<HTMLInputElement>): void {
        const searchText = e.target.value;

        dispatch({
            type: ActionType.SEARCH,
            payload: searchText,
        });
    }

    return (
        <div>
            <header className="appHeader d-flex align-items-center justify-content-between bg-light">
                <div>
                    <form>
                        <div className="my-3 ms-2">
                            <div>
                                <input
                                    onChange={search}
                                    type="text"
                                    name=""
                                    className="form-control"
                                    aria-describedby="helpId"
                                    placeholder="Search a job"
                                />
                            </div>
                        </div>
                    </form>
                </div>
                <div className="buttons me-2">
                    <div>
                        <button type="button" className="bg_accent myBtn">
                            <Link
                                className="text-white text-decoration-none"
                                to={`/create`}
                            >
                                Add
                            </Link>
                        </button>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default AppHeader;
