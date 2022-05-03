import { useState, useEffect } from "react";
import Spinner from "./Spinner";
import ListGroupItem from "./lists/ListGroupItem";
import ReviewCreation from "./ReviewCreation";
import "../../css/Reviews.css";

const ReviewsContainer = (props) => {
    useEffect(() => {
        if (props.property) {
            fetch(`/api/property/${props.property.id}/reviews`, {
                method: "GET",
            })
                .then((response) => {
                    if (!response.ok) {
                    } else {
                        return response.json();
                    }
                })
                .then((data) => {
                    if (data) {
                        setReviews(data);
                    }
                });
        }
    }, [props.property]);

    const [reviews, setReviews] = useState(undefined);
    return props.property ? (
        <div>
            <ReviewCreation property={props.property} />
            {reviews ? (
                reviews.length == 0 ? (
                    <span>
                        There are currently no reviews about this property.
                    </span>
                ) : (
                    reviews.map((review, index) => (
                        <div key={index}>
                            <ListGroupItem review={review} />
                        </div>
                    ))
                )
            ) : (
                <Spinner color="text-primary" />
            )}
        </div>
    ) : (
        <Spinner color="text-primary" />
    );
};

export default ReviewsContainer;
