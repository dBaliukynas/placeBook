import { useEffect, useState } from "react";
import PropertyDescription from "../PropertyDescription";
import DateDifference from "../DateDifference";
import StarIcon from "../svgs/StarIcon";
import EditIcon from "../svgs/EditIcon";
import TrashIcon from "../svgs/TrashIcon";
import defaultFetchOptions from "../DefaultFetchOptions";
import VerticallyCenteredModal from "../modals/VerticallyCenteredModal";
import { toast } from "react-toastify";
import ReviewCreation from "../ReviewCreation";
import CloseIcon from "../svgs/CloseIcon";

const ListGroupItem = (props) => {
    useEffect(() => console.log(props.review));
    const deleteReview = () => {
        const toastId = toast("Deleting a review...", { isLoading: true });
        fetch(`/api/review/${props.review.id}`, {
            method: "DELETE",
            ...defaultFetchOptions,
        })
            .then((response) => {
                if (!response.ok) {
                } else {
                    return response.json();
                }
            })
            .then(() => {
                toast.update(toastId, {
                    render: "Review has been successfully deleted.",
                    type: "success",
                    autoClose: 5000,
                    isLoading: false,
                });
            });
    };
    const presentDate = new Date();
    const [isBeingEdited, setIsBeingEdited] = useState(false);

    return (
        <div style={{ width: "100%" }}>
            <div
                className="list-group-item"
                aria-current="true"
                style={{
                    marginBottom: "20px",
                    borderTopWidth: "1px",
                }}
            >
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">
                        {props.review.user ? (
                            props.review.user.name
                        ) : (
                            <span>
                                [<i>deleted user</i>]
                            </span>
                        )}
                    </h5>
                    <div className="position-relative">
                        <small
                            title={new Date(
                                props.review.updated_at
                            ).toLocaleDateString("en-CA", {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                                weekday: "long",
                                hour: "2-digit",
                                hour12: false,
                                minute: "2-digit",
                                second: "2-digit",
                            })}
                        >
                            Last updated:{" "}
                            <DateDifference
                                dateDifference={
                                    presentDate -
                                    new Date(props.review.updated_at)
                                }
                            />{" "}
                            ago
                        </small>
                        {(authUser.id == props.review.author_id ||
                            authUser.role == "admin") && (
                            <div>
                                <TrashIcon
                                    role="button"
                                    className="trash-icon-red review-list-item"
                                    dataBsToggle="modal"
                                    dataBsTarget="#deleteReviewModal"
                                />

                                {!isBeingEdited ? (
                                    <EditIcon
                                        role="button"
                                        className="edit-icon-sand review-list-item"
                                        onClick={() =>
                                            setIsBeingEdited(!isBeingEdited)
                                        }
                                    />
                                ) : (
                                    <CloseIcon
                                        role="button"
                                        className="edit-icon-sand review-list-item"
                                        onClick={() =>
                                            setIsBeingEdited(!isBeingEdited)
                                        }
                                    />
                                )}
                            </div>
                        )}
                    </div>
                </div>
                <div
                    className="property-review-rating-wrapper"
                    style={{ marginBottom: "10px" }}
                >
                    <StarIcon stroke="#222222f0" width="25" height="25" />
                    <span>{props.review.rating}/10</span>
                </div>
                {!isBeingEdited ? (
                    <div className="property-review-description-wrapper">
                        <PropertyDescription
                            descriptionType={props.review}
                            className="review"
                        />
                    </div>
                ) : (
                    <ReviewCreation isBeingEdited={isBeingEdited} review={props.review} />
                )}
            </div>

            <VerticallyCenteredModal
                id="deleteReviewModal"
                buttonText="Delete"
                title="Delete review"
                buttonType="btn-danger"
                onClick={deleteReview}
                body={
                    <>
                        <p>Are you sure you want to delete this review?</p>
                    </>
                }
            />
        </div>
    );
};

export default ListGroupItem;
