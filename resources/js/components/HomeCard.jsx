import React from "react";

const HomeCard = (props) => {
    const cityName = props.cityName;
    const image = props.image;
    const favoriteProperty = props.favoriteProperty;
    const rating = props.rating;
    return [...Array(5)].map((e, i) => (
        <div key={i} className="card" style={{ width: "18rem" }}>
            <img src={image} className="card-img-top" alt="..." />
            <div className="card-body">
                {favoriteProperty != null ? (
                    <>
                        <h5 style={{ margin: "unset" }}>{favoriteProperty}</h5>
                        <span>{cityName}</span>
                        <br />
                        <span>{rating}/10</span>
                    </>
                ) : (
                    <h5 className="card-title">{cityName}</h5>
                )}

                <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                </p>
                <a href="#" className="btn btn-primary">
                    Go somewhere
                </a>
            </div>
        </div>
    ));
};

export default HomeCard;
