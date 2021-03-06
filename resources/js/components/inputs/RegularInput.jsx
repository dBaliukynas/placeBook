const RegularInput = (props) => {
    return (
        <input
            className={`form-control ${props.className}`}
            type={props.type}
            placeholder={props.placeholder}
            title={props.title}
            aria-label={props.ariaLabel}
            value={props.value}
        ></input>
    );
};

export default RegularInput;
