type ILink = {
    text: string;
    to: string;
    authRequired: boolean;
};

const LINKS: ILink[] = [
    { text: "Exchange", to: "/", authRequired: false },
    { text: "Shop", to: "/shop", authRequired: true },
    { text: "Game", to: "/game", authRequired: true },
    { text: "Profile", to: "/profile", authRequired: true },
];

export { LINKS };
