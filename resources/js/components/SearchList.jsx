import { Link } from "react-router-dom";
import SearchListPlaceholder from "./SearchListPlaceholder";

const SearchList = (props) => {
    return (
        <div
            className={`list-group position-absolute search-list ${props.className}`}
        >
            {props.items && !props.isLoading ? (
                props.items.length != 0 ? (
                    props.items.map((item, index) => (
                        <Link
                            to={props.localApi ? `/property/${item.id}` : "#"}
                            key={index}
                            className="list-group-item list-group-item-action search-list-item"
                            aria-current="true"
                            onClick={
                                props.localApi
                                    ? () => props.setSearchField("")
                                    : () => {
                                          props.setSearchField(item.text);
                                         
                                      }
                            }
                        >
                            <div className="d-flex w-100 justify-content-between">
                                {props.localApi ? (
                                    <h5 className="mb-1">{item.name}</h5>
                                ) : (
                                    <h5 className="mb-1">{item.text}</h5>
                                )}
                            </div>
                            {props.itemType == "properties" ? (
                                <p className="mb-1">
                                    {item.country}, {item.city}
                                </p>
                            ) : (
                                <></>
                            )}
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
