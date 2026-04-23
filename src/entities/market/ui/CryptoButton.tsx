import { formatPrice } from "@/shared/lib";
import { clsx } from "clsx";
import "./CryptoButton.scss";
import { BASE_URL } from "@/shared/config";

interface Props {
    name: string;
    price: number;
    change: number;
    icon: string;
    isActive: boolean;
    onClick: () => void;
}

const CryptoButton = ({
    name,
    price,
    change,
    icon,
    isActive,
    onClick,
}: Props) => {
    return (
        <button
            className={clsx(
                "crypto-button",
                isActive && "crypto-button--active",
            )}
            onClick={onClick}
        >
            <div className="crypto-button__header">
                <img
                    width={24}
                    height={24}
                    src={`${BASE_URL}${icon}`}
                    alt="crypto"
                />
                <p className="crypto-button__pair-name">{name}</p>
            </div>
            <div className="crypto-button__bottom">
                <p className="crypto-button__price">
                    {`$${formatPrice(price)}`}
                </p>
                <p
                    className={clsx(
                        "crypto-button__change",
                        change >= 0
                            ? "crypto-button__change--positive"
                            : "crypto-button__change--negative",
                    )}
                >
                    {`${change > 0 ? "+" : ""}${change.toFixed(2)}%`}
                </p>
            </div>
        </button>
    );
};

export { CryptoButton };
