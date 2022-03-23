import { useEffect } from "react";

const Pagination = (props) => {
    const pageCount =
        props.itemsLength % props.itemsPerPage == 0
            ? props.itemsLength / props.itemsPerPage
            : props.itemsLength / props.itemsPerPage + 1;

    return (
        <nav aria-label="Page navigation">
            <ul className="pagination" style={{ justifyContent: "center" }}>
                <li
                    className={
                        props.currentPage == 1
                            ? "page-item disabled"
                            : "page-item"
                    }
                >
                    <button
                        className="page-link"
                        onClick={
                            props.currentPage > 1
                                ? () => props.changePage(props.currentPage - 1)
                                : undefined
                        }
                    >
                        Previous
                    </button>
                </li>

                {Array.from({ length: pageCount }, (value, index) => (
                    <li
                        className={
                            props.currentPage == index + 1
                                ? "page-item active"
                                : "page-itme"
                        }
                        key={index + 1}
                    >
                        <button
                            className="page-link"
                            onClick={() => props.changePage(index + 1)}
                        >
                            {index + 1}
                        </button>
                    </li>
                ))}

                <li
                    className={
                        props.currentPage == pageCount
                            ? "page-item disabled"
                            : "page-item"
                    }
                >
                    <button
                        className="page-link"
                        onClick={
                            props.currentPage < pageCount
                                ? () => props.changePage(props.currentPage + 1)
                                : undefined
                        }
                    >
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
