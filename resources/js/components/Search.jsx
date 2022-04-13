import { useState, useEffect, useRef } from "react";
import SearchList from "./SearchList";

const Search = (props) => {
    const [searchField, setSearchField] = useState("");
    const [isEnabled, setIsEnabled] = useState(true);
    const [result, setResult] = useState(undefined);

    const abortController = useRef();

    useEffect(() => {
        setResult(undefined);
        setIsEnabled(true);
        if (searchField) {
            if (abortController.current) {
                abortController.current.abort();
            }
            abortController.current = new AbortController();
            const { signal } = abortController.current;

            setIsLoading(true);
            const debounce = setTimeout(() => {
                if (props.localApi) {
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
                } else {
                    fetch(
                        `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchField}.json?access_token=${mapBoxApiKey}&cachebuster=1625641871908&autocomplete=true&types=${props.mapBoxType}`,
                        { method: "GET" }
                    )
                        .then((response) => response.json())
                        .then((data) => {
                            setItems(data.features);
                            setIsLoading(false);
                        });
                }
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
                    value={result ? result : searchField}
                />
            </form>
            {searchField && isEnabled ? (
                <SearchList
                    items={items}
                    itemType={props.itemType}
                    isLoading={isLoading}
                    className={props.listClassName}
                    setSearchField={setSearchField}
                    localApi={props.localApi}
                    isEnabled={isEnabled}
                    setIsEnabled={setIsEnabled}
                    setResult={setResult}
                />
            ) : (
                <></>
            )}
        </div>
    );
};

export default Search;
