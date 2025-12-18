import { useEffect, useRef, useState, MouseEvent } from "react";
import { Heart, Star, Trophy } from "lucide-react";
import CloudIcon from "@/shared/assets/icons/game/cloud.svg";
import ThunderIcon from "@/shared/assets/icons/game/thunder.svg";
import ThunderStormIcon from "@/shared/assets/icons/game/thunderstorm.svg";
import ClickIconImage from "@/shared/assets/icons/game/hand.svg";
import BasketIconSVG from "@/shared/assets/icons/game/basket.svg";
import "./GamePage.scss";

type Cloud = {
    x: number;
    y: number;
    speedX: number;
    speedY: number;
    visible: boolean;
};
type Storm = {
    x: number;
    y: number;
    speed: number;
    hits: number;
    zigzag?: number;
};
type Spark = { x: number; y: number; alpha: number };
type ClickIcon = { x: number; y: number; alpha: number };
type Basket = { x: number; width: number; height: number; speed: number };

export function GamePage() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [points, setPoints] = useState(0);
    const [lives] = useState(3);
    const [gameOver, setGameOver] = useState(false);
    const [combo, setCombo] = useState(0);
    const [timer, setTimer] = useState(60);

    const clouds = useRef<Cloud[]>([]);
    const storms = useRef<Storm[]>([]);
    const thunderstorms = useRef<Storm[]>([]);
    const sparks = useRef<Spark[]>([]);
    const clickIcons = useRef<ClickIcon[]>([]);

    const basket = useRef<Basket>({
        x: 340,
        width: 120,
        height: 40,
        speed: 6,
    });
    const keys = useRef<{ left: boolean; right: boolean }>({
        left: false,
        right: false,
    });
    const mouseX = useRef<number | null>(null);

    const cloudIcon = useRef(new Image()).current;
    cloudIcon.src = CloudIcon;

    const thunderIcon = useRef(new Image()).current;
    thunderIcon.src = ThunderIcon;

    const thunderStormIcon = useRef(new Image()).current;
    thunderStormIcon.src = ThunderStormIcon;

    const clickIconImg = useRef(new Image()).current;
    clickIconImg.src = ClickIconImage;

    const basketIconImg = useRef(new Image()).current;
    basketIconImg.src = BasketIconSVG;

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft" || e.key === "a")
                keys.current.left = true;
            if (e.key === "ArrowRight" || e.key === "d")
                keys.current.right = true;
        };
        const handleKeyUp = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft" || e.key === "a")
                keys.current.left = false;
            if (e.key === "ArrowRight" || e.key === "d")
                keys.current.right = false;
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current!;
        if (!canvas) return;
        const ctx = canvas.getContext("2d")!;
        if (!ctx) return;

        canvas.width = 800;
        canvas.height = 500;

        function spawnCloud() {
            clouds.current.push({
                x: Math.random() * canvas.width,
                y: Math.random() * -100,
                speedX: (Math.random() - 0.5) * 2,
                speedY: 0.5 + Math.random() * 1.2,
                visible: true,
            });
        }

        function spawnStorm() {
            storms.current.push({
                x: Math.random() * canvas.width,
                y: -60,
                speed: 1.2 + Math.random() * 1.5,
                hits: 0,
                zigzag: Math.random() > 0.5 ? 1 : -1,
            });
        }

        function spawnThunderStorm() {
            thunderstorms.current.push({
                x: Math.random() * canvas.width,
                y: -60,
                speed: 1.2 + Math.random() * 1.5,
                hits: 0,
            });
        }

        let lastSpawn = 0;
        let lastStormSpawn = 0;
        let lastThunderStormSpawn = 0;

        function animate(time: number) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            clouds.current.forEach((c, i) => {
                c.x += c.speedX;
                c.y += c.speedY;
                if (c.x < 0 || c.x > canvas.width) c.speedX *= -1;
                if (c.visible) {
                    ctx.shadowColor = "rgba(0,0,0,0.3)";
                    ctx.shadowBlur = 10;
                    ctx.drawImage(cloudIcon, c.x - 30, c.y - 30, 60, 60);
                    ctx.shadowBlur = 0;
                }

                const bx = basket.current.x;
                const by = canvas.height - basket.current.height - 10;
                if (
                    c.y + 30 >= by &&
                    c.x >= bx &&
                    c.x <= bx + basket.current.width
                ) {
                    clouds.current.splice(i, 1);
                    setPoints((p) => p + 1 + combo);
                    setCombo((c) => c + 1);
                    sparks.current.push({ x: c.x, y: by, alpha: 1 });
                    return;
                }

                if (c.y > canvas.height) clouds.current.splice(i, 1);
            });

            storms.current.forEach((s, i) => {
                s.y += s.speed;
                s.x += (s.zigzag || 1) * 0.5;
                s.speed += 0.001;
                ctx.drawImage(thunderIcon, s.x - 40, s.y - 40, 60, 60);
                if (s.y > canvas.height) storms.current.splice(i, 1);
            });

            thunderstorms.current.forEach((s, i) => {
                s.y += s.speed;
                s.speed += 0.001;
                ctx.drawImage(thunderStormIcon, s.x - 40, s.y - 40, 60, 60);
                if (s.y > canvas.height) thunderstorms.current.splice(i, 1);
            });

            sparks.current.forEach((spark, i) => {
                spark.alpha -= 0.05;
                ctx.fillStyle = `rgba(255, 215, 0, ${spark.alpha})`;
                ctx.beginPath();
                ctx.arc(spark.x, spark.y, 5, 0, Math.PI * 2);
                ctx.fill();
                if (spark.alpha <= 0) sparks.current.splice(i, 1);
            });

            clickIcons.current.forEach((icon, i) => {
                icon.alpha -= 0.07;
                ctx.globalAlpha = icon.alpha;
                ctx.drawImage(clickIconImg, icon.x - 20, icon.y - 20, 40, 40);
                ctx.globalAlpha = 1;
                if (icon.alpha <= 0) clickIcons.current.splice(i, 1);
            });

            if (keys.current.left) basket.current.x -= basket.current.speed;
            if (keys.current.right) basket.current.x += basket.current.speed;

            if (mouseX.current !== null) {
                const diff =
                    mouseX.current -
                    (basket.current.x + basket.current.width / 2);
                basket.current.x += diff * 0.1;
            }

            if (basket.current.x < 0) basket.current.x = 0;
            if (basket.current.x > canvas.width - basket.current.width)
                basket.current.x = canvas.width - basket.current.width;

            ctx.drawImage(
                basketIconImg,
                basket.current.x,
                canvas.height - basket.current.height - 10,
                basket.current.width,
                basket.current.height,
            );

            if (gameOver) {
                ctx.fillStyle = "rgba(0,0,0,0.7)";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = "#ffffff";
                ctx.font = "bold 32px Arial";
                ctx.textAlign = "center";
                ctx.fillText(
                    "Вы проиграли!",
                    canvas.width / 2,
                    canvas.height / 2 - 20,
                );
                ctx.font = "20px Arial";
                ctx.fillText(
                    "Try again later.",
                    canvas.width / 2,
                    canvas.height / 2 + 20,
                );
            }

            if (!gameOver) {
                if (time - lastSpawn > 3000) {
                    spawnCloud();
                    lastSpawn = time;
                }
                if (time - lastStormSpawn > 1100) {
                    spawnStorm();
                    lastStormSpawn = time;
                }
                if (time - lastThunderStormSpawn > 1500) {
                    spawnThunderStorm();
                    lastThunderStormSpawn = time;
                }
            }

            requestAnimationFrame(animate);
        }

        requestAnimationFrame(animate);

        const timerInterval = setInterval(() => {
            if (!gameOver) {
                setTimer((t) => {
                    if (t <= 0) {
                        setGameOver(true);
                        return 0;
                    }
                    return t - 1;
                });
            }
        }, 1000);

        return () => clearInterval(timerInterval);
    }, [gameOver]);

    function handleClick(e: MouseEvent<HTMLCanvasElement>) {
        if (gameOver) return;
        const rect = (e.target as HTMLCanvasElement).getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        clickIcons.current.push({ x, y, alpha: 1 });
    }

    return (
        <section className="game-page container">
            <div className="game-page__content card">
                <div className="game-page__header">
                    <h2 className="game-page__title title">Cloud Catcher</h2>
                    <div className="game-page__stats">
                        <div className="game-page__stat">
                            <Star className="game-page__stat-icon" />
                            <p className="game-page__stat-value">{points}</p>
                            <p className="game-page__stat-label primary-text">
                                Points
                            </p>
                        </div>
                        <div className="game-page__stat">
                            <Heart className="game-page__stat-icon game-page__stat-icon--heart" />
                            <p className="game-page__stat-value">{lives}</p>
                            <p className="game-page__stat-label primary-text">
                                Lives
                            </p>
                        </div>
                        <div className="game-page__stat">
                            <p className="game-page__stat-label primary-text">
                                Combo: {combo}
                            </p>
                        </div>
                        <div className="game-page__stat">
                            <p className="game-page__stat-label primary-text">
                                Time: {timer}s
                            </p>
                        </div>
                    </div>
                </div>
                <canvas
                    ref={canvasRef}
                    className="game-canvas"
                    onClick={handleClick}
                />
            </div>
            <div className="game-page__leaderboard card">
                <div className="game-page__leaderboard-header">
                    <Trophy className="game-page__leaderboard-icon" />
                    <h3 className="game-page__leaderboard-title">
                        Leaderboard
                    </h3>
                </div>
            </div>
        </section>
    );
}
