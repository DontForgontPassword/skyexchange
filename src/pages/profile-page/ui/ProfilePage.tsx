import { User, Mail } from "lucide-react";
import { useUser } from "@/shared/store/useUser";
import "./ProfilePage.scss";

export const ProfilePage = () => {
     const user = useUser.getState();

     return (
          <section className="profile-page container">
               <div className="profile-page__inner">
                    <div className="profile-card card">
                         <div className="profile-card__avatar">
                              <User width={96} height={96} />
                         </div>

                         <div className="profile-card__info">
                              <div className="profile-card__info-item">
                                   <p className="profile-card__info-item-label">Username</p>
                                   <p className="profile-card__info-item-value profile-card__info-item-value--username">{user.username}</p>
                              </div>

                              <div className="profile-card__info-item">
                                   <p className="profile-card__info-item-label">
                                        <Mail width={16} height={16} />
                                        Email / Wallet ID
                                   </p>
                                   <p className="profile-card__info-item-value profile-card__info-item-value--mail">{user.email}</p>
                              </div>
                         </div>

                         <div className="profile-card__stats">
                              <div className="profile-card__stats-item">
                                   <p className="profile-card__stats-item-label">
                                        <Mail width={16} height={16} />
                                        Balance
                                   </p>
                                   <p className="profile-card__stats-item-value">
                                        {user.balance.amount} <span>{user.balance.id.toUpperCase()}</span>
                                   </p>
                              </div>

                              <div className="profile-card__stats-item">
                                   <p className="profile-card__stats-item-label">
                                        <Mail width={16} height={16} />
                                        High Score
                                   </p>
                                   <p className="profile-card__stats-item-value">
                                        {user.game.score} <span>Points</span>
                                   </p>
                              </div>
                         </div>
                    </div>

                    <div className="profile-nfts card">
                    </div>
               </div>
          </section>
     );
};
