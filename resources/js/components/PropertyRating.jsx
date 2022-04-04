import StarIcon from "./svgs/StarIcon";

const PropertyRating = (props) => {
    return (
        <strong>
            {props.property.rating ? (
                <div className="property-card-star-wrapper">
                    <StarIcon stroke="#222222f0" width="25" height="25" />

                    <span>{props.property.rating}/10</span>
                </div>
            ) : (
                <div className="property-card-star-wrapper">
                    <StarIcon stroke="#222222f0" width="25" height="25" />
                    <span
                        style={{
                            marginBottom: "25px",
                        }}
                    >
                        Not rated yet
                    </span>
                </div>
            )}
        </strong>
    );
};

export default PropertyRating;
