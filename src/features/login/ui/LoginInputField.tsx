import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react'
import { useState } from 'react'
import { Input } from '@/shared/ui/input'
import './LoginInputField.scss'

interface LoginInputFieldProps extends React.ComponentProps<'input'> {
    label: string;
    icon: 'user' | 'email' | 'password';
}

const LoginInputField = ({ icon, label, ...props }: LoginInputFieldProps) => {
    const [showPassword, setShowPassword] = useState(false)

    const renderIcon = () => {
        switch (icon) {
            case 'user':
                return <User color="var(--primary)" width={16} height={16} />
            case 'email':
                return <Mail color="var(--primary)" width={16} height={16} />
            case 'password':
                return <Lock color="var(--primary)" width={16} height={16} />
        }
    }

    const inputType =
        props.type === 'password'
            ? showPassword
                ? 'text'
                : 'password'
            : props.type

    const input = (
        <Input
            className="login-page__input"
            id={props.id}
            type={inputType}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
        />
    )

    return (
        <div className="login-page__group">
            <label className="login-page__label" htmlFor={props.id}>
                {renderIcon()}
                {label}
            </label>
            {props.type === 'password' ? (
                <div className="login-page__input-wrapper">
                    {input}
                    <button
                        className="login-page__password-button"
                        onClick={() => setShowPassword((prev) => !prev)}
                    >
                        {showPassword ? (
                            <Eye width={18} height={18} />
                        ) : (
                            <EyeOff width={18} height={18} />
                        )}
                    </button>
                </div>
            ) : (
                input
            )}
        </div>
    )
}

export { LoginInputField }
