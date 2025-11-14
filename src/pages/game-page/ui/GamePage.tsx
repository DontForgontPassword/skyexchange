import { useEffect, useRef, useState, MouseEvent } from "react";
import { Heart, Star, Trophy } from "lucide-react";
import CloudIcon from "@/shared/assets/icons/game/cloud.svg";
import ThunderIcon from "@/shared/assets/icons/game/thunder.svg";
import ThunderStormIcon from "@/shared/assets/icons/game/thunderstorm.svg";
import ClickIconImage from "@/shared/assets/icons/game/hand.svg";
import "./GamePage.scss";

type Cloud = { x: number; y: number; speedX: number; speedY: number; visible: boolean };
type Storm = { x: number; y: number; speed: number; hits: number };
type Spark = { x: number; y: number; alpha: number };
type ClickIcon = { x: number; y: number; alpha: number };

export function GamePage() {
     const canvasRef = useRef<HTMLCanvasElement | null>(null);
     const [points, setPoints] = useState(0);
     const [lives, setLives] = useState(3);
     const [gameOver, setGameOver] = useState(false);

     const clouds = useRef<Cloud[]>([]);
     const storms = useRef<Storm[]>([]);
     const thunderstorms = useRef<Storm[]>([]);
     const sparks = useRef<Spark[]>([]);
     const clickIcons = useRef<ClickIcon[]>([]);

     const cloudIcon = useRef(new Image()).current;
     cloudIcon.src = CloudIcon;

     const thunderIcon = useRef(new Image()).current;
     thunderIcon.src = ThunderIcon;

     const thunderStormIcon = useRef(new Image()).current;
     thunderStormIcon.src = ThunderStormIcon;

     const clickIconImg = useRef(new Image()).current;
     clickIconImg.src = ClickIconImage;

     const isOverCursor = (c: { x: number, y: number }, x: number, y: number, width: number, height: number) => {
          return x >= c.x - width / 2 &&
               x <= c.x + width / 2 &&
               y >= c.y - height / 2 &&
               y <= c.y + height / 2;
     };

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
                    speedX: (Math.random() - 0.5) * 4,
                    speedY: 1 + Math.random() * 2,
                    visible: true
               });
          }

          function spawnThunderStorm() {
               thunderstorms.current.push({
                    x: Math.random() * canvas.width,
                    y: -60,
                    speed: 2 + Math.random() * 2,
                    hits: 0
               });
          }

          function spawnStorm() {
               storms.current.push({
                    x: Math.random() * canvas.width,
                    y: -60,
                    speed: 2 + Math.random() * 2,
                    hits: 0
               });
          }

          let lastSpawn = 0;
          let lastStormSpawn = 0;
          let lastThunderStormSpawn = 0;

          function animate(time: number) {
               ctx.clearRect(0, 0, canvas.width, canvas.height);

               // Clouds
               clouds.current.forEach((c, i) => {
                    c.x += c.speedX;
                    c.y += c.speedY;
                    if (c.x < 0 || c.x > canvas.width) c.speedX *= -1;
                    if (c.visible) ctx.drawImage(cloudIcon, c.x - 30, c.y - 30, 60, 60);
                    if (c.y > canvas.height) clouds.current.splice(i, 1);
               });

               // Storms
               storms.current.forEach((s, i) => {
                    s.y += s.speed;
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

               // Sparks
               sparks.current.forEach((spark, i) => {
                    spark.alpha -= 0.05;
                    ctx.fillStyle = `rgba(255, 215, 0, ${spark.alpha})`;
                    ctx.beginPath();
                    ctx.arc(spark.x, spark.y, 5, 0, Math.PI * 2);
                    ctx.fill();
                    if (spark.alpha <= 0) sparks.current.splice(i, 1);
               });

               // Click icons
               clickIcons.current.forEach((icon, i) => {
                    icon.alpha -= 0.07;
                    ctx.globalAlpha = icon.alpha;
                    ctx.drawImage(clickIconImg, icon.x - 20, icon.y - 20, 40, 40);
                    ctx.globalAlpha = 1;
                    if (icon.alpha <= 0) clickIcons.current.splice(i, 1);
               });

               // Если проиграли — затемнение и текст
               if (gameOver) {
                    ctx.fillStyle = "rgba(0,0,0,0.7)";
                    ctx.fillRect(0, 0, canvas.width, canvas.height);

                    ctx.fillStyle = "#ffffff";
                    ctx.font = "bold 32px Arial";
                    ctx.textAlign = "center";
                    ctx.fillText("Вы проиграли!", canvas.width / 2, canvas.height / 2 - 20);

                    ctx.font = "20px Arial";
                    ctx.fillText("Попробуйте позже через 24 часа", canvas.width / 2, canvas.height / 2 + 20);
               }

               if (!gameOver) {
                    if (time - lastSpawn > 2400) { spawnCloud(); lastSpawn = time; }
                    if (time - lastStormSpawn > 500) { spawnStorm(); lastStormSpawn = time; }
                    if (time - lastThunderStormSpawn > 900) { spawnThunderStorm(); lastThunderStormSpawn = time; }
               }

               requestAnimationFrame(animate);
          }

          requestAnimationFrame(animate);
     }, [gameOver]);

     function handleClick(e: MouseEvent<HTMLCanvasElement>) {
          if (gameOver) return; // запрет кликов после конца игры

          const rect = (e.target as HTMLCanvasElement).getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          clickIcons.current.push({ x, y, alpha: 1 });

          clouds.current.forEach((c, i) => {
               if (isOverCursor(c, x, y, 30, 30)) {
                    clouds.current.splice(i, 1);
                    setPoints(p => p + 1);
                    sparks.current.push({ x: c.x, y: c.y, alpha: 1 });
               }
          });

          storms.current.forEach((s, i) => {
               if (isOverCursor(s, x, y, 60, 60)) {
                    storms.current.splice(i, 1);
                    setLives(p => {
                         const newLives = p - 1;
                         if (newLives <= 0) setGameOver(true);
                         return newLives;
                    });
                    const audio = new Audio("/sounds/crack.mp3");
                    audio.play();
                    sparks.current.push({ x: s.x, y: s.y, alpha: 1 });
               }
          });
     }

     return (
          <section className="game-page container">
               <div className="game-page__content card">
                    <div className="game-page__header">
                         <h3 className="game-page__title">Cloud Catcher</h3>
                         <div className="game-page__stats">
                              <div className="game-page__stat">
                                   <Star className="game-page__stat-icon" />
                                   <p className="game-page__stat-value">{points}</p>
                                   <p className="game-page__stat-label primary-text">Points</p>
                              </div>
                              <div className="game-page__stat">
                                   <Heart className="game-page__stat-icon game-page__stat-icon--heart" />
                                   <p className="game-page__stat-value">{lives}</p>
                                   <p className="game-page__stat-label primary-text">Lives</p>
                              </div>
                         </div>
                    </div>
                    <canvas ref={canvasRef} className="game-canvas" onClick={handleClick} />
               </div>
               <div className="game-page__leaderboard card">
                    <div className="game-page__leaderboard-header">
                         <Trophy className="game-page__leaderboard-icon" />
                         <h3 className="game-page__leaderboard-title">Leaderboard</h3>
                    </div>
               </div>
          </section>
     );
}
