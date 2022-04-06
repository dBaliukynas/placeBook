import Spinner from "./Spinner";

const SearchListPlaceholder = (props) => {
    return Array.from({ length: 5 }, (_, index) => (
        <div
            key={index}
            className="list-group-item list-group-item-action search-list-item"
            aria-current="true"
        >
            <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1 placeholder-glow w-100">
                    {" "}
                    <span className="placeholder col-6 w-100"></span>
                </h5>
            </div>
            <p className="mb-1 placeholder-glow w-100">  <span className="placeholder col-4 w-50"></span></p>
        </div>
    ));
};

export default SearchListPlaceholder;
