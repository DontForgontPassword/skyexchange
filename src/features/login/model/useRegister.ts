import { useState } from "react";
import { useUserStore } from "@/entities/User/model/store";
import { validateRegister } from "./validations";
import { RegisterErrors } from "./types";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
    const user = useUserStore((s) => s);
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState<RegisterErrors>({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const submit = () => {
        const validationErrors = validateRegister(
            username,
            email,
            password,
            confirmPassword
        );

        setErrors(validationErrors);

        if (Object.values(validationErrors).some(Boolean)) {
            return;
        }

        user.register(username, email, password);
        toast.success("Account created successfully!");
        navigate("/profile");
    };

    return {
        fields: {
            username,
            email,
            password,
            confirmPassword,
        },
        setUsername,
        setEmail,
        setPassword,
        setConfirmPassword,
        errors,
        submit,
    };
};
