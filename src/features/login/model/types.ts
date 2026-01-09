export type RegisterField =
    | "username"
    | "email"
    | "password"
    | "confirmPassword";

export type RegisterErrors = Record<RegisterField, string>;
