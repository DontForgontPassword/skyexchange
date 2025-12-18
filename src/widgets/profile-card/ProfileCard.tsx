import { Edit, LogOut, Mail, User } from 'lucide-react'
import { useUser } from '@/shared/store/useUser'
import './ProfileCard.scss'
import { Button } from '@/shared/ui/button'

const ProfileCard = () => {
    const user = useUser.getState()
    const defaultBalance = user.getDefaultBalance()

    user.add('smg', 1000)

    return (
        <div className="profile-card card">
            <div className="profile-card__avatar">
                <User width={96} height={96} />
            </div>

            <div className="profile-card__info">
                <div className="profile-card__info-item">
                    <p className="profile-card__info-item-label primary-text">
                        Username
                    </p>
                    <p className="profile-card__info-item-value profile-card__info-item-value--username">
                        {user.username}
                    </p>
                </div>

                <div className="profile-card__info-item">
                    <p className="profile-card__info-item-label primary-text">
                        <Mail width={16} height={16} />
                        Email / Wallet ID
                    </p>
                    <p className="profile-card__info-item-value profile-card__info-item-value--mail">
                        {user.email}
                    </p>
                </div>
            </div>

            <div className="profile-card__stats">
                <div className="profile-card__stats-item">
                    <p className="profile-card__stats-item-label primary-text">
                        <Mail color="var(--primary)" width={16} height={16} />
                        Balance
                    </p>
                    <p className="profile-card__stats-item-value profile-card__stats-item-value--balance">
                        {defaultBalance.value}
                        <span className="primary-text">SMARAGD</span>
                    </p>
                </div>

                <div className="profile-card__stats-item">
                    <p className="profile-card__stats-item-label primary-text">
                        <Mail color="var(--primary)" width={16} height={16} />
                        High Score
                    </p>
                    <p className="profile-card__stats-item-value">
                        {user.game.score}
                        <span className="primary-text">Points</span>
                    </p>
                </div>
            </div>
            <div className="profile-card__actions">
                <Button
                    className="profile-card__actions-button"
                    variant={'default'}
                >
                    <Edit width={16} height={16} />Edit Profile
                </Button>
                <Button
                    className="profile-card__actions-button"
                    variant={'outline'}
                >
                    <LogOut width={16} height={16} />Logout
                </Button>
            </div>
        </div>
    )
}

export { ProfileCard }
