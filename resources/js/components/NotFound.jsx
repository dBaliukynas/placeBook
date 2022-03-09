import Logo from "./Logo";

const NotFound = (props) => {
    return (
        <div
            className="main-container"
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                marginTop: "20px",
            }}
        >
            <Logo />
            <h1>{props.status}</h1>
            <h2>{props.message}</h2>
        </div>
    );
};

export default NotFound;
