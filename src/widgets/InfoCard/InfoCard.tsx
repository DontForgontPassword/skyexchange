import { clsx } from "clsx";
import { Button } from "@/shared/ui/Button";
import { Wallet } from "lucide-react";
import { useUserStore } from "@/entities/User/model/store";
import { useNavigate } from "react-router-dom";
import { useExchangeStore } from "@/entities/Exchange";
import { Card } from "@/shared/ui/Card";
import { getDefaultBalance } from "@/entities/User/model/selectors";
import "./InfoCard.scss";
import { useAuthStore } from "@/entities/Auth";

interface IInfoCardProps {
    setFundsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    className?: string;
}

const InfoCard = ({ setFundsModalOpen, className }: IInfoCardProps) => {
    const navigate = useNavigate();
    const user = useUserStore();
    const isAuth = useAuthStore((state) => state.accessToken) !== null;
    const coin = useExchangeStore((state) => state.getCoin("smg"));
    const coinRate = coin?.rate ?? 0;

    const balance = user ? getDefaultBalance(user)?.value ?? 0 : 0;
    const nftsCost = user
        ? user.nfts.reduce((sum) => sum + 0, 0)
        : 0;

    const stats = [
        {
            title: "Balance",
            value: balance.toFixed(2),
            extra: "SMG",
            modifier: "balance",
        },
        {
            title: "Owned NFTs",
            value: user?.nfts.length ?? 0,
        },
        {
            title: "Total Value",
            value: `${nftsCost.toFixed(2)} SMG`,
            extra: `$${(nftsCost * coinRate).toFixed(2)}`,
        },
    ];

    const handleLogin = () => {
        navigate("/login");
    };

    const handleAddFunds = () => {
        setFundsModalOpen(true);
    };

    return (
        <Card className={clsx(className, "info-card")}>
            <div className="info-card__header">
                <div className="info-card__wallet-icon">
                    <Wallet width={24} height={24} />
                </div>

                <div>
                    <h3 className="info-card__title">
                        {isAuth ? "Your Wallet" : "Wallet Access"}
                    </h3>
                    <p className="info-card__status">
                        {isAuth ? "Connected" : "Not Connected"}
                    </p>
                </div>
            </div>

            {!isAuth ? (
                <div className="info-card__auth-warning">
                    <p className="info-card__auth-title">
                        You are not logged in
                    </p>
                    <p className="info-card__auth-subtitle">
                        Sign in to access your wallet, balance and NFTs.
                    </p>

                    <Button
                        variant="default"
                        className="info-card__login-button"
                        onClick={handleLogin}
                    >
                        Login
                    </Button>
                </div>
            ) : (
                <>
                    <div className="info-card__stats">
                        {stats.map((stat) => (
                            <div key={stat.title} className="info-card__stat">
                                <p className="info-card__stat-title primary-text">
                                    {stat.title}
                                </p>
                                <span
                                    className={clsx(
                                        "info-card__stat-value",
                                        stat.modifier &&
                                            `info-card__stat-value--${stat.modifier}`
                                    )}
                                >
                                    {stat.value}
                                </span>
                                {stat.extra && (
                                    <p className="primary-text">{stat.extra}</p>
                                )}
                            </div>
                        ))}
                    </div>

                    <Button
                        size="sm"
                        className="info-card__add-funds"
                        onClick={handleAddFunds}
                    >
                        Add Funds
                    </Button>
                </>
            )}
        </Card>
    );
};

export { InfoCard };
