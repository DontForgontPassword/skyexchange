import { clsx } from "clsx";
import "./Card.scss";

interface Props {
    children: React.ReactNode;
    className?: string;
    innerClassName?: string;
}

const Card = ({ children, className, innerClassName }: Props) => {
    return (
        <div className={clsx(className, "card")}>
            <div className={clsx(innerClassName, "card__inner")}>
                {children}
            </div>
        </div>
    );
};

export { Card };
