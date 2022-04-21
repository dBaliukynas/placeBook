import { useState } from "react";
import VerticallyCenteredModal from "../modals/VerticallyCenteredModal";
import defaultFetchOptions from "../DefaultFetchOptions";
import { toast } from "react-toastify";

const UserCreation = (props) => {
    const handleNameChange = (event) => {
        const name = event.target.value;
        validateName(name);
        setName(event.target.value);
    };

    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };

    const handleEmailChange = (event) => {
        const email = event.target.value;
        validateEmail(email);
        setEmail(event.target.value);
    };

    const validateName = (name) => {
        if (!name.match("^.{0,100}$") || !name) {
            setErrorName(
                "Name cannot be empty and contain more than 100 characters."
            );
        } else {
            setErrorName("");
        }
    };
    const validateEmail = (email) => {
        if (!email.match(/^\S+@\S+\.\S+$/)) {
            setErrorEmail("Email is not correct.");
        } else {
            setErrorEmail("");
        }
    };

    const createUser = () => {
        if (userFields.every((userField) => userField != "")) {
            const toastId = toast("Creating a user...", { isLoading: true });

            fetch("/api/user", {
                method: "POST",
                ...defaultFetchOptions,
                body: JSON.stringify({
                    name,
                    email,
                    role,
                }),
            }).then((response) =>
                response.json().then((data) => {
                    if (data.errors) {
                        const errorsArray = Object.values(data.errors);
                        toast.update(toastId, {
                            render: (
                                <>
                                    {errorsArray.map((dataError, index) => (
                                        <span key={index}>
                                            {index != 0 && "\n"}• {dataError[0]}{" "}
                                        </span>
                                    ))}
                                </>
                            ),
                            type: "error",
                            autoClose:
                                errorsArray.length == 1
                                    ? 5000
                                    : 4000 * errorsArray.length,
                            isLoading: false,
                            className: "toastify-error",
                        });
                    } else {
                        setName("");
                        setEmail("");
                        setRole("regular");
                        toast.update(toastId, {
                            render: "User has been successfully created.",
                            type: "success",
                            autoClose: 5000,
                            isLoading: false,
                        });
                    }
                })
            );
        }
    };

    const [email, setEmail] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [name, setName] = useState("");
    const [errorName, setErrorName] = useState("");
    const [role, setRole] = useState("regular");
    const [errorRole, setErrorRole] = useState("");

    const userFields = [name, email, role];
    const errors = [errorEmail, errorName, errorRole];

    return (
        <VerticallyCenteredModal
            id="createUserModal"
            buttonText="Create"
            title="Create user"
            buttonType="btn-primary"
            onClick={createUser}
            disabled={
                !(
                    userFields.every((userField) => userField != "") &&
                    errors.every((error) => error == "")
                )
            }
            body={
                <>
                    <form className="user-create-form">
                        <label className="form-label" htmlFor="userNameInput">
                            Name
                        </label>
                        <input
                            className={
                                errorName
                                    ? "form-control input-error"
                                    : "form-control"
                            }
                            type="text"
                            aria-label="user name"
                            id="userNameInput"
                            value={name}
                            onChange={handleNameChange}
                        />
                        <span className="input-error-message">{errorName}</span>
                        <label
                            className="form-label"
                            htmlFor="userEmailInput"
                            style={{ marginTop: "10px" }}
                        >
                            Email
                        </label>
                        <input
                            className={
                                errorEmail
                                    ? "form-control input-error"
                                    : "form-control"
                            }
                            type="email"
                            aria-label="user email"
                            id="userEmailInput"
                            value={email}
                            onChange={handleEmailChange}
                        />
                        <span className="input-error-message">
                            {errorEmail}
                        </span>
                        <label
                            className="form-label"
                            htmlFor="userRoleInput"
                            style={{ marginTop: "10px" }}
                        >
                            Role
                        </label>
                        <select
                            className="form-select"
                            aria-label="User role select"
                            onChange={handleRoleChange}
                            value={role}
                        >
                            <option defaultValue>regular</option>
                            {props.roles &&
                                props.roles
                                    .filter((role) => role.name != "regular")
                                    .map((role, index) => (
                                        <option key={index} value={role.name}>
                                            {role.name}
                                        </option>
                                    ))}
                        </select>
                    </form>
                </>
            }
        />
    );
};
export default UserCreation;
