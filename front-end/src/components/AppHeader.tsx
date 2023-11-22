import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux/es/exports";
import { ActionType } from "../state/action-types";

const AppHeader = () => {
    //general
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //search function
    function search(e: React.ChangeEvent<HTMLInputElement>): void {
        const searchText = e.target.value;

        dispatch({
            type: ActionType.SEARCH,
            payload: searchText,
        });
    }

    //handle logout removing the token from local storage

    function openLogoutModal(event: React.FormEvent) {
        event.preventDefault();
        const modal = document.getElementById("overlay");
        modal?.classList.toggle("d-none");
    }

    return (
        <div>
            <header className="appHeader bg-light">
                <div className="container">
                    <div className="d-flex align-items-center justify-content-around">
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
                            <div className="d-flex gap-2">
                                <button
                                    type="button"
                                    className="bg_accent myBtn"
                                >
                                    <Link
                                        className="text-white text-decoration-none"
                                        to={`/create`}
                                    >
                                        Add
                                    </Link>
                                </button>

                                <button
                                    onClick={openLogoutModal}
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default AppHeader;
