import { useAppDispatch } from "@/app/provider";
import { useAppSelector } from "@/app/provider";
import { useGetMarketQuery } from "@/entities/market";
import { CryptoButton } from "@/entities/market";
import { Card } from "@/shared/ui/Card";
import { selectCrypto } from "../model/slice";
import { CryptoButtonSkeleton } from "@/entities/market";
import { useEffect } from "react";
import "./CryptoSelector.scss";

const CryptoSelector = () => {
    const dispatch = useAppDispatch();
    const { data, isLoading } = useGetMarketQuery();

    const coins = data?.coins;

    useEffect(() => {
        if (coins?.length) {
            dispatch(selectCrypto(coins[0]));
        }
    }, [data]);

    const selectedCrypto = useAppSelector(
        (state) => state.crypto.selectedCrypto,
    );

    return (
        <Card className="crypto-selector">
            <h3 className="crypto-selector__subtitle subtitle">
                Trading Pairs
            </h3>
            <div className="crypto-selector__list">
                {coins
                    ? coins.map((coin) => (
                          <CryptoButton
                              key={coin.name}
                              name={coin.symbol}
                              price={coin.price}
                              icon={coin.icon}
                              change={coin.change}
                              isActive={coin.id === selectedCrypto?.id}
                              onClick={() => dispatch(selectCrypto(coin))}
                          />
                      ))
                    : Array.from({ length: 4 }).map((_) => {
                          return <CryptoButtonSkeleton />;
                      })}
            </div>
        </Card>
    );
};

export { CryptoSelector };
