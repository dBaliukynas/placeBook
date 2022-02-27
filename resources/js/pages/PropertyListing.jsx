import React from "react";
import ReactDOM from "react-dom";

const PropertyListing = () => {
    return (
        <div className="content-wrapper">
            <div className="main-container">Property Listing</div>
            <div className="calendar-wrap">
                <table id="calendar">
                    <thead>
                        <tr>
                            <th>Sun</th>
                            <th>Mon</th>
                            <th>Tue</th>
                            <th>Wed</th>
                            <th>Thu</th>
                            <th>Fri</th>
                            <th>Sat</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td id="disabled" className=""></td>
                            <td id="disabled" className=""></td>
                            <td id="" className="">
                                1
                            </td>
                            <td id="" className="">
                                2
                            </td>
                            <td id="" className="selected">
                                3
                            </td>
                            <td id="" className="">
                                4
                            </td>
                            <td id="" className="">
                                5
                            </td>
                        </tr>
                        <tr>
                            <td id="" className="">
                                6
                            </td>
                            <td id="" className="">
                                7
                            </td>
                            <td id="" className="">
                                8
                            </td>
                            <td id="" className="">
                                9
                            </td>
                            <td id="" className="">
                                10
                            </td>
                            <td id="" className="">
                                11
                            </td>
                            <td id="" className="">
                                12
                            </td>
                        </tr>
                        <tr>
                            <td id="" className="">
                                13
                            </td>
                            <td id="" className="">
                                14
                            </td>
                            <td id="" className="">
                                15
                            </td>
                            <td id="" className="">
                                16
                            </td>
                            <td id="" className="">
                                17
                            </td>
                            <td id="" className="">
                                18
                            </td>
                            <td id="" className="">
                                19
                            </td>
                        </tr>
                        <tr>
                            <td id="" className="">
                                20
                            </td>
                            <td id="" className="">
                                21
                            </td>
                            <td id="" className="">
                                22
                            </td>
                            <td id="" className="">
                                23
                            </td>
                            <td id="" className="">
                                24
                            </td>
                            <td id="" className="">
                                25
                            </td>
                            <td id="" className="">
                                26
                            </td>
                        </tr>
                        <tr>
                            <td id="today" className="">
                                27
                            </td>
                            <td id="" className="">
                                28
                            </td>
                            <td id="disabled" className=""></td>
                            <td id="disabled" className=""></td>
                            <td id="disabled" className=""></td>
                            <td id="disabled" className=""></td>
                            <td id="disabled" className=""></td>
                        </tr>
                        <tr>
                            <td id="disabled" className=""></td>
                            <td id="disabled" className=""></td>
                            <td id="disabled" className=""></td>
                            <td id="disabled" className=""></td>
                            <td id="disabled" className=""></td>
                            <td id="disabled" className=""></td>
                            <td id="disabled" className=""></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PropertyListing;
