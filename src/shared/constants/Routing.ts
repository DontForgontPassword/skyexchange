import { FC } from 'react';
import { ExchangePage } from '@/pages/exchange-page';
import { GamePage } from '@/pages/game-page';
import { LoginPage } from '@/pages/login-page';
import { ProfilePage } from '@/pages/profile-page';
import { ShopPage } from '@/pages/shop-page';

interface IRoute {
    to: string;
    authRequired: boolean;
    page?: FC;
}

export const RoutingList: IRoute[] = [
    { to: '/', authRequired: false, page: ExchangePage },
    { to: '/shop', authRequired: false, page: ShopPage },
    { to: '/game', authRequired: false, page: GamePage },
    { to: '/profile', authRequired: true, page: ProfilePage },
    { to: '/login', authRequired: false, page: LoginPage },
];
