import { Link } from "react-router-dom";
import PropertyRating from "./PropertyRating";
import PropertyReviewCount from "./PropertyReviewCount";
import StarIcon from "./svgs/StarIcon";

const PropertyCardHorizontal = (props) => {
    return (
        <div className="card mb-3" style={{ width: "100%"}}>
            <div className="row g-0" style={{height: "inherit"}}>
                <div className="col-md-4" style={{minHeight: "180px"}}>
                    <img
                        style={{ width: "100%", height: "100%" }}
                        src="/images/palm.jpg"
                        className="img-fluid rounded-start"
                        alt="..."
                    />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{props.property.name}</h5>
                        <PropertyRating property={props.property} />
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
