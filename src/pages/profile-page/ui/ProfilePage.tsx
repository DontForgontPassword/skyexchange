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

               </div>
          </section>
     )
}