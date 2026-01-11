import { FC } from 'react';
import { ExchangePage } from '@/pages/ExchangePage';
import { GamePage } from '@/pages/GamePage';
import { LoginPage } from '@/pages/LoginPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { ShopPage } from '@/pages/ShopPage';

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
