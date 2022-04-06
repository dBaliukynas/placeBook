import { useState, useEffect, useRef } from "react";
import defaultFetchOptions from "../components/DefaultFetchOptions";
import SearchList from "./SearchList";

const Search = (props) => {
    const [searchField, setSearchField] = useState("");

    const abortController = useRef();

    useEffect(() => {
        if (abortController.current) {
            abortController.current.abort();
        }
        abortController.current = new AbortController();
        const { signal } = abortController.current;

        setIsLoading(true);
        const debounce = setTimeout(() => {
            fetch("/api/properties/search", {
                signal,
                method: "POST",
                ...defaultFetchOptions,
                body: JSON.stringify(searchField),
            }).then((response) =>
                response.json().then((data) => {
                    setProperties(data);
                    setIsLoading(false);
                })
            ).catch(error => {});
        }, 350);

        return () => clearTimeout(debounce);
    }, [abortController, searchField]);

    const handleSearchFieldChange = (event) => {
        setSearchField(event.target.value);
    };

    const [properties, setProperties] = useState("");
    const [isLoading, setIsLoading] = useState(true);
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
            {searchField ? (
                <SearchList properties={properties} isLoading={isLoading} />
            ) : (
                <></>
            )}
        </div>
    );
};

export default Search;
