const validateFields = (
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
) => {
    const errors: Record<string, string> = {};

    if (!username.trim()) {
        errors.username = "Username is required";
    } else if (username.length < 3 || username.length > 20) {
        errors.username = "Username must be between 3 and 20 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
        errors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
        errors.email = "Invalid email format";
    }

    if (!password) {
        errors.password = "Password is required";
    } else if (password.length < 8) {
        errors.password = "Password must be at least 8 characters";
    } else if (!/[A-Z]/.test(password)) {
        errors.password = "Password must contain at least one uppercase letter";
    } else if (!/[a-z]/.test(password)) {
        errors.password = "Password must contain at least one lowercase letter";
    } else if (!/[0-9]/.test(password)) {
        errors.password = "Password must contain at least one number";
    }

    if (!confirmPassword) {
        errors.confirmPassword = "Confirm password is required";
    } else if (password !== confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
    }

    return errors;
};

export { validateFields };
