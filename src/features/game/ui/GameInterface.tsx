import { useState, useRef, useEffect } from "react";
import { Button } from "@/shared/ui/Button";
import { Card } from "@/shared/ui/Card";
import {
    Heart,
    Star,
    Play,
    X,
    Zap,
    Shield,
    Sparkles,
    Loader2,
} from "lucide-react";
import {
    useSaveScoreMutation,
    useGetLeaderboardQuery,
} from "@/features/game/api/gameApi";
import "./GameInterface.scss";

interface GameObject {
    x: number;
    y: number;
    width: number;
    height: number;
    speed: number;
    type:
        | "cloud"
        | "lightning"
        | "burst"
        | "gold"
        | "shield"
        | "particle"
        | "combo_breaker"
        | "bird";
    vx?: number;
    life?: number;
    color?: string;
}

const GameInterface = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [gameState, setGameState] = useState<"idle" | "playing" | "gameover">(
        "idle",
    );
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(3);
    const [combo, setCombo] = useState(0);
    const [level, setLevel] = useState(1);
    const [hasShield, setHasShield] = useState(false);
    const [isWheelActive, setIsWheelActive] = useState(false);
    const [wheelValue, setWheelValue] = useState<number | null>(null);

    const [saveScore] = useSaveScoreMutation();
    const { refetch: refetchLeaderboard } = useGetLeaderboardQuery();

    const requestRef = useRef<number | null>(null);
    const playerX = useRef(500);
    const playerY = useRef(500);
    const objects = useRef<GameObject[]>([]);
    const lastSpawn = useRef(0);
    const shakeTime = useRef(0);
    const wheelRotation = useRef(0);

    const startGame = () => {
        setScore(0);
        setLives(3);
        setCombo(0);
        setLevel(1);
        setHasShield(false);
        setIsWheelActive(false);
        setWheelValue(null);
        setGameState("playing");
        objects.current = [];
        playerX.current = 500;
        playerY.current = 500;
    };

    const calculateHash = async (score: number) => {
        const secret = "sky-game-secret-2024";
        const msgUint8 = new TextEncoder().encode(`${score}${secret}`);
        const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    };

    const handleGameOver = async (finalScore: number) => {
        setGameState("gameover");
        const hash = await calculateHash(finalScore);
        await saveScore({ score: finalScore, validation_hash: hash });
        refetchLeaderboard();
    };

    const finishGame = () => {
        handleGameOver(score);
    };

    const createParticles = (x: number, y: number, color: string) => {
        for (let i = 0; i < 8; i++) {
            objects.current.push({
                x,
                y,
                width: 4,
                height: 4,
                speed: Math.random() * 5 - 2.5,
                type: "particle",
                life: 1,
                color,
            });
        }
    };

    const triggerWheel = () => {
        setIsWheelActive(true);
        setWheelValue(null);
        wheelRotation.current = 0;

        let start = Date.now();
        const duration = 2000;
        const options = [2, 4, 6, 8, 10];

        const animate = () => {
            const now = Date.now();
            const elapsed = now - start;
            if (elapsed < duration) {
                wheelRotation.current += (1 - elapsed / duration) * 30;
                requestAnimationFrame(animate);
            } else {
                const finalValue =
                    options[Math.floor(Math.random() * options.length)];
                setWheelValue(finalValue);
                setTimeout(() => {
                    spawnBonusClouds(finalValue);
                    setIsWheelActive(false);
                }, 1000);
            }
        };
        animate();
    };

    const spawnBonusClouds = (count: number) => {
        for (let i = 0; i < count; i++) {
            objects.current.push({
                x: Math.random() * 900 + 50,
                y: -50 - i * 60,
                width: 50,
                height: 50,
                speed: 5 + Math.random() * 2,
                type: "gold",
            });
        }
    };

    useEffect(() => {
        if (combo > 0 && combo % 15 === 0 && !isWheelActive) {
            triggerWheel();
        }
    }, [combo]);

    useEffect(() => {
        if (gameState !== "playing" || isWheelActive) return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const update = (time: number) => {
            if (gameState !== "playing" || isWheelActive) return;

            ctx.save();
            if (shakeTime.current > 0) {
                const dx = Math.random() * 10 - 5;
                const dy = Math.random() * 10 - 5;
                ctx.translate(dx, dy);
                shakeTime.current -= 16;
            }

            ctx.clearRect(-20, -20, canvas.width + 40, canvas.height + 40);

            const platformWidth = Math.max(50, 120 - level * 8);
            ctx.fillStyle = hasShield ? "#3b82f6" : "#ffffff";
            ctx.shadowBlur = hasShield ? 20 : 10;
            ctx.shadowColor = hasShield
                ? "#3b82f6"
                : "rgba(255, 255, 255, 0.2)";
            ctx.beginPath();
            ctx.roundRect(
                playerX.current - platformWidth / 2,
                playerY.current - 6,
                platformWidth,
                12,
                6,
            );
            ctx.fill();
            ctx.shadowBlur = 0;

            const spawnInterval = Math.max(300, 800 - level * 50);
            if (time - lastSpawn.current > spawnInterval) {
                const rand = Math.random();
                let type: GameObject["type"] = "cloud";
                let vx = 0;
                let x = Math.random() * (canvas.width - 60) + 30;
                let y = -50;

                if (rand > 0.98 && !hasShield) type = "shield";
                else if (rand > 0.95) type = "burst";
                else if (rand > 0.9) type = "gold";
                else if (rand > 0.85 && level > 2) {
                    type = "bird";
                    x = Math.random() > 0.5 ? -50 : canvas.width + 50;
                    y = Math.random() * (canvas.height - 150) + 100;
                    vx = x < 0 ? 4 + level : -(4 + level);
                } else if (rand > 0.8 && level > 1) type = "combo_breaker";
                else if (rand > 0.65 - level * 0.03) type = "lightning";

                objects.current.push({
                    x,
                    y,
                    vx,
                    width: type === "bird" ? 60 : 50,
                    height: 50,
                    speed:
                        type === "bird"
                            ? 0
                            : (3 + Math.random() * 4) * (1 + level * 0.15),
                    type,
                });
                lastSpawn.current = time;
            }

            objects.current.forEach((obj, index) => {
                if (obj.type === "particle") {
                    obj.y += obj.speed;
                    obj.x += Math.sin(time / 100) * 2;
                    obj.life! -= 0.02;
                    if (obj.life! <= 0) {
                        objects.current.splice(index, 1);
                        return;
                    }
                    ctx.globalAlpha = obj.life!;
                    ctx.fillStyle = obj.color!;
                    ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
                    ctx.globalAlpha = 1;
                    return;
                }

                obj.y += obj.speed;
                if (obj.vx) obj.x += obj.vx;

                const distX = Math.abs(obj.x - playerX.current);
                const distY = Math.abs(obj.y - playerY.current);
                const hitWidth = platformWidth / 2 + 20;
                const hitHeight = 30;

                if (distX < hitWidth && distY < hitHeight) {
                    if (obj.type === "cloud" || obj.type === "gold") {
                        const points = obj.type === "gold" ? 30 : 10;
                        setScore((s) => {
                            const newScore =
                                s + points * (1 + Math.floor(combo / 10));
                            if (Math.floor(newScore / 150) > level - 1)
                                setLevel((l) => l + 1);
                            return newScore;
                        });
                        setCombo((c) => c + 1);
                        createParticles(
                            obj.x,
                            obj.y,
                            obj.type === "gold" ? "#facc15" : "#ffffff",
                        );
                    } else if (obj.type === "burst") {
                        for (let i = 0; i < 5; i++) {
                            objects.current.push({
                                x: Math.random() * (canvas.width - 60) + 30,
                                y: -50 - i * 80,
                                width: 50,
                                height: 50,
                                speed: 6,
                                type: "cloud",
                            });
                        }
                        createParticles(obj.x, obj.y, "#3b82f6");
                    } else if (obj.type === "shield") {
                        setHasShield(true);
                        createParticles(obj.x, obj.y, "#3b82f6");
                    } else if (obj.type === "combo_breaker") {
                        setCombo(0);
                        createParticles(obj.x, obj.y, "#4a5568");
                        shakeTime.current = 200;
                    } else {
                        if (hasShield) {
                            setHasShield(false);
                            shakeTime.current = 200;
                        } else {
                            setLives((l) => {
                                const newLives = l - 1;
                                if (newLives <= 0) handleGameOver(score);
                                return newLives;
                            });
                            setCombo(0);
                            shakeTime.current = 400;
                        }
                    }
                    objects.current.splice(index, 1);
                    return;
                }

                if (
                    obj.y > canvas.height ||
                    obj.x < -100 ||
                    obj.x > canvas.width + 100
                ) {
                    if (obj.type === "cloud" || obj.type === "gold")
                        setCombo(0);
                    objects.current.splice(index, 1);
                    return;
                }

                if (obj.type === "cloud" || obj.type === "gold") {
                    ctx.fillStyle =
                        obj.type === "gold"
                            ? "#facc15"
                            : "rgba(255, 255, 255, 0.8)";
                    ctx.beginPath();
                    ctx.arc(obj.x, obj.y, 25, 0, Math.PI * 2);
                    ctx.arc(obj.x + 20, obj.y - 10, 20, 0, Math.PI * 2);
                    ctx.arc(obj.x - 20, obj.y - 10, 20, 0, Math.PI * 2);
                    ctx.fill();
                } else if (obj.type === "burst") {
                    ctx.fillStyle = "#3b82f6";
                    ctx.beginPath();
                    ctx.arc(obj.x, obj.y, 22, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.strokeStyle = "#ffffff";
                    ctx.lineWidth = 3;
                    ctx.stroke();
                    ctx.fillStyle = "#ffffff";
                    ctx.font = "bold 20px Arial";
                    ctx.textAlign = "center";
                    ctx.fillText("B", obj.x, obj.y + 7);
                } else if (obj.type === "shield") {
                    ctx.fillStyle = "#10b981";
                    ctx.beginPath();
                    ctx.arc(obj.x, obj.y, 20, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.fillStyle = "#ffffff";
                    ctx.font = "bold 18px Arial";
                    ctx.textAlign = "center";
                    ctx.fillText("S", obj.x, obj.y + 7);
                } else if (obj.type === "combo_breaker") {
                    ctx.fillStyle = "#1a202c";
                    ctx.beginPath();
                    ctx.arc(obj.x, obj.y, 25, 0, Math.PI * 2);
                    ctx.arc(obj.x + 20, obj.y - 10, 20, 0, Math.PI * 2);
                    ctx.arc(obj.x - 20, obj.y - 10, 20, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.fillStyle = "#ffffff";
                    ctx.font = "bold 20px Arial";
                    ctx.textAlign = "center";
                    ctx.fillText("!", obj.x, obj.y + 7);
                } else if (obj.type === "bird") {
                    ctx.fillStyle = "#718096";
                    ctx.beginPath();
                    ctx.ellipse(obj.x, obj.y, 30, 15, 0, 0, Math.PI * 2);
                    ctx.fill();
                    const wingPos = Math.sin(time / 100) * 20;
                    ctx.beginPath();
                    ctx.moveTo(obj.x, obj.y);
                    ctx.lineTo(obj.x - 10, obj.y - wingPos);
                    ctx.lineTo(obj.x + 10, obj.y - wingPos);
                    ctx.fill();
                } else {
                    ctx.fillStyle = "#ff4d4f";
                    ctx.beginPath();
                    ctx.moveTo(obj.x, obj.y - 10);
                    ctx.lineTo(obj.x - 15, obj.y + 20);
                    ctx.lineTo(obj.x + 5, obj.y + 20);
                    ctx.lineTo(obj.x - 10, obj.y + 50);
                    ctx.lineTo(obj.x + 25, obj.y + 10);
                    ctx.lineTo(obj.x, obj.y + 10);
                    ctx.closePath();
                    ctx.fill();
                }
            });

            ctx.restore();
            requestRef.current = requestAnimationFrame(update);
        };

        requestRef.current = requestAnimationFrame(update);

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            const x = (e.clientX - rect.left) * (canvas.width / rect.width);
            const y = (e.clientY - rect.top) * (canvas.height / rect.height);
            playerX.current = Math.max(50, Math.min(canvas.width - 50, x));
            playerY.current = Math.max(50, Math.min(canvas.height - 50, y));
        };

        canvas.addEventListener("mousemove", handleMouseMove);

        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
            canvas.removeEventListener("mousemove", handleMouseMove);
        };
    }, [gameState, level, hasShield, combo, isWheelActive]);

    return (
        <Card className="game-interface">
            <div className="game-interface__header">
                <div className="game-interface__title-wrapper">
                    <h2 className="game-interface__title">Cloud Catcher</h2>
                    <div className="game-interface__level">Lv. {level}</div>
                    {gameState === "playing" && (
                        <Button
                            variant="outline-destructive"
                            size="sm"
                            onClick={finishGame}
                            className="game-interface__finish-btn"
                        >
                            <X size={16} /> Finish
                        </Button>
                    )}
                </div>
                <div className="game-interface__stats">
                    <div className="game-interface__stat">
                        <Zap
                            className={`game-interface__stat-icon ${combo > 0 ? "active" : ""}`}
                        />
                        <div className="game-interface__stat-info">
                            <span className="game-interface__stat-value">
                                x{1 + Math.floor(combo / 10)}
                            </span>
                            <span className="game-interface__stat-label">
                                Combo {combo}
                            </span>
                        </div>
                    </div>
                    <div className="game-interface__stat">
                        <Star className="game-interface__stat-icon" />
                        <div className="game-interface__stat-info">
                            <span className="game-interface__stat-value">
                                {score}
                            </span>
                            <span className="game-interface__stat-label">
                                Points
                            </span>
                        </div>
                    </div>
                    <div className="game-interface__stat">
                        <Heart className="game-interface__stat-icon game-interface__stat-icon--heart" />
                        <div className="game-interface__stat-info">
                            <span className="game-interface__stat-value">
                                {lives}
                            </span>
                            <span className="game-interface__stat-label">
                                Lives
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="game-container">
                <canvas
                    ref={canvasRef}
                    width={1000}
                    height={600}
                    className="game-canvas"
                />

                {hasShield && (
                    <div className="game-shield-indicator">
                        <Shield size={24} /> Shield Active
                    </div>
                )}

                {isWheelActive && (
                    <div className="game-wheel-overlay">
                        <div className="game-wheel-content">
                            <div
                                className="game-wheel-spinner"
                                style={{
                                    transform: `rotate(${wheelRotation.current}deg)`,
                                }}
                            >
                                <Loader2 size={120} className="wheel-icon" />
                            </div>
                            <div className="game-wheel-info">
                                <h3>Combo Bonus!</h3>
                                {wheelValue ? (
                                    <div className="wheel-result">
                                        +{wheelValue} GOLD CLOUDS!
                                    </div>
                                ) : (
                                    <p>Spinning for clouds...</p>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {gameState !== "playing" && !isWheelActive && (
                    <div className="game-overlay">
                        <div className="game-overlay__card">
                            <div className="game-overlay__icon">
                                {gameState === "idle" ? (
                                    <Play size={40} />
                                ) : (
                                    <Sparkles size={40} />
                                )}
                            </div>
                            <h3>
                                {gameState === "idle"
                                    ? "Ready to Catch?"
                                    : "Victory!"}
                            </h3>
                            <p>
                                {gameState === "idle"
                                    ? "Collect clouds, avoid lightning. The game gets faster every 100 points!"
                                    : `Score: ${score} | Level reached: ${level}`}
                            </p>
                            <Button
                                onClick={startGame}
                                size="default"
                                className="game-overlay__btn"
                            >
                                {gameState === "idle"
                                    ? "Start Game"
                                    : "Play Again"}
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </Card>
    );
};

export { GameInterface };
