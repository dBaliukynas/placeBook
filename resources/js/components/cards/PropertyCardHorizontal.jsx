import { Link } from "react-router-dom";
import PropertyRatingValue from "../PropertyRatingValue";
import PropertyReviewCount from "../PropertyReviewCount";

const PropertyCardHorizontal = (props) => {
    return (
        <div
            className="card mb-3"
            style={{ width: "100%", textAlign: "center" }}
        >
            <div className="row g-0" style={{ height: "inherit" }}>
                <div className="col-md-4" style={{ minHeight: "180px" }}>
                    <img
                        style={{
                            width: "100%",
                            height: "100%",
                            maxHeight: "220px",
                        }}
                        src={
                            props.property.image_path
                                ? `/storage/images/${props.property.image_path}`
                                : "/images/property_image_placeholder.jpg"
                        }
                        className="img-fluid rounded-start"
                        alt="..."
                    />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{props.property.name}</h5>
                        <PropertyRatingValue property={props.property} />
                        <PropertyReviewCount property={props.property} />

                        <p className="card-text">
                            This is a wider card with supporting text below as a
                            natural lead-in to additional content. This content
                            is a little bit longer.
                        </p>

                        <Link
                            to={`/property/${props.property.id}`}
                            className="btn btn-primary"
                        >
                            Visit
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyCardHorizontal;
