import clsx from "clsx";
import "./Card.scss";

interface ICardProps {
    children: React.ReactNode;
    className?: string;
    innerClassName?: string;
}

const Card = ({ children, className, innerClassName }: ICardProps) => {
    return (
        <div className={clsx(className, "card")}>
            <div className={clsx(innerClassName, "card__inner")}>
                {children}
            </div>
        </div>
    );
};

export { Card };
