import React from "react";
import ReactDOM from "react-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./../../css/Calendar.css";

const PropertyListing = () => {
    return (
        <>
            <div className="main-container center">
                Property Listing
                <Calendar
                    locale="en"
                    prev2Label={null}
                    next2Label={null}
                    minDetail="month"
                    selectRange={true}
                />
            </div>
        </>
    );
};

export default PropertyListing;
