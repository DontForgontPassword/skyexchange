import { User } from "./types";

const getDefaultBalance = (user: User | null) => {
    if (!user) {
        return null;
    }

    return user.balances.find((b) => b.currency === user.defaultCurrency);
};

export { getDefaultBalance };
