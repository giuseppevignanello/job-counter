import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AppModal = () => {
    const navigate = useNavigate();
    function closeLogoutModal(event: React.FormEvent) {
        event.preventDefault();
        const modal = document.getElementById("overlay");
        modal?.classList.toggle("d-none");
    }

    const handleLogout = async (event: React.FormEvent) => {
        event.preventDefault();
        const token = localStorage.getItem("authToken");

        if (token) {
            localStorage.removeItem("authToken");
            delete axios.defaults.headers.common["Authorization"];
            navigate("/");
            window.location.reload();
        }
    };
    return (
        <div id="overlay" className="d-none">
            <div className="logout_modal bg_light p-4">
                <div className="card">
                    <div className="card-header d-flex justify-content-end">
                        <button
                            onClick={closeLogoutModal}
                            className="btn btn-danger"
                        >
                            x
                        </button>
                    </div>
                    <div className="card-body">
                        <p className="p-5 display-6">Are you sure to logout?</p>
                        <form
                            onSubmit={handleLogout}
                            method="post"
                            className="d-flex justify-content-center"
                        >
                            <button className="btn btn-primary">Logout</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppModal;
