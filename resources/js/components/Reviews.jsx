import { useState } from "react";
import defaultFetchOptions from "../components/DefaultFetchOptions";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ToastContainer, toast } from "react-toastify";

const Reviews = (props) => {
    const handlePropertyReviewChange = (_, editor) => {
        setPropertyReview(editor.getData());
    };
    const [propertyReview, setPropertyReview] = useState("");
    return (
        <div>
            <div style={{ marginBottom: "15px", textAlign: "left" }}>
                <h5>Leave a review</h5>
            </div>
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
            <span>There are currently no reviews about this property.</span>
        </div>
    );
};

export default Reviews;
