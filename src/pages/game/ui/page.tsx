import { Trophy } from "lucide-react";
import { Card } from "@/shared/ui/Card";
import { useGetLeaderboardQuery } from "@/features/game/api/gameApi";
import { GameInterface } from "@/features/game";
import "./page.scss";

export function GamePage() {
    const { data: leaderboard } = useGetLeaderboardQuery();

    return (
        <section className="game-page">
            <div className="game-page__inner container">
                <GameInterface />

                <Card className="game-page__leaderboard">
                    <div className="game-page__leaderboard-header">
                        <Trophy className="game-page__leaderboard-icon" />
                        <h3 className="game-page__leaderboard-title">
                            Leaderboard
                        </h3>
                    </div>
                    <div className="game-page__leaderboard-list">
                        {leaderboard?.map((item, index) => (
                            <div key={index} className="leaderboard-item">
                                <div className="leaderboard-item__info">
                                    <span className="leaderboard-item__rank">
                                        {index + 1}.
                                    </span>
                                    <span className="leaderboard-item__name">
                                        {item.username}
                                    </span>
                                </div>
                                <span className="leaderboard-item__score">
                                    {item.score}
                                </span>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </section>
    );
}
