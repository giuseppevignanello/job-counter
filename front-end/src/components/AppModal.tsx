import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux/es/exports";
import { ActionType } from "../state/action-types";
import { useParams } from "react-router-dom";

interface AppModalProps {
    modal: string;
}

const AppModal: React.FC<AppModalProps> = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const apiUrl = "http://127.0.0.1:8000/api/jobs";
    const { id } = useParams<{ id: string }>();

    function closeModal(event: React.FormEvent) {
        event.preventDefault();
        const modal = document.getElementById("overlay");
        modal?.classList.toggle("d-none");
    }

    const handle = async (event: React.FormEvent) => {
        event.preventDefault();

        if (props.modal == "logout") {
            const token = localStorage.getItem("authToken");
            if (token) {
                localStorage.removeItem("authToken");
                delete axios.defaults.headers.common["Authorization"];
                navigate("/");
                window.location.reload();
            }
        } else if (props.modal == "delete") {
            axios
                .delete(`${apiUrl}/${id}`)
                .then((response) => {
                    const message = response.data.message;
                    dispatch({
                        type: ActionType.MESSAGE,
                        payload: message,
                    });
                    navigate("/");
                })
                .catch((error) => {
                    console.error("Error", error);
                });
        }
    };
    return (
        <div id="overlay" className="d-none">
            <div className="logout_modal bg_light p-4">
                <div className="card">
                    <div className="card-header d-flex justify-content-end">
                        <button onClick={closeModal} className="btn btn-danger">
                            x
                        </button>
                    </div>
                    <div className="card-body">
                        <p className="p-5 display-6">
                            Are you sure to {props.modal} ?
                        </p>
                        <form
                            onSubmit={handle}
                            method="post"
                            className="d-flex justify-content-center"
                        >
                            <button className="btn btn-primary">
                                {props.modal}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppModal;
