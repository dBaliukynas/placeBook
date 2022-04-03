import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand navbar-logo">
                        <svg
                            viewBox="0 0 872 872"
                            height="40"
                            width="40"
                            fill="white"
                        >
                            <g transform="matrix(11.06,0,0,11.06,436.64,436.52)">
                                <path
                                    id="path6"
                                    d="m 50,10.8 c -21.6,0 -39.3,17.6 -39.3,39.3 0,21.7 17.7,39.2 39.3,39.2 10.6,0 20.2,-4.2 27.3,-11.1 0.2,-0.2 0.3,-0.3 0.5,-0.5 C 84.9,70.6 89.2,60.8 89.2,50.1 89.3,28.4 71.6,10.8 50,10.8 Z M 14,50 c 0,-7.5 2.3,-14.5 6.3,-20.3 5.3,0.8 9.9,1.9 13.4,3.5 l -4.2,2.2 c -5.7,3.5 -9,8.8 -7.6,11.2 0.1,0.1 0.2,0.3 0.3,0.4 2.7,-4.2 6,-7.6 9.9,-9.6 -2.7,4.2 -2.7,9.2 -0.5,10.7 0.1,0.1 0.3,0.2 0.4,0.2 1,-3.4 2.3,-6.7 4.2,-9.4 0.2,-0.2 0.4,-0.4 0.5,-0.6 l 0.4,0.4 C 37,48.9 34.8,59.4 32.4,70 28.7,71.2 25.8,73.1 24.5,75.3 18,68.8 14,59.9 14,50 Z M 50,86 C 41.6,86 33.8,83.1 27.6,78.2 h 2.8 10.2 4.1 14.2 13.5 C 66.2,83 58.4,86 50,86 Z M 73.7,77 61.2,75.2 C 59.3,74.9 57.4,74.1 55.9,72.9 54.8,72 53.5,71.3 51.9,70.6 V 56.2 c 0.5,0.1 1.1,0.1 1.6,-0.1 l 0.8,-0.3 c 0.7,-0.2 1.4,-0.2 2,0 l 0.8,0.3 c 0.7,0.2 1.5,0.2 2.2,-0.1 0.7,-0.3 1.6,-0.3 2.3,-0.1 l 1.5,0.5 c 0,-3.7 -5.4,-6.7 -12,-6.7 -6.6,0 -12,3 -12,6.7 l 2.3,-0.7 c 0.6,-0.2 1.2,-0.2 1.8,0 l 1.5,0.4 c 0.6,0.2 1.2,0.2 1.8,0 l 1.6,-0.5 c 0.6,-0.2 1.1,-0.2 1.7,0 l 0.7,0.2 V 70 c -2.7,-0.9 -5.9,-1.4 -9.3,-1.4 -0.9,0 -1.7,0 -2.6,0.1 -0.7,-8.2 -0.3,-19.5 1,-30 1.4,3.1 2.5,6.8 3.5,10.8 1.6,-1.8 1.2,-6.4 -0.9,-11.3 3.2,1.2 6.8,3.1 10.5,5.3 -0.1,-1.8 -2.1,-3.9 -5.1,-5.7 1.8,0.6 3.7,1.5 5.5,2.4 0.1,-0.2 0.1,-0.3 0.1,-0.5 0.4,-2.6 -3,-5.9 -7.7,-7 2.5,-1 5.3,-1.9 8.3,-2.7 -1.6,-1.3 -5.2,-1.2 -9.2,0.2 1.7,-1.5 3.7,-2.8 5.7,-4 C 50.2,26.1 50.1,25.9 50,25.8 47.9,24 42.9,25.4 39.4,29.3 L 39,28.2 c -2.4,-4.7 -6.9,-7.3 -9.4,-6 -0.2,0.1 -0.3,0.2 -0.4,0.3 2.6,2.6 4.9,5.4 6.4,8.4 l -0.4,0.2 C 34,30.5 32.7,29.9 31.3,29.4 27.5,28.1 23.9,27.7 21.4,28.2 28,19.6 38.3,14 50,14 69.8,14 86,30.1 86,50 86,60.8 81.2,70.4 73.7,77 Z"
                                    transform="translate(-49.95,-50.05)"
                                />
                            </g>
                        </svg>
                        <span className="navbar-brand-name">placeBook</span>
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarColor02"
                        aria-controls="navbarColor02"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div
                        className="collapse navbar-collapse"
                        id="navbarColor02"
                    >
                        <ul className="navbar-nav mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to="/" className="nav-link active">
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    Features
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    Pricing
                                </a>
                            </li>
                            <li className="nav-item">
                                <Link to="/about" className="nav-link">
                                    About
                                </Link>
                            </li>
                        </ul>
                        <form className="d-flex navbar-search">
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                            />
                            <button
                                className="btn btn-outline-light"
                                type="submit"
                            >
                                Search
                            </button>
                        </form>
                        <div className="navbar-button-wrapper">
                            {authUser == null ? (
                                <>
                                    <Link
                                        to="/login"
                                        className="btn btn-outline-light login-button"
                                        type="submit"
                                    >
                                        Log in
                                    </Link>

                                    <Link
                                        to="/register"
                                        className="btn btn-outline-light"
                                        type="submit"
                                    >
                                        Register
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <button
                                        type="button"
                                        className="btn btn-outline-light dropdown-toggle navbar-user"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        {authUser.name}
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <Link
                                                to="/profile"
                                                className="dropdown-item"
                                            >
                                                Profile
                                            </Link>
                                        </li>
                                        {authUser.role == "admin" ? (
                                            <li>
                                                <Link
                                                    to="/admin-panel"
                                                    className="dropdown-item"
                                                >
                                                    Admin Panel
                                                </Link>
                                            </li>
                                        ) : (
                                            <></>
                                        )}
                                        <li>
                                            <a
                                                className="dropdown-item"
                                                href="/logout"
                                            >
                                                Log out
                                            </a>
                                        </li>
                                    </ul>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
