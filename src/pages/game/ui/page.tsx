import { Heart, Star, Trophy } from "lucide-react";
import { Card } from "@/shared/ui/Card";
import { useState } from "react";
import "./page.scss";

export function GamePage() {
    const [gameData, setGameData] = useState({
        points: 0,
        lives: 3,
        combo: 0,
        timer: 60,
    });

    return (
        <section className="game-page">
            <div className="game-page__inner container">
                <Card className="game-page__content">
                    <div className="game-page__header">
                        <h2 className="game-page__title title">
                            Cloud Catcher
                        </h2>
                        <div className="game-page__stats">
                            <div className="game-page__stat">
                                <Star className="game-page__stat-icon" />
                                <p className="game-page__stat-value">
                                    {gameData.points}
                                </p>
                                <p className="game-page__stat-label primary-text">
                                    Points
                                </p>
                            </div>
                            <div className="game-page__stat">
                                <Heart className="game-page__stat-icon game-page__stat-icon--heart" />
                                <p className="game-page__stat-value">
                                    {gameData.lives}
                                </p>
                                <p className="game-page__stat-label primary-text">
                                    Lives
                                </p>
                            </div>
                            <div className="game-page__stat">
                                <p className="game-page__stat-label primary-text">
                                    Combo: {gameData.combo}
                                </p>
                            </div>
                            <div className="game-page__stat">
                                <p className="game-page__stat-label primary-text">
                                    Time: {gameData.timer}s
                                </p>
                            </div>
                        </div>
                    </div>
                    <canvas className="game-canvas" />
                </Card>
                <Card className="game-page__leaderboard">
                    <div className="game-page__leaderboard-header">
                        <Trophy className="game-page__leaderboard-icon" />
                        <h3 className="game-page__leaderboard-title">
                            Leaderboard
                        </h3>
                    </div>
                </Card>
            </div>
        </section>
    );
}
