import { FC } from "react";
import "./Input.scss";
import clsx from "clsx";

interface InputProps {
     placeholder?: string;
     type: string;
     name?: string;
     className?: string;
     id: string;
}

const Input: FC<InputProps> = ({
     className,
     placeholder,
     type,
     name,
     id
}) => {
     return <input id={id} className={clsx("input", className)} placeholder={placeholder} type={type} name={name} />;
}

export default Input;