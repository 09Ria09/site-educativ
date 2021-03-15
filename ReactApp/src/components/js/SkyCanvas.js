import React, {useEffect, useRef} from "react";

function SkyCanvas(props) {
    const canvasRef = useRef();

    useEffect(() => {
        function randomInt(max) {
            return Math.floor(Math.random() * max);
        }

        function createStars(width, height, spacing) {
            const stars = [];
            for (let x = 0; x < width; x += spacing) {
                for (let y = 0; y < height; y += spacing) {
                    const star = {
                        x: x + randomInt(spacing),
                        y: y + randomInt(spacing),
                        r: Math.random() * maxStarRadius
                    };
                    stars.push(star);
                }
            }
            return stars;
        }

        function fillCircle(ctx, x, y, r, fillStyle) {
            ctx.beginPath();
            ctx.fillStyle = fillStyle;
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.fill();
        }

        function getOpacity(factor) {
            const opacityIncrement =
                (maxStarOpacity - minStarOpacity) * Math.abs(Math.sin(factor));
            return minStarOpacity + opacityIncrement;
        }

        let then = 0;
        const FPS = 6;
        const fpsInterval = 1000 / FPS;

        function draw() {
            if (canvasRef.current === null) return;
            requestAnimationFrame(draw);
            if (Date.now() - then < fpsInterval) return;

            if (width !== canvasRef.current.clientWidth || height !== canvasRef.current.clientHeight) {
                width = canvasRef.current.clientWidth;
                height = canvasRef.current.clientHeight;
                canvas.width = width;
                canvas.height = height;
                stars = createStars(width, height, 25);
                //TODO: Optimize this using offscreen canvases.
                //TODO: Make the sky rotate and pan.
            }

            ctx.fillStyle = backgroundColor;
            ctx.fillRect(0, 0, width, height);
            stars.forEach(function (star, i) {
                const factor = counter * i;
                const x = star.x;
                const y = star.y;
                const opacity = getOpacity(factor);
                fillCircle(ctx, x, y, star.r, `rgba(255, 255, 255, ${opacity}`);
            });
            counter++;
            then = Date.now();
        }

        let width = 0, height = 0;
        let stars;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const backgroundColor = "#0A122A";
        const maxStarRadius = 1.5;
        const minStarOpacity = 0.35;
        const maxStarOpacity = 0.65;
        let counter = 0;
        draw();
    })

    return (<canvas className={props.className} ref={canvasRef}
                    style={{...{backgroundColor: 'var(--oxfordblue)'}, ...props.style}}/>);
}

export default SkyCanvas;