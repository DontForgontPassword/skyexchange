import { clsx } from "clsx";
import "./nft-card.skeleton.scss";
interface INftCardSkeletonProps {
    className?: string;
}

const NftCardSkeleton = ({ className }: INftCardSkeletonProps) => {
    return <div className={clsx("nft-card-skeleton", className)}></div>;
};

export default NftCardSkeleton;
