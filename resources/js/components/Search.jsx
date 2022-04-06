import { useState } from "react";
import SearchList from "./SearchList";

const Search = (props) => {
    const handleSearchFieldChange = (event) => {
        setSearchField(event.target.value);
    };
    const [searchField, setSearchField] = useState("");
    return (
        <div className="position-relative navbar-search">
            <form className="d-flex">
                <input
                    className="form-control"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    onChange={handleSearchFieldChange}
                />
            </form>
            {searchField ? <SearchList /> : <></>}
        </div>
    );
};

export default Search;
