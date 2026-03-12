import { User } from "./types";

const getDefaultBalance = (user: User) => {
    if (!user) {
        return 0;
    }

    user.balances.find((b) => b.currency === user.defaultCurrency);
};

export { getDefaultBalance };
