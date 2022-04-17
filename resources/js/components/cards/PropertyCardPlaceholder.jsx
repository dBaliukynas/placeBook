const PropertyCardPlaceholder = (props) => {
    return (
        <div className="card property" aria-hidden="true">
            <div 
                style={{
                    backgroundColor: "#b5b5b5",
                    width: "300px",
                    height: "180px",
                }}
            ></div>

            <div className="card-body">
                <div className="h5 card-title placeholder-glow">
                    <span className="placeholder col-6"></span>
                </div>
                <p className="card-text placeholder-glow">
                    <span className="placeholder col-4"></span>
                    <span className="placeholder col-8"></span>
                    <span className="placeholder col-4"></span>
                    <span className="placeholder col-8"></span>
                    <span className="placeholder col-8"></span>
                    <span className="placeholder col-4"></span>
                </p>
                <a
                    href="#"
                    tabIndex="-1"
                    className="btn btn-primary disabled placeholder col-6"
                    style={{ width: "55.91px" }}
                ></a>
            </div>
        </div>
    );
};

export default PropertyCardPlaceholder;
