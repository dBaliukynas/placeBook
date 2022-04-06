import { useState } from "react";
import defaultFetchOptions from "../components/DefaultFetchOptions";
import SearchList from "./SearchList";

const Search = (props) => {
    const handleSearchFieldChange = (event) => {
        setProperties("");
        setSearchField(event.target.value);

        fetch("/api/properties/search", {
            method: "POST",
            ...defaultFetchOptions,
            body: JSON.stringify(event.target.value),
        }).then((response) =>
            response.json().then((data) => {
                setProperties(data);
            })
        );
    };
    const [searchField, setSearchField] = useState("");
    const [properties, setProperties] = useState("");
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
            {searchField ? <SearchList properties={properties} /> : <></>}
        </div>
    );
};

export default Search;
