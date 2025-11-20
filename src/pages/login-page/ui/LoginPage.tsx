import { useState } from "react"
import { Lock, Mail, User } from "lucide-react"
import Input from "@/shared/ui/input/Input"
import Button from "@/shared/ui/button/Button"
import "./LoginPage.scss"
import { useUser } from "@/shared/store/useUser"

export const LoginPage = () => {
    const registerUser = useUser((s) => s.registerUser)

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setSuccess("")

        if (!username.trim() || !email.trim() || !password.trim()) {
            setError("All fields are required!")
            return
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match")
            return
        }

        registerUser(username, email, password)
        setSuccess("Account created successfully!")

        setUsername("")
        setEmail("")
        setPassword("")
        setConfirmPassword("")
    }

    return (
        <section className="login-page">
            <div className="login-page__inner container card">
                <div className="login-page__icon">
                    <User width={40} height={40} />
                </div>

                <div className="login-page__header">
                    <h2 className="login-page__header-title">Create Account</h2>
                    <p className="login-page__header-subtitle">Join Smaragd Coin Platform</p>
                </div>

                <form className="login-page__form" onSubmit={handleSubmit}>
                    <Input
                        labelIcon={<User width={16} height={16} />}
                        label="Username"
                        type="text"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <Input
                        labelIcon={<Mail width={16} height={16} />}
                        label="Email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <Input
                        labelIcon={<Lock width={16} height={16} />}
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Input
                        labelIcon={<Lock width={16} height={16} />}
                        label="Confirm Password"
                        type="password"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    {error && <p className="error">{error}</p>}
                    {success && <p className="success">{success}</p>}

                    <Button variant="primary" size="lg">
                        Create Account
                    </Button>
                </form>
            </div>
        </section>
    )
}
