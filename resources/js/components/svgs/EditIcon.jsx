const EditIcon = (props) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#c79044c4"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            role={props.role}
            className={props.className}
            onClick={props.onClick}
        >
            <path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path>
            <polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon>
        </svg>
    );
};

export default EditIcon;
