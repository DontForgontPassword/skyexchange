import { User, Lock, Mail } from "lucide-react";
import { useUser } from "@/shared/store/useUser"
import Input from "@/shared/ui/input/Input";
import "./ProfilePage.scss"
import Button from "@/shared/ui/button/Button";

export const ProfilePage = () => {
     const user = useUser.getState();

     return (
          <section className="profile-page container">
               <div className="profile-page__inner container">
                    {
                         !user.token && (
                              <div className="profile-page__registration-card registration-card card">
                                   <div className="registration-card__icon">
                                        <User width={40} height={40} />
                                   </div>

                                   <div className="registration-card__header">
                                        <h2 className="registration-card__header-title">Create Account</h2>
                                        <p className="registration-card__header-subtitle">Join Smaragd Coin Platform</p>
                                   </div>

                                   <form className="registration-card__form">
                                        <Input labelIcon={<User width={16} height={16} />} label="Username" type="text" placeholder="Enter your username" />
                                        <Input labelIcon={<Mail width={16} height={16} />} label="Email" type="text" placeholder="Enter your email" />
                                        <Input labelIcon={<Lock width={16} height={16} />} label="Password" type="password" placeholder="Enter your password" />
                                        <Input labelIcon={<Lock width={16} height={16} />} label="Confirm Password" type="password" placeholder="Confirm your password" />
                                        <Button size="lg">Create Account</Button>
                                   </form>
                              </div>
                         )
                    }
               </div>
          </section>
     )
}