import { Button } from "@/shared/ui/button";
import { Wallet } from "lucide-react";
import { useUser } from "@/shared/store/useUser";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { useNftStore } from "@/shared/store/useNftStore";
import { useExchangeStore } from "@/shared/store/useExchangeStore";
import "./InfoCard.scss";
import { clsx } from "clsx";

interface IInfoCardProps {
    setFundsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    className?: string;
}

const InfoCard = ({ setFundsModalOpen, className }: IInfoCardProps) => {
    const navigate = useNavigate();

    const user = useUser((s) => s);
    const nftStore = useNftStore((s) => s);
    const userNfts = user.nfts;
    const nftsCost = nftStore.getCost(user.nfts);
    const balance = user.getDefaultBalance().value;
    const coin = useExchangeStore((state) => state.getCoinByName("SMG"));
    const coinRate = coin?.rate ?? 0;

    const stats = useMemo(
        () => [
            {
                title: "Balance",
                value: balance.toFixed(2),
                extra: "SMG",
                modifier: "balance",
            },
            {
                title: "Owned NFTs",
                value: 0,
            },
            {
                title: "Total Value",
                value: `${nftsCost.toFixed(2)} SMARAGD`,
                extra: `$${(nftsCost * coinRate).toFixed(2)}`,
            },
        ],
        [balance, userNfts.length]
    );

    const isAuth = Boolean(user.token);

    const handleLogin = () => {
        navigate("/login");
    };

    const handleAddFunds = () => {
        setFundsModalOpen(true);
    };

    return (
        <div className={clsx(className, "info-card")}>
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
                        variant={"default"}
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
                                    className={`info-card__stat-value ${stat.modifier &&
                                        `info-card__stat-value--${stat.modifier}`
                                        }`}
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
        </div>
    );
};

export { InfoCard };
