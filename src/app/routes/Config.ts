import { FC } from "react";
import { ExchangePage } from "@/pages/exchange";
import { GamePage } from "@/pages/game";
import { AuthPage } from "@/pages/auth";
import { ProfilePage } from "@/pages/profile";
import { ShopPage } from "@/pages/shop";

interface IRoute {
    to: string;
    authRequired: boolean;
    page?: FC;
}

export const RoutingList: IRoute[] = [
    { to: "/", authRequired: false, page: ExchangePage },
    { to: "/shop", authRequired: true, page: ShopPage },
    { to: "/game", authRequired: true, page: GamePage },
    { to: "/profile", authRequired: true, page: ProfilePage },
    { to: "/auth", authRequired: false, page: AuthPage },
];
