import { useState } from "react";
import Pagination from "../Pagination";
import Spinner from "../Spinner";
import ListGroupItem from "./ListGroupItem";

const ReviewListGroup = (props) => {
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastItem = currentPage * props.itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - props.itemsPerPage;

    const currentReviews = props.reviews?.slice(
        indexOfFirstItem,
        indexOfLastItem
    );

    const changePage = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    return (
        <div className="col-sm-6">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Newest ratings</h5>
                    {currentReviews ? (
                        <Pagination
                            itemsLength={props.reviews.length}
                            itemsPerPage={props.itemsPerPage}
                            changePage={changePage}
                            currentPage={currentPage}
                            maxPagesShown={props.maxPagesShown}
                            className="admin-panel-users-table"
                        />
                    ) : (
                        <></>
                    )}
                    {currentReviews ? (
                        currentReviews.length == 0 ? (
                            <span>There are currently no reviews.</span>
                        ) : (
                            currentReviews.map((review, index) => (
                                <div key={index}>
                                    <ListGroupItem review={review} />
                                </div>
                            ))
                        )
                    ) : (
                        <Spinner color="text-primary" />
                    )}
                </div>
            </div>
        </div>
    );
};
export default ReviewListGroup;
