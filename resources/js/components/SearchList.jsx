import { Link } from "react-router-dom";
import SearchListPlaceholder from "./SearchListPlaceholder";

const SearchList = (props) => {
    return (
        <div className="list-group position-absolute search-list">
            {props.properties && !props.isLoading ? (
                props.properties.length != 0 ? (
                    props.properties.map((property, index) => (
                        <Link
                            to={`property/${property.id}`}
                            key={index}
                            className="list-group-item list-group-item-action search-list-item"
                            aria-current="true"
                            onClick={() => props.setSearchField("")}
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
                    <div
                        className="list-group-item search-list-item"
                        aria-current="true"
                    >
                        <p className="mb-1">No results found.</p>
                    </div>
                )
            ) : (
                <SearchListPlaceholder />
            )}
        </div>
    );
};

export default SearchList;
