interface ILink {
     text: string;
     to: string;
}

const Links: ILink[] = [
     { text: 'Exchange', to: '/' },
     { text: 'Shop', to: '/shop' },
     { text: 'Game', to: '/game' },
     { text: 'Profile', to: '/profile' },
]

export { Links }