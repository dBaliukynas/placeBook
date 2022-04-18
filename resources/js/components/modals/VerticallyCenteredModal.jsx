const VerticallyCenteredModal = (props) => {
    return (
        <div
            className="modal fade"
            id={props.id}
            tabIndex="-1"
            aria-labelledby={props.id}
            style={{ display: "none" }}
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id={props.id}>
                            {props.title}
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">{props.body}</div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            Close
                        </button>
                        <button
                            type="button"
                            data-bs-dismiss="modal"
                            className={`btn ${props.buttonType} ${
                                props.disabled && "disabled"
                            }`}
                            onClick={props.onClick}
                        >
                            {props.buttonText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerticallyCenteredModal;
