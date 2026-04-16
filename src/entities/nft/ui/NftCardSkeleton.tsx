import { clsx } from "clsx";
import "./NftCardSkeleton.scss";

interface Props {
    className?: string;
}

const NftCardSkeleton = ({ className }: Props) => {
    return <div className={clsx("nft-card-skeleton", className)}></div>;
};

export { NftCardSkeleton };
