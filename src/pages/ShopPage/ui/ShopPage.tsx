import { Funnel } from "lucide-react";
import { useState } from "react";
import { NftCard } from "@/features/NftCard/ui/NftCard";
import {
    RARITY_FILTERS,
    SHOP_FILTERS,
    ShopFilterType,
    ShopRarityFilterType,
} from "@/shared/constants/Shop";
import { Button } from "@/shared/ui/Button";
import { InfoCard } from "@/widgets/InfoCard";
import { clsx } from "clsx";
import { useUserStore } from "@/entities/User/model/store";
import "./ShopPage.scss";
import { AddFundsModal } from "@/entities/Exchange/ui/add-funds-modal";
import { useNftStore } from "@/entities/Nft/model/store";
import { Card } from "@/shared/ui/Card";

export const ShopPage = () => {
    const [currentFilter, setCurrentFilter] = useState<ShopFilterType>("all");
    const [currentRarity, setCurrentRarity] =
        useState<ShopRarityFilterType>("all");
    const [isFundsModalOpen, setFundsModalOpen] = useState(false);

    const user = useUserStore((s) => s);
    const nfts = useNftStore((s) => s.nfts);

    const userNftNames = new Set(user.nfts.map((nft) => nft.name));

    const filteredNfts = nfts
        .filter((nft) => {
            switch (currentFilter) {
                case "all":
                    return true;
                case "popular":
                    return nft.type === "popular";
                case "new":
                    return nft.type === "new";
                case "my":
                    return userNftNames.has(nft.name);
                default:
                    return true;
            }
        })
        .filter(
            (nft) =>
                currentRarity === "all" ||
                nft.rarity.toLowerCase() === currentRarity
        );

    return (
        <>
            {isFundsModalOpen && (
                <AddFundsModal onClose={() => setFundsModalOpen(false)} />
            )}
            <section className="shop-page">
                <div className="shop-page__inner container">
                    <main className="shop-page__content">
                        <div className="shop-page__header">
                            {SHOP_FILTERS.map((filter) => (
                                <Button
                                    key={filter.type}
                                    onClick={() =>
                                        setCurrentFilter(filter.type)
                                    }
                                    className={clsx(
                                        "shop-page__header-button",
                                        currentFilter === filter.type &&
                                            "shop-page__header-button--active"
                                    )}
                                >
                                    {filter.label}
                                </Button>
                            ))}
                        </div>

                        <Card className="shop-page__filters">
                            <div className="shop-page__filter-card">
                                <div className="shop-page__filter-card-title">
                                    <Funnel
                                        className="shop-page__filter-icon"
                                        stroke="var(--muted-foreground)"
                                        width={12}
                                        height={12}
                                    />
                                    <p className="primary-text">
                                        Filter by rarity
                                    </p>
                                </div>

                                <div className="shop-page__filter-card-buttons">
                                    {RARITY_FILTERS.map((filter) => (
                                        <Button
                                            key={filter.type}
                                            variant="dark"
                                            onClick={() =>
                                                setCurrentRarity(filter.type)
                                            }
                                            className={clsx(
                                                "shop-page__filter-button",
                                                `shop-page__filter-button--${filter.type}`,
                                                currentRarity === filter.type &&
                                                    "shop-page__filter-button--active"
                                            )}
                                        >
                                            {filter.label}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </Card>

                        <section className="shop-page__results">
                            <ul className="shop-page__cards">
                                {filteredNfts.map((nft) => (
                                    <li
                                        key={nft.name}
                                        className="shop-page__card"
                                    >
                                        <NftCard
                                            name={nft.name}
                                            price={nft.price}
                                            rarity={nft.rarity}
                                            type={nft.type}
                                            image={nft.image}
                                            purchased={userNftNames.has(
                                                nft.name
                                            )}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </main>

                    <aside className="shop-page__sidebar">
                        <InfoCard
                            className="shop-page__info-card"
                            setFundsModalOpen={setFundsModalOpen}
                        />
                    </aside>
                </div>
            </section>
        </>
    );
};
