import React, { useEffect, useState } from "react";

const Pagination = (props) => {
    useEffect(() => {
        if (pageCount >= props.maxPagesShown + 2) {
            if (
                props.maxPagesShown % 2 == 0
                    ? props.currentPage >=
                          props.maxPagesShown -
                              Math.floor(props.maxPagesShown / 2) +
                              2 &&
                      !(
                          props.currentPage >=
                          pageCount -
                              (props.maxPagesShown -
                                  Math.floor(props.maxPagesShown / 2))
                      )
                    : props.currentPage >=
                          props.maxPagesShown -
                              Math.floor(props.maxPagesShown / 2) +
                              1 &&
                      !(
                          props.currentPage >=
                          pageCount -
                              (props.maxPagesShown -
                                  Math.floor(props.maxPagesShown / 2))
                      )
            ) {
                const pagesMiddle = Array.from(
                    { length: props.maxPagesShown - 2 },
                    (_, index) =>
                        index +
                        props.currentPage -
                        Math.floor((props.maxPagesShown - 2) / 2)
                );
                setCurrentPages([1, dots, ...pagesMiddle, dots, pageCount]);
            } else if (
                props.currentPage >=
                pageCount -
                    (props.maxPagesShown - Math.floor(props.maxPagesShown / 2))
            ) {
                const pagesEnd = Array.from(
                    { length: props.maxPagesShown },
                    (_, index) => index + pageCount - props.maxPagesShown + 1
                );
                setCurrentPages([1, dots, ...pagesEnd]);
            } else {
                setCurrentPages([...pageNumbers, dots, pageCount]);
            }
        }
    }, [props.currentPage]);
    const handlePageChange = (event) => {
        const pageIndex = parseInt(event.target.value);
        if (!event.target.value) {
            return;
        }
        if (event.target.value < 1) {
            return;
        }
        if (pageIndex > pageCount) {
            props.changePage(pageCount);
            return;
        }

        props.changePage(pageIndex);
    };
    const pageCount =
        props.itemsLength % props.itemsPerPage == 0
            ? Math.floor(props.itemsLength / props.itemsPerPage)
            : Math.floor(props.itemsLength / props.itemsPerPage + 1);

    const pageNumbers =
        pageCount < props.maxPagesShown + 2
            ? Array.from({ length: pageCount }, (_, index) => index + 1)
            : Array.from(
                  { length: props.maxPagesShown },
                  (_, index) => index + 1
              );
    const dots = "...";
    const [currentPages, setCurrentPages] =
        pageCount >= props.maxPagesShown + 2
            ? useState([...pageNumbers, "...", pageCount])
            : useState([...pageNumbers]);

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
                                ? () => {
                                      props.changePage(props.currentPage - 1);
                                  }
                                : undefined
                        }
                    >
                        Previous
                    </button>
                </li>

                {currentPages.map((currentPage, index) => (
                    <React.Fragment key={index}>
                        {
                            <li
                                className={
                                    props.currentPage == currentPage
                                        ? currentPage == dots
                                            ? "page-item disabled"
                                            : "page-item active"
                                        : currentPage == dots
                                        ? "page-item disabled"
                                        : "page-item"
                                }
                            >
                                <button
                                    className="page-link"
                                    onClick={() =>
                                        props.changePage(currentPage)
                                    }
                                >
                                    {currentPage}
                                </button>
                            </li>
                        }
                        {
                            <li className="page-item">
                                <div className="btn-group dropup">
                                    <ul className="dropdown-menu">
                                        {
                                            <li>
                                                <input
                                                    min={1}
                                                    max={pageCount}
                                                    type="number"
                                                    placeholder="Select page"
                                                    className="form-control"
                                                    onChange={handlePageChange}
                                                />
                                            </li>
                                        }
                                    </ul>
                                </div>
                            </li>
                        }
                    </React.Fragment>
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
                                ? () => {
                                      props.changePage(props.currentPage + 1);
                                  }
                                : undefined
                        }
                    >
                        Next
                    </button>
                </li>
                <li className="page-item">
                    <button
                        className="page-link"
                        style={{ marginLeft: "10px" }}
                        onClick={undefined}
                    >
                        Select page
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
