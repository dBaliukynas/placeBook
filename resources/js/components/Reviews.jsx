import { useState } from "react";
import { Link } from "react-router-dom";
import defaultFetchOptions from "../components/DefaultFetchOptions";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ToastContainer, toast } from "react-toastify";
import "../../css/Reviews.css";
import StarIcon from "../components/svgs/StarIcon";
import Spinner from "./Spinner";
import PropertyDescription from "./PropertyDescription";

const Reviews = (props) => {
    const handleReviewDescriptionChange = (_, editor) => {
        setReviewDescription(editor.getData());
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
                    toast.update(toastId, {
                        render: <span>• {data.errors.join("\n• ")}</span>,
                        type: "error",
                        autoClose:
                            data.errors.length == 1
                                ? 5000
                                : 4000 * data.errors.length,
                        isLoading: false,
                        className: "toastify-error",
                    });
                } else {
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
    const [reviewDescription, setReviewDescription] = useState("");
    const [selectedRating, setSelectedRating] = useState(undefined);
    return props.property ? (
        <div>
            {authUser?.id != props.property?.author_id && authUser != null ? (
                <>
                    <h5 style={{ marginBottom: "5px", textAlign: "left" }}>
                        Leave a review
                    </h5>
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
                        className="ckeditor-wrapper error"
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

                    <button
                        className="btn btn-primary"
                        style={{ marginTop: "20px", width: "100%" }}
                        onClick={createReview}
                    >
                        Post
                    </button>
                </>
            ) : authUser == null ? (
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

            {props.property.review_count ? (
                <>{props.property.review_count}</>
            ) : (
                <span>There are currently no reviews about this property.</span>
            )}
            {/* <PropertyDescription descriptionType={review}/> */}
        </div>
    ) : (
        <Spinner color={"text-primary"} />
    );
};

export default Reviews;
