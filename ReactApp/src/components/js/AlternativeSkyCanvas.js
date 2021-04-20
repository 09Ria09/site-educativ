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
            
        Star.prototype.update = function(){
            this.x-=this.speed;
            if(this.x<0){
                this.reset();
            }else{
                bgCtx.fillRect(this.x,this.y,this.size,this.size); 
            }
        }
            
        function ShootingStar(){
            this.reset();
        }
            
        ShootingStar.prototype.reset = function(){
            this.x = width;
            this.y = (Math.random()*height - height / 10) / 2;
            this.len = (Math.random()*80)+10;
            this.speed = (Math.random()*10)+6;
            this.size = (Math.random()*2)+2;
            // this is used so the shooting stars arent constant
            this.waitTime =  new Date().getTime() + (Math.random()*6000)+500;
            this.active = false;
        }
            
        ShootingStar.prototype.update = function(){
            if(this.active){
                this.x-=this.speed;
                this.y+=this.speed;
                if(this.x + this.len<0 || this.y - this.len >= height){
                    this.reset();
                }else{
                bgCtx.lineWidth = this.size;
                    bgCtx.beginPath();
                    bgCtx.moveTo(this.x,this.y);
                    bgCtx.lineTo(this.x+this.len, this.y-this.len);
                    bgCtx.stroke();
                }
            }else{
                if(this.waitTime < new Date().getTime()){
                    this.active = true;
                }			
            }
        }
        let entities = [];
        for(let i=0; i < height; i++){
            entities.push(new Star({x:Math.random()*width, y:Math.random()*height}));
        }
        entities.push(new ShootingStar());
        entities.push(new ShootingStar());
        entities.push(new ShootingStar());
        function animate(){
            bgCtx.fillStyle = '#0a122a';
            bgCtx.fillRect(0,0,width,height);
            bgCtx.fillStyle = '#ffffff';
            bgCtx.strokeStyle = '#ffffff';
            let entLen = entities.length;
            while(entLen--){
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