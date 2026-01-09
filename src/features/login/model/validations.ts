import { RegisterErrors } from "./types";

export const validateRegister = (
    username: string,
    email: string,
    password: string,
    confirmPassword: string
): RegisterErrors => {
    const errors: RegisterErrors = {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    };

    if (!username) errors.username = "Username is required";

    if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
        errors.email = "Invalid email format";
    }

    if (!password) errors.password = "Password is required";

    if (password !== confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
    }

    return errors;
};
