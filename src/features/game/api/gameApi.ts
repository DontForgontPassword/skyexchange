import { baseApi } from "@/shared/api";

export interface LeaderboardItem {
    username: string;
    score: number;
    avatarImage: string | null;
}

export const gameApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        saveScore: builder.mutation<
            { success: boolean; new_high_score: boolean },
            { score: number; validation_hash: string }
        >({
            query: (body) => ({
                url: "/game/save-score",
                method: "POST",
                body,
            }),
            invalidatesTags: ["User"],
        }),
        getLeaderboard: builder.query<LeaderboardItem[], void>({
            query: () => "/game/leaderboard",
            providesTags: ["User"],
        }),
    }),
});

export const { useSaveScoreMutation, useGetLeaderboardQuery } = gameApi;
