import PropertyDescription from "./PropertyDescription";
import DateDifference from "./DateDifference";
import StarIcon from "./svgs/StarIcon";

const ListGroupItem = (props) => {
    const present_date = new Date();

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
                    <h5 className="mb-1">{props.review.user.name}</h5>
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
                                present_date - new Date(props.review.updated_at)
                            }
                        />{" "}
                        ago
                    </small>
                </div>
                <div className="property-review-rating-wrapper">
                    <StarIcon stroke="#222222f0" width="25" height="25" />
                    <span>{props.review.rating}/10</span>
                </div>
                <div className="property-review-description-wrapper">
                    <PropertyDescription descriptionType={props.review} />
                </div>
            </div>
        </div>
    );
};

export default ListGroupItem;
