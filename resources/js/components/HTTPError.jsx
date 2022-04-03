import LogoIcon from "./svgs/LogoIcon";

const HTTPError = (props) => {
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
            <LogoIcon />
            <h1>{props.status}</h1>
            <h2>{props.message}</h2>
        </div>
    );
};

export default HTTPError;
