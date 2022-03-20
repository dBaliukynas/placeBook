import React from "react";
import { useMediaQuery } from "react-responsive";

const HomeCard = (props) => {
    const isMobileScreen = useMediaQuery({ query: "(min-width: 650px)" });

    return (
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
            {props.propertyTypes.map((propertyType, index) => (
                <div
                    key={index}
                    className={
                        isMobileScreen
                            ? "card property"
                            : "card property no-margin-right"
                    }
                    style={{ width: "18rem" }}
                >
                    <img
                        src={propertyType.imagePath}
                        className="card-img-top"
                        alt="..."
                    />
                    <div className="card-body">
                        <h5 className="card-title">{propertyType.cityName}</h5>

                        <p className="card-text">
                            Some quick example text to build on the card title
                            and make up the bulk of the card's content.
                        </p>
                        <a href="#" className="btn btn-primary">
                            Go somewhere
                        </a>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default HomeCard;
