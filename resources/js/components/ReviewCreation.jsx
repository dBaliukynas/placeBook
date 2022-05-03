import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import defaultFetchOptions from "./DefaultFetchOptions";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { toast } from "react-toastify";
import "../../css/Reviews.css";
import StarIcon from "./svgs/StarIcon";
import Spinner from "./Spinner";

const ReviewCreation = (props) => {
    const handleReviewDescriptionChange = (_, editor) => {
        const reviewDescription = editor.getData();
        setReviewDescription(reviewDescription);
        if (!reviewDescription.match("^.{1,1000}$")) {
            setErrorReviewDescription(
                "Property description cannot be empty and contain more than 10000 characters."
            );
        } else {
            setErrorReviewDescription("");
        }
    };
    const handleRatingChange = (index) => {
        setSelectedRating(index);
    };
    const createReview = () => {
        const toastId = toast("Creating a review...", { isLoading: true });
        fetch(`/api/property/${props.property.id}/review`, {
            method: "POST",
            ...defaultFetchOptions,
            body: JSON.stringify({
                selectedRating,
                reviewDescription,
            }),
        }).then((response) =>
            response.json().then((data) => {
                if (data.errors) {
                    const errorsArray = Object.values(data.errors);
                    toast.update(toastId, {
                        render: (
                            <>
                                {errorsArray.map((dataError, index) => (
                                    <span key={index}>
                                        {index != 0 && "\n"}• {dataError[0]}{" "}
                                    </span>
                                ))}
                            </>
                        ),
                        type: "error",
                        autoClose:
                            errorsArray.length == 1
                                ? 5000
                                : 4000 * errorsArray.length,
                        isLoading: false,
                        className: "toastify-error",
                    });
                } else {
                    setSelectedRating("");
                    setReviewDescription("");
                    toast.update(toastId, {
                        render: "Review has been successfully posted.",
                        type: "success",
                        autoClose: 5000,
                        isLoading: false,
                    });
                }
            })
        );
    };

    const updateReview = () => {
        const toastId = toast("Updating a review...", { isLoading: true });
        fetch(`/api/review/${props.review.id}`, {
            method: "POST",
            ...defaultFetchOptions,
            body: JSON.stringify({
                selectedRating,
                reviewDescription,
            }),
        }).then((response) =>
            response.json().then((data) => {
                if (data.errors) {
                    const errorsArray = Object.values(data.errors);
                    toast.update(toastId, {
                        render: (
                            <>
                                {errorsArray.map((dataError, index) => (
                                    <span key={index}>
                                        {index != 0 && "\n"}• {dataError[0]}{" "}
                                    </span>
                                ))}
                            </>
                        ),
                        type: "error",
                        autoClose:
                            errorsArray.length == 1
                                ? 5000
                                : 4000 * errorsArray.length,
                        isLoading: false,
                        className: "toastify-error",
                    });
                } else {
                    setSelectedRating("");
                    setReviewDescription("");
                    toast.update(toastId, {
                        render: "Review has been successfully updated.",
                        type: "success",
                        autoClose: 5000,
                        isLoading: false,
                    });
                }
            })
        );
    };

    const [reviewDescription, setReviewDescription] = useState("");
    const [selectedRating, setSelectedRating] = useState("");
    const [errorReviewDescription, setErrorReviewDescription] = useState("");
    const reviewFields = [selectedRating, reviewDescription];
    const errors = [errorReviewDescription];

    useEffect(() => {
        if (props.review) {
            setReviewDescription(props.review.description);
            setSelectedRating(props.review.rating);
        }
    }, [props.review]);

    return props.isBeingEdited || props.property ? (
        <div>
            {authUser?.id != props.property?.author_id && authUser != null ? (
                <>
                    {!props.isBeingEdited && (
                        <h5 style={{ marginBottom: "5px", textAlign: "left" }}>
                            Leave a review
                        </h5>
                    )}
                    <div style={{ display: "flex" }}>
                        <div className="property-review-star-wrapper">
                            {Array.from({ length: 10 }, (_, index) => (
                                <StarIcon
                                    stroke="#222222f0"
                                    width="30"
                                    height="30"
                                    className={
                                        index + 1 == selectedRating
                                            ? "property-review-star-selected"
                                            : "property-review-star"
                                    }
                                    key={index}
                                    onClick={() =>
                                        handleRatingChange(index + 1)
                                    }
                                />
                            )).reverse()}
                        </div>
                    </div>

                    <div
                        className={
                            errorReviewDescription
                                ? "ckeditor-wrapper error"
                                : "ckeditor-wrapper"
                        }
                        style={{ position: "relative" }}
                    >
                        <CKEditor
                            editor={ClassicEditor}
                            onChange={handleReviewDescriptionChange}
                            data={reviewDescription}
                            config={{
                                toolbar: [
                                    "heading",
                                    "bold",
                                    "italic",
                                    "bulletedList",
                                    "numberedList",
                                    "blockQuote",
                                    "undo",
                                    "redo",
                                ],
                                ckfinder: {
                                    uploadUrl: "/api/editor",

                                    image: {
                                        upload: {
                                            types: ["png", "jpeg"],
                                        },
                                    },
                                },
                                mediaEmbed: {
                                    previewsInData: true,
                                },
                            }}
                        />
                    </div>
                    <span
                        className="input-error-message"
                        style={{ display: "flex" }}
                    >
                        {errorReviewDescription}
                    </span>

                    <button
                        className={
                            reviewFields.every(
                                (reviewField) => reviewField != ""
                            ) && errors.every((error) => error == "")
                                ? "btn btn-primary property-review-post-button"
                                : "btn btn-primary property-review-post-button disabled"
                        }
                        style={{ marginTop: "20px", width: "100%" }}
                        onClick={
                            !props.isBeingEdited ? createReview : updateReview
                        }
                    >
                        {!props.isBeingEdited ? (
                            <span>Post</span>
                        ) : (
                            <span>Save</span>
                        )}
                    </button>
                </>
            ) : !authUser ? (
                <div className="property-review-not-logged-in">
                    <span>To leave a review you need to be logged in.</span>

                    <Link
                        className="btn btn-primary property-review-not-logged-in-button"
                        to="/login"
                    >
                        Log in
                    </Link>
                </div>
            ) : (
                <></>
            )}
        </div>
    ) : (
        <Spinner color="text-primary" />
    );
};

export default ReviewCreation;
