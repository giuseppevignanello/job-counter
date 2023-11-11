import React from "react";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
const ComeBackButton = () => {
    const navigate = useNavigate();
    return (
        <Link to={`/`}>
            <button type="button" className="myBtn bg_accent2 text-white">
                <FontAwesomeIcon icon={faArrowLeft} />
            </button>
        </Link>
    );
};

export default ComeBackButton;
