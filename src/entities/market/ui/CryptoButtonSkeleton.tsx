import "./CryptoButtonSkeleton.scss";

const CryptoButtonSkeleton = () => {
    return (
        <div className="crypto-button crypto-button--skeleton">
            <div className="crypto-button__header">
                <div className="skeleton skeleton--icon" />
                <div className="skeleton skeleton--text short" />
            </div>

            <div className="crypto-button__bottom">
                <div className="skeleton skeleton--text" />
                <div className="skeleton skeleton--text short" />
            </div>
        </div>
    );
};

export { CryptoButtonSkeleton };
