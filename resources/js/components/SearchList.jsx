const SearchList = (props) => {
    return (
        <div className="list-group position-absolute search-list">
            <a
                href="#"
                className="list-group-item list-group-item-action search-list-item"
                aria-current="true"
            >
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">Property name</h5>
                </div>
                <p className="mb-1">Property location.</p>
            </a>
            <a
                href="#"
                className="list-group-item list-group-item-action search-list-item"
            >
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">Property name</h5>
                </div>
                <p className="mb-1">Property location.</p>
            </a>
            <a
                href="#"
                className="list-group-item list-group-item-action search-list-item"
            >
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">Property name</h5>
                </div>
                <p className="mb-1">Property location.</p>
            </a>
        </div>
    );
};

export default SearchList;
