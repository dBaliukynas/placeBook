import { useState } from "react";
import VerticallyCenteredModal from "../modals/VerticallyCenteredModal";
import defaultFetchOptions from "../fetch-options/defaultFetchOptions";
import { toast } from "react-toastify";

const RoleCreation = (props) => {
    const validateName = (name) => {
        if (!name.match("^.{0,30}$") || !name) {
            setErrorName(
                "Name cannot be empty and contain more than 30 characters."
            );
        } else {
            setErrorName("");
        }
    };

    const handleNameChange = (event) => {
        const name = event.target.value;
        validateName(name);
        setName(event.target.value);
    };

    const createRole = () => {
        if (name != "") {
            const toastId = toast("Creating a role...", { isLoading: true });

            fetch("/api/role", {
                method: "POST",
                ...defaultFetchOptions,
                body: JSON.stringify({
                    name: name.toLowerCase(),
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
                        toast.update(toastId, {
                            render: "Role has been successfully created.",
                            type: "success",
                            autoClose: 5000,
                            isLoading: false,
                        });
                    }
                })
            );
        }
    };

    const [name, setName] = useState("");
    const [errorName, setErrorName] = useState("");

    return (
        <VerticallyCenteredModal
            id="createRoleModal"
            buttonText="Create"
            title="Create user role"
            buttonType="btn-primary"
            onClick={createRole}
            disabled={!(name != "" && errorName == "")}
            body={
                <>
                    <form>
                        <label
                            className="form-label"
                            htmlFor="userRoleNameInput"
                        >
                            Name
                        </label>
                        <input
                            className={
                                errorName
                                    ? "form-control input-error"
                                    : "form-control"
                            }
                            type="text"
                            aria-label="user role"
                            id="userRoleNameInput"
                            onChange={handleNameChange}
                            value={name}
                        />
                        <span className="input-error-message">{errorName}</span>
                    </form>
                </>
            }
        />
    );
};
export default RoleCreation;
