import { Link } from "react-router-dom";
import SearchListPlaceholder from "./SearchListPlaceholder";
import Spinner from "./Spinner";

const SearchList = (props) => {
    return (
        <div className="list-group position-absolute search-list">
            {props.properties ? (
                props.properties.map((property, index) => (
                    <Link
                        key={index}
                        to={`property/${property.id}`}
                        className="list-group-item list-group-item-action search-list-item"
                        aria-current="true"
                    >
                        <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1">{property.name}</h5>
                        </div>
                        <p className="mb-1">
                            {property.country}, {property.city}
                        </p>
                    </Link>
                ))
            ) : (
                <SearchListPlaceholder />
            )}
        </div>
    );
};

export default SearchList;
