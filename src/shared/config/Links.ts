interface ILink {
    text: string;
    to: string;
}

const LINKS: ILink[] = [
    { text: "Exchange", to: "/" },
    { text: "Shop", to: "/shop" },
    { text: "Game", to: "/game" },
    { text: "Profile", to: "/profile" },
];

export { LINKS };
