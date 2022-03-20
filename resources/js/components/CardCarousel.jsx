import HomeCard from "./HomeCard";
const CardCarousel = (props) => {
    return (
        <>
            <div
                id={`carouselExampleControls${props.id}`}
                className="carousel slide"
                data-bs-ride="carousel"
                data-bs-interval="false"
            >
                <div className="carousel-inner">
                    {props.propertyTypesMatrix.map((propertyTypes, index) => (
                        <div
                            key={index}
                            style={{ alignItems: "center" }}
                            className={
                                index == 0
                                    ? "carousel-item home-carousel active center-horizontally"
                                    : "carousel-item home-carousel  center-horizontally"
                            }
                        >
                            <button
                                className="carousel-control-prev home-carousel"
                                type="button"
                                data-bs-target={`#carouselExampleControls${props.id}`}
                                data-bs-slide="prev"
                            >
                                <span
                                    className="carousel-control-prev-icon"
                                    aria-hidden="true"
                                ></span>
                                <span className="visually-hidden">
                                    Previous
                                </span>
                            </button>
                            <HomeCard propertyTypes={propertyTypes} />
                            <button
                                className="carousel-control-next home-carousel"
                                type="button"
                                data-bs-target={`#carouselExampleControls${props.id}`}
                                data-bs-slide="next"
                            >
                                <span
                                    className="carousel-control-next-icon"
                                    aria-hidden="true"
                                ></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default CardCarousel;
