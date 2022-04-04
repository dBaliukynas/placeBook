const PropertyReviewCount = (props) => {
    return (
        <span>
            {props.property.review_count ? (
                <>
                    <span>{props.property.review_count} reviews</span>
                </>
            ) : (
                <></>
            )}
        </span>
    );
};

export default PropertyReviewCount;
