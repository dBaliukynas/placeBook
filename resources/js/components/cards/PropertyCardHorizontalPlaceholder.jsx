const PropertyCardHorizontalPlaceholder = (props) => {
    return (
        <div className="card mb-3" style={{ width: "100%", textAlign: "center"}}>
            <div className="row g-0" style={{height: "100%"}} >
                <div className="col-md-4" style={{ backgroundColor: "#b5b5b5", minHeight: "180px"}}>
                
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title placeholder-glow">
                            <span className="placeholder col-2"></span>
                        </h5>
                        <p className="card-text placeholder-glow">
                            <span className="placeholder col-9"></span>
                            <span className="placeholder col-9"></span>
                            <span className="placeholder col-9"></span>
                            <span className="placeholder col-7"></span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyCardHorizontalPlaceholder;
