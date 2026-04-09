import { Coin } from "@/shared/model/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CryptoState = {
    selectedCrypto: Coin | null;
};

const initialState: CryptoState = {
    selectedCrypto: null,
};

export const slice = createSlice({
    name: "crypto",
    initialState,
    reducers: {
        selectCrypto(state, action: PayloadAction<Coin>) {
            state.selectedCrypto = action.payload;
        },
    },
    selectors: {
        getSelectedCrypto: (state: CryptoState) => state.selectedCrypto,
    },
});

export const { selectCrypto } = slice.actions;

export const cryptoReducer = slice.reducer;
