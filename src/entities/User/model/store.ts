import { useAuthStore } from "@/entities/Auth";
import { Balance, Currency, NFT, User } from "./types";

const defaultUser: User = {
    id: 0,
    username: "Guest",
    email: "",
    avatarImage: null,
    balances: [
        { currency: Currency.SMG, value: 0, name: "SMG" },
        { currency: Currency.BTC, value: 0, name: "BTC" },
        { currency: Currency.ETH, value: 0, name: "ETH" },
        { currency: Currency.SOL, value: 0, name: "SOL" },
    ],
    defaultCurrency: Currency.SMG,
    nfts: [],
    game: {
        score: 0,
        rank: 0,
    },
    createdAt: new Date().toISOString(),
};

export type UserStore = User & {
    user: User;
    isLoggedIn: boolean;
    setAvatar: (avatar: string) => void;
    getBalanceValue: (currency: Currency) => number;
    subBalance: (currency: Currency, amount: number) => void;
};

const buildUserStore = (authUser: User | null, accessToken: string | null): UserStore => {
    const safeUser = authUser ?? defaultUser;

    const getBalanceValue = (currency: Currency) =>
        safeUser.balances.find((b) => b.currency === currency)?.value ?? 0;

    const subBalance = (currency: Currency, amount: number) => {
        useAuthStore.setState((state) => {
            if (!state.user) return state;

            const updatedBalances = state.user.balances.map((b) =>
                b.currency === currency ? { ...b, value: Math.max(0, b.value - amount) } : b
            );

            return {
                ...state,
                user: {
                    ...state.user,
                    balances: updatedBalances,
                },
            };
        });
    };

    const setAvatar = (avatar: string) => {
        useAuthStore.setState((state) => {
            if (!state.user) return state;
            return {
                ...state,
                user: {
                    ...state.user,
                    avatarImage: avatar,
                },
            };
        });
    };

    return {
        ...defaultUser,
        ...safeUser,
        user: safeUser,
        isLoggedIn: Boolean(accessToken && authUser),
        getBalanceValue,
        subBalance,
        setAvatar,
    };
};

const useUserStore = <T = UserStore>(selector?: (store: UserStore) => T): T => {
    const authUser = useAuthStore((state) => state.user);
    const accessToken = useAuthStore((state) => state.accessToken);

    const store = buildUserStore(authUser, accessToken);

    if (typeof selector === "function") {
        return selector(store);
    }

    return store as unknown as T;
};

export { useUserStore };