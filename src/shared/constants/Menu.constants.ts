import { ExchangePage } from "@/pages/exchange-page";
import { GamePage } from "@/pages/game-page";
import { ProfilePage } from "@/pages/profile-page";
import { ShopPage } from "@/pages/shop-page";
import { ComponentType } from "react";

interface ILink {
     text: string;
     to: string;
     page?: ComponentType<any>;
}

const Links: ILink[] = [
     { text: "Exchange", to: "/", page: ExchangePage },
     { text: "Shop", to: "/shop", page: ShopPage },
     { text: "Game", to: "/game", page: GamePage },
     { text: "Profile", to: "/profile", page: ProfilePage },
];

export { Links };