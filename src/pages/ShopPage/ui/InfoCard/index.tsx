import clsx from "clsx";
import { Wallet } from "lucide-react";
import { FC } from "react";
import "./InfoCard.scss";

interface InfoCardProps {
     className?: string;
}

const InfoCard: FC<InfoCardProps> = ({ className }) => {
     return (
          <div className={clsx("info-card", "card", className)}>
               <div className="info-card__header">
                    <div className="info-card__wallet-icon">
                         <Wallet width={24} height={24} />
                    </div>
                    <div className="info-card__title">
                         <h3>Your Wallet</h3>
                         <p>Connected</p>
                    </div>
               </div>
          </div>
     );
}

export default InfoCard;