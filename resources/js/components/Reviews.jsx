import { useState } from "react";
import { Link } from "react-router-dom";
import defaultFetchOptions from "../components/DefaultFetchOptions";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ToastContainer, toast } from "react-toastify";
import "../../css/Reviews.css";

const Reviews = (props) => {
    const handlePropertyReviewChange = (_, editor) => {
        setPropertyReview(editor.getData());
    };
    const [propertyReview, setPropertyReview] = useState("");
    return (
        <div>
            {authUser?.id != props.property?.user_id && authUser != null ? (
                <>
                    <h5 style={{ marginBottom: "15px", textAlign: "left" }}>
                        Leave a review
                    </h5>
                    <CKEditor
                        editor={ClassicEditor}
                        onChange={handlePropertyReviewChange}
                        data={propertyReview}
                        config={{
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
                    <button
                        className="btn btn-primary"
                        style={{ marginTop: "20px", width: "100%" }}
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

            <span>There are currently no reviews about this property.</span>
        </div>
    );
};

export default Reviews;
