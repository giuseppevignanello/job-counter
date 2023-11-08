import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TargetApp = () => {
    return (
        <div>
            <div className="container">
                <Link to={`/`}>
                    <button type="button" className="btn btn-secondary mt-3">
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default TargetApp;
