import React from "react";
import HomeCard from "../components/HomeCard";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <>
            <div className="top-main-container">
                <div style={{ textAlign: "center", marginTop: "30px" }}>
                    <h1>Browse places to rent...</h1>
                    <h2>or lease them </h2>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <div
                        className="card"
                        style={{
                            borderTopRightRadius: "unset",
                            borderBottomRightRadius: "unset",
                        }}
                    >
                        <div
                            className="card-body"
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                textAlign: "center",
                            }}
                        >
                            <div>
                                <h5 className="card-title">Search property</h5>
                                <p className="card-text">
                                    Search a property to rent!
                                </p>
                                <Link
                                    to="/property-search"
                                    className="btn btn-primary"
                                    style={{ marginTop: "12px" }}
                                >
                                    Search
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div
                        className="card"
                        style={{
                            borderLeft: "unset",
                            borderTopLeftRadius: "unset",
                            borderBottomLeftRadius: "unset",
                        }}
                    >
                        <div
                            className="card-body"
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                textAlign: "center",
                            }}
                        >
                            <div>
                                <h5 className="card-title">Lease property</h5>
                                <p className="card-text">
                                    List a property that you want to lease!
                                </p>
                                <Link
                                    to="/property-listing"
                                    className="btn btn-primary"
                                    style={{ marginTop: "12px" }}
                                >
                                    Create listing
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="main-container">
                <h3>Select a place by group</h3>
                <div className="card-wrapper">
                    <HomeCard
                        cityName="Hotels"
                        image="https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                    ></HomeCard>
                </div>

                <h3>Select a place by your country's city</h3>
                <div className="card-wrapper">
                    <HomeCard
                        cityName="Vilnius"
                        image="https://live.staticflickr.com/8893/28373394686_b917ff36a0_b.jpg"
                    ></HomeCard>
                </div>
                <h3>Our users favorite places</h3>
                <div className="card-wrapper">
                    <HomeCard
                        cityName="Druskininkai"
                        image="https://exp.cdn-hotels.com/hotels/2000000/1590000/1580700/1580698/44869fc9_z.jpg?impolicy=fcrop&w=500&h=333&q=medium"
                        favoriteProperty="Europa Royale"
                        rating={9}
                    ></HomeCard>
                </div>
            </div>
        </>
    );
};

export default Home;
