import { React, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../css/Calendar.css";

const PropertySearchNavigation = (props) => {
    const isTabletScreen = useMediaQuery({ query: "(max-width: 900px)" });

    return (
        <div
            className="card"
            style={{
                marginTop: "20px",
                marginBottom: "50px",
            }}
        >
            <div className="card-body" style={{ display: "flex", flexWrap: isTabletScreen &&  "wrap" }}>
                <Calendar
                    locale="en"
                    prev2Label={null}
                    next2Label={null}
                    minDetail="month"
                    selectRange={true}
                />
                <div
                    style={{
                        display: "flex",
                        marginLeft: "20px",
                        width: !isTabletScreen ? "50%" : "100%",
                        justifyContent: "center",
                    }}
                >
                    <div
                        className="card text-center"
                        style={{ marginRight: "50px", width: "50%" }}
                    >
                        <div className="card-body" style={{ height: "272px" }}>
                            <h5 className="card-title">Choose location</h5>

                            <a href="#" className="btn btn-primary">
                                Select
                            </a>
                        </div>
                    </div>
                    <div className="card text-center" style={{ width: "50%" }}>
                        <div className="card-body" style={{ height: "272px" }}>
                            <h5 className="card-title">
                                Select amount of people
                            </h5>

                            <a href="#" className="btn btn-primary">
                                Select
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <a
                href="#"
                className="btn btn-primary"
                style={{
                    margin: "0px 16px 16px 16px",
                }}
            >
                Search
            </a>
        </div>
    );
};

export default PropertySearchNavigation;
