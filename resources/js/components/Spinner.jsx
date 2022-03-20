const Spinner = (props) => {
    return (
        <div
            className={`spinner-border ${props.color}`}
            style={{ margin: "auto" }}
            role="status"
        >
            <span className="visually-hidden">Loading...</span>
        </div>
    );
};

export default Spinner;
