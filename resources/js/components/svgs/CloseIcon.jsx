const CloseIcon = (props) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#c79044c4"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={props.className}
            role={props.role}
            onClick={props.onClick}
        >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
    );
};

export default CloseIcon;
