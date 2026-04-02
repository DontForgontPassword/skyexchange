import { FC } from "react";
import { ExchangePage } from "@/app/pages/exchange";
import { GamePage } from "@/app/pages/game";
import { LoginPage } from "@/app/pages/login";
import { ProfilePage } from "@/app/pages/profile";
import { ShopPage } from "@/app/pages/shop";

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
    { to: "/login", authRequired: false, page: LoginPage },
];
