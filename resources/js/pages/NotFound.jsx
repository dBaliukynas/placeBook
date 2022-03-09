import Logo from "../components/Logo";

const NotFound = () => {
    return (
        <div
            className="main-container"
            style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
            }}
        >
            <Logo />
            <h1>Not found</h1>
        </div>
    );
};

export default NotFound;
