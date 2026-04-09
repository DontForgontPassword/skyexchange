import { clsx } from "clsx";
import "./NftCardSkeleton.scss";

interface INftCardSkeletonProps {
    className?: string;
}

const NftCardSkeleton = ({ className }: INftCardSkeletonProps) => {
    return <div className={clsx("nft-card-skeleton", className)}></div>;
};

export { NftCardSkeleton };
