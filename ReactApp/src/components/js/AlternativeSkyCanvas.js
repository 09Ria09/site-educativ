import React, {useEffect, useRef} from 'react';

function AlternativeSkyCanvas(props) {
    const canvasRef = useRef(null);

    useEffect(() => {
        let width = 0, height = 0;
        const background = canvasRef.current;
        const bgCtx = background.getContext('2d');

        width = canvasRef.current.clientWidth;
        height = canvasRef.current.clientHeight;

        background.width = width;
        background.height = height;

        bgCtx.fillStyle = '#0a122a';
        bgCtx.fillRect(0, 0, width, height);

        function Star(options) {
            this.size = Math.random() * 2;
            this.speed = Math.random() * .1;
            this.x = options.x;
            this.y = options.y;
        }

        Star.prototype.reset = function () {
            this.size = Math.random() * 2;
            this.speed = Math.random() * .1;
            this.x = width;
            this.y = Math.random() * height;
        }

        Star.prototype.update = function () {
            this.x -= this.speed / width;
            if (this.x < 0) {
                this.reset();
            } else {
                bgCtx.fillRect(this.x * width, this.y * height, this.size * height / 1080, this.size * height / 1080);
            }
        }

        function ShootingStar() {
            this.reset();
        }

        ShootingStar.prototype.reset = function () {
            this.x = width;
            this.y = (Math.random() * height - height / 10) / 2;
            this.len = (Math.random() * 40) + 10;
            this.speed = (Math.random() * 10) + 6;
            this.angle = (Math.random() * 2) + 1;
            this.size = (Math.random() * 1) + 1;
            // this is used so the shooting stars arent constant
            this.waitTime = new Date().getTime() + (Math.random() * 6000) + 500;
            this.active = false;
        }

        ShootingStar.prototype.update = function () {
            if (this.active) {
                this.x -= this.speed * this.angle;
                this.y += this.speed;
                if (this.x + this.len < 0 || this.y - this.len >= height) {
                    this.reset();
                } else {
                    bgCtx.lineWidth = this.size;
                    bgCtx.beginPath();
                    bgCtx.moveTo(this.x, this.y);
                    bgCtx.lineTo(this.x + this.len * this.angle, this.y - this.len);
                    bgCtx.stroke();
                }
            } else {
                if (this.waitTime < new Date().getTime()) {
                    this.active = true;
                }
            }
        }
        let entities = [];
        for (let i = 0; i < 720; i++) {
            entities.push(new Star({x: Math.random(), y: Math.random()}));
        }
        entities.push(new ShootingStar());
        entities.push(new ShootingStar());
        entities.push(new ShootingStar());

        function animate() {
            width = canvasRef.current.clientWidth;
            height = canvasRef.current.clientHeight;
            background.width = width;
            background.height = height;
            bgCtx.fillStyle = '#0a122a';
            bgCtx.fillRect(0, 0, width, height);
            bgCtx.fillStyle = '#ffffff';
            bgCtx.strokeStyle = '#ffffff';
            let entLen = entities.length;
            while (entLen--) {
                entities[entLen].update();
            }

            requestAnimationFrame(animate);
        }

        animate();
    })

    return (
        <canvas className={props.className} ref={canvasRef} style={props.style}/>
    )
}

export default AlternativeSkyCanvas;