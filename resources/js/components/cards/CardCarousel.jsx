import PropertyCard from "./PropertyCard";
import PropertyCardPlaceholder from "./PropertyCardPlaceholder";
const CardCarousel = (props) => {
    return (
        <>
            <div
                id={`carouselControls${props.id}`}
                className="carousel slide"
                data-bs-ride="carousel"
                data-bs-interval="false"
            >
                <div className="carousel-inner">
                    {Array.from({ length: props.pageCount }, (_, index) => (
                        <div
                            key={index}
                            className={
                                index == 0
                                    ? "carousel-item home-carousel active"
                                    : "carousel-item home-carousel"
                            }
                            style={{ display: "flex" }}
                        >
                            <button
                                className={
                                    index == 0
                                        ? "btn btn-primary home-carousel-button-prev disabled"
                                        : "btn btn-primary home-carousel-button-prev"
                                }
                                type="button"
                                data-bs-target={`#carouselControls${props.id}`}
                                data-bs-slide="prev"
                            >
                                <span
                                    className="carousel-control-prev-icon home-carousel-icon"
                                    aria-hidden="true"
                                ></span>
                                <span className="visually-hidden">
                                    Previous
                                </span>
                            </button>
                            <div
                                style={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    justifyContent: "center",
                                }}
                            >
                                {props.items
                                    ? props.items
                                          .slice(
                                              index * props.itemCount,
                                              index * props.itemCount +
                                                  props.itemCount
                                          )
                                          .map((item, mapIndex) => (
                                              <PropertyCard
                                                  key={mapIndex}
                                                  image_path={item.image_path}
                                                  item={item}
                                                  isProperty={props.isProperty}
                                              />
                                          ))
                                    : Array.from(
                                          { length: props.itemCount },
                                          (_, index) => (
                                              <PropertyCardPlaceholder
                                                  key={index}
                                              />
                                          )
                                      )}
                            </div>
                            <button
                                className={
                                    index == props.pageCount - 1
                                        ? "btn btn-primary home-carousel-button-next disabled"
                                        : "btn btn-primary home-carousel-button-next"
                                }
                                type="button"
                                data-bs-target={`#carouselControls${props.id}`}
                                data-bs-slide="next"
                            >
                                <span
                                    className="carousel-control-next-icon home-carousel-icon"
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
