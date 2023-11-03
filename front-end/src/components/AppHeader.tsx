import React from "react";
import { Link } from "react-router-dom";

const AppHeader = () => {
    return (
        <div>
            <header className="appHeader d-flex align-items-center justify-content-between bg-light">
                <div></div>
                <div className="buttons me-2">
                    <div>
                        <button type="button" className="btn-primary btn">
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
