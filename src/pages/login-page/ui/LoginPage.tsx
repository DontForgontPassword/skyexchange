import { User } from 'lucide-react'
import { useState } from 'react'
import { useUser } from '@/shared/store/useUser'
import { Button } from '@/shared/ui/button'
import './LoginPage.scss'
import { LoginInputField } from '@/features/login/ui/LoginInputField'

export const LoginPage = () => {
    const registerUser = useUser((s) => s.register)

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target

        switch (id) {
            case 'input-username':
                setUsername(value)
                break
            case 'input-email':
                setEmail(value)
                break
            case 'input-password':
                setPassword(value)
                break
            case 'input-confirm-password':
                setConfirmPassword(value)
                break
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setSuccess('')

        if (!username.trim() || !email.trim() || !password.trim()) {
            setError('All fields are required!')
            return
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match')
            return
        }

        registerUser(username, email, password)
        setSuccess('Account created successfully!')

        setUsername('')
        setEmail('')
        setPassword('')
        setConfirmPassword('')
    }

    return (
        <section className="login-page">
            <div className="login-page__inner container card">
                <div className="login-page__icon">
                    <User width={40} height={40} />
                </div>

                <div className="login-page__header">
                    <h2 className="login-page__header-title">Create Account</h2>
                    <p className="login-page__header-subtitle">
                        Join Smaragd Coin Platform
                    </p>
                </div>

                <form className="login-page__form" onSubmit={handleSubmit}>
                    <LoginInputField
                        id="input-username"
                        icon="user"
                        label="Username"
                        placeholder="Enter your username"
                        onChange={handleChangeInput}
                    />
                    <LoginInputField
                        id="input-email"
                        icon="email"
                        label="Email"
                        placeholder="Enter your email"
                        onChange={handleChangeInput}
                    />
                    <LoginInputField
                        id="input-password"
                        icon="password"
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        onChange={handleChangeInput}
                    />
                    <LoginInputField
                        id="input-confirm-password"
                        icon="password"
                        label="Confirm Password"
                        type="password"
                        placeholder="Confirm your password"
                        onChange={handleChangeInput}
                    />

                    {error && <p className="error">{error}</p>}
                    {success && <p className="success">{success}</p>}

                    <Button variant="default" size="lg">
                        Create Account
                    </Button>
                </form>
            </div>
        </section>
    )
}
