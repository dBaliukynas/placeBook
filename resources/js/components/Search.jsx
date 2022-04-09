import { useState, useEffect, useRef } from "react";
import defaultFetchOptions from "../components/DefaultFetchOptions";
import SearchList from "./SearchList";

const Search = (props) => {
    const [searchField, setSearchField] = useState("");

    const abortController = useRef();

    useEffect(() => {
        if (searchField) {
            if (abortController.current) {
                abortController.current.abort();
            }
            abortController.current = new AbortController();
            const { signal } = abortController.current;

            setIsLoading(true);
            const debounce = setTimeout(() => {
                fetch(props.route + `?search=${searchField}`, {
                    signal,
                    method: "GET",
                })
                    .then((response) =>
                        response.json().then((data) => {
                            setItems(data);
                            setIsLoading(false);
                        })
                    )
                    .catch((error) => {});
            }, 350);

            return () => clearTimeout(debounce);
        }
    }, [abortController, searchField]);

    const handleSearchFieldChange = (event) => {
        setSearchField(event.target.value);
    };

    const [items, setItems] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    return (
        <div className="position-relative navbar-search">
            <form className="d-flex">
                <input
                    className={props.className}
                    type={props.type}
                    placeholder={props.placeholder}
                    aria-label={props.ariaLabel}
                    onChange={handleSearchFieldChange}
                    value={searchField}
                />
            </form>
            {searchField ? (
                <SearchList
                    items={items}
                    itemType={props.itemType}
                    isLoading={isLoading}
                    className={props.listClassName}
                    setSearchField={setSearchField}
                />
            ) : (
                <></>
            )}
        </div>
    );
};

export default Search;
