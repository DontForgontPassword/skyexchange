import { ChangeEventHandler, FC } from "react";
import "./Input.scss";
import clsx from "clsx";

interface InputProps {
     placeholder?: string;
     type: string;
     name?: string;
     value?: number;
     className?: string;
     id: string;
     onChange?: ChangeEventHandler<HTMLInputElement>;
}

const Input: FC<InputProps> = ({
     className,
     placeholder,
     type,
     name,
     onChange,
     value,
     id
}) => {
     return <input onChange={onChange} value={value} id={id} className={clsx("input", className)} placeholder={placeholder} type={type} name={name} />;
}

export default Input;