import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

interface ComeBackButtonProps {
    destination: string;
}

const ComeBackButton: React.FC<ComeBackButtonProps> = (props) => {
    return (
        <Link to={props.destination}>
            <button type="button" className="myBtn bg_accent2 text-white">
                <FontAwesomeIcon icon={faArrowLeft} />
            </button>
        </Link>
    );
};

export default ComeBackButton;
