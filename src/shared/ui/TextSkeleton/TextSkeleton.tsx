import "./TextSkeleton.scss";

interface Props {
    width?: string;
    height?: string;
}

const TextSkeleton = ({ width = "100%", height = "14px" }: Props) => {
    return (
        <div
            className="text-skeleton"
            style={{ width, height }}
        />
    );
};

export { TextSkeleton };