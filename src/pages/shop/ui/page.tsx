import { Funnel } from "lucide-react";
import { useState, useMemo } from "react";
import {
    RARITY_FILTERS,
    SHOP_FILTERS,
    ShopFilterType,
    ShopRarityFilterType,
} from "@/shared/config";
import { Button } from "@/shared/ui/Button";
import { InfoCard } from "@/widgets/InfoCard";
import { clsx } from "clsx";
import { AddFundsModal } from "@/widgets/AddFundsModal";
import { Card } from "@/shared/ui/Card";
import { NftList } from "@/widgets/NftList";
import { NftCardSkeleton } from "@/entities/nft";
import { useGetNftsQuery } from "@/features/nft";
import "./page.scss";

export const ShopPage = () => {
    const [currentFilter, setCurrentFilter] = useState<ShopFilterType>("all");
    const [currentRarity, setCurrentRarity] =
        useState<ShopRarityFilterType>("all");
    const [isFundsModalOpen, setFundsModalOpen] = useState(false);

    const nftsQuery = useGetNftsQuery();

    const nfts = nftsQuery.data || [];

    const isNftsLoading = nftsQuery.isLoading;

    const filteredNfts = useMemo(() => {
        return nfts.filter((nft) => {
            const matchesFilter =
                currentFilter === "all" ||
                (currentFilter === "popular" && nft.type === "popular") ||
                (currentFilter === "new" && nft.type === "new") ||
                (currentFilter === "my" && nft.purchased);

            const matchesRarity =
                currentRarity === "all" ||
                nft.rarity.toLowerCase() === currentRarity;

            return matchesFilter && matchesRarity;
        });
    }, [nfts, currentFilter, currentRarity]);

    return (
        <>
            {isFundsModalOpen && (
                <AddFundsModal setFundsModalOpen={setFundsModalOpen} />
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
                                            "shop-page__header-button--active",
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
                                                    "shop-page__filter-button--active",
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
                                {isNftsLoading ? (
                                    Array.from({ length: 6 }).map(
                                        (_, index) => (
                                            <NftCardSkeleton
                                                key={index}
                                                className="shop-page__card-skeleton"
                                            />
                                        ),
                                    )
                                ) : (
                                    <NftList nfts={filteredNfts} />
                                )}
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
