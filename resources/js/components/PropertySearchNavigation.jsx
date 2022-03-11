import { React, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../css/Calendar.css";

const PropertySearchNavigation = (props) => {
    return (
        <div
            className="card"
            style={{
                marginTop: "20px",
                marginBottom: "50px",
            }}
        >
            <div className="card-body" style={{ display: "flex" }}>
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
                    }}
                >
                    <div className="card text-center">
                        <div className="card-body" style={{ height: "272px" }}>
                            <h5 className="card-title">Choose location</h5>
                            <p className="card-text">
                                With supporting text below as a natural lead-in
                                to additional content.
                            </p>
                            <a href="#" className="btn btn-primary">
                                Go somewhere
                            </a>
                        </div>
                    </div>
                    <div className="card text-center">
                        <div className="card-body" style={{ height: "272px" }}>
                            <h5 className="card-title">
                                Select amount of people
                            </h5>
                            <p className="card-text">
                                With supporting text below as a natural lead-in
                                to additional content.
                            </p>
                            <a href="#" className="btn btn-primary">
                                Go somewhere
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
