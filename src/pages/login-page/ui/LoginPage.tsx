import { Lock, Mail, User } from "lucide-react"
import Input from "@/shared/ui/input/Input"
import Button from "@/shared/ui/button/Button"
import "./LoginPage.scss"

export const LoginPage = () => {
    return (
        <section className="login-page">
            <div className="login-page__icon">
                <User width={40} height={40} />
            </div>

            <div className="login-page__header">
                <h2 className="login-page__header-title">Create Account</h2>
                <p className="login-page__header-subtitle">Join Smaragd Coin Platform</p>
            </div>

            <form className="login-page__form">
                <Input labelIcon={<User width={16} height={16} />} label="Username" type="text" placeholder="Enter your username" />
                <Input labelIcon={<Mail width={16} height={16} />} label="Email" type="text" placeholder="Enter your email" />
                <Input labelIcon={<Lock width={16} height={16} />} label="Password" type="password" placeholder="Enter your password" />
                <Input labelIcon={<Lock width={16} height={16} />} label="Confirm Password" type="password" placeholder="Confirm your password" />
                <Button variant="primary" size="lg">Create Account</Button>
            </form>
        </section>
    )
}