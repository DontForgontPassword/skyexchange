import { FC, InputHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import "./Input.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
     labelIcon: ReactNode;
     label?: string;
     error?: string;
     icon?: ReactNode;
     className?: string;
     wrapperClassName?: string;
}

const Input: FC<InputProps> = ({ label, error, labelIcon, icon, className, wrapperClassName, ...props }) => {
     return (
          <div className={clsx("input", wrapperClassName)}>
               {label && <label className="input__label">
                    {labelIcon}
                    {label}
               </label>}

               <div className={clsx("input__wrapper", { "input__wrapper--error": !!error })}>
                    <input
                         className={clsx("input__field", className)}
                         {...props}
                    />
                    {icon && <div className="input__icon">{icon}</div>}
               </div>

               {error && <p className="input__error">{error}</p>}
          </div>
     );
}

export default Input;
